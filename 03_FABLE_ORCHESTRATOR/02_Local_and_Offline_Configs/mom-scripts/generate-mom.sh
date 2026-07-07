#!/bin/bash

# BUBU MOM Generator — Main Wrapper Script
# Generates formatted MOM documents (DOCX + optional PDF)

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
MOM_DIR="$PROJECT_DIR/MOMs"
FORMATTER_SCRIPT="$SCRIPT_DIR/mom-formatter.js"

# Ensure MOM directory exists
mkdir -p "$MOM_DIR"

# Function to print usage
usage() {
  cat << EOF
Usage: $0 --input=<json-file> [--output-dir=<path>] [--pdf]

Options:
  --input=<path>       Path to meeting JSON file (required)
  --output-dir=<path>  Output directory (default: $MOM_DIR/YYYY-MM/)
  --pdf                Also generate PDF (requires LibreOffice)
  --help               Show this help message

Example:
  $0 --input=/tmp/meeting.json --pdf
EOF
  exit 1
}

# Parse arguments
INPUT_FILE=""
OUTPUT_DIR=""
GENERATE_PDF=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --input=*)
      INPUT_FILE="${1#*=}"
      shift
      ;;
    --output-dir=*)
      OUTPUT_DIR="${1#*=}"
      shift
      ;;
    --pdf)
      GENERATE_PDF=true
      shift
      ;;
    --help)
      usage
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      usage
      ;;
  esac
done

# Validate input file
if [[ -z "$INPUT_FILE" ]]; then
  echo -e "${RED}Error: --input parameter is required${NC}"
  usage
fi

if [[ ! -f "$INPUT_FILE" ]]; then
  echo -e "${RED}Error: Input file not found: $INPUT_FILE${NC}"
  exit 1
fi

# Determine output directory
if [[ -z "$OUTPUT_DIR" ]]; then
  CURRENT_MONTH=$(date +%Y-%m)
  OUTPUT_DIR="$MOM_DIR/$CURRENT_MONTH"
fi

mkdir -p "$OUTPUT_DIR"

# Extract meeting title and date from JSON
TITLE=$(jq -r '.title // "Minutes_of_Meeting"' "$INPUT_FILE" 2>/dev/null | sed 's/ /_/g')
DATE=$(jq -r '.date // "'$(date +%Y-%m-%d)'"' "$INPUT_FILE" 2>/dev/null)

DOCX_OUTPUT="$OUTPUT_DIR/MOM_${DATE}_${TITLE}.docx"

# Run formatter
echo -e "${YELLOW}Generating MOM document...${NC}"
node "$FORMATTER_SCRIPT" --input="$INPUT_FILE" --output="$DOCX_OUTPUT"

if [[ ! -f "$DOCX_OUTPUT" ]]; then
  echo -e "${RED}Error: Failed to generate DOCX file${NC}"
  exit 1
fi

echo -e "${GREEN}✓ DOCX generated: $DOCX_OUTPUT${NC}"

# Optional: Generate PDF
if [[ "$GENERATE_PDF" == true ]]; then
  PDF_OUTPUT="$OUTPUT_DIR/MOM_${DATE}_${TITLE}.pdf"

  # Check if LibreOffice is available
  if command -v soffice &> /dev/null; then
    echo -e "${YELLOW}Converting to PDF...${NC}"
    soffice --headless --convert-to pdf --outdir "$OUTPUT_DIR" "$DOCX_OUTPUT" 2>&1 | grep -v "javaldx:"
    if [[ -f "$PDF_OUTPUT" ]]; then
      echo -e "${GREEN}✓ PDF generated: $PDF_OUTPUT${NC}"
    else
      echo -e "${YELLOW}⚠ PDF conversion attempted but file not found${NC}"
    fi
  else
    echo -e "${YELLOW}⚠ LibreOffice not found. Skipping PDF generation.${NC}"
    echo -e "   To generate PDF: install LibreOffice or manually convert $DOCX_OUTPUT"
  fi
fi

# Summary
echo ""
echo -e "${GREEN}✓ MOM generation complete!${NC}"
echo ""
echo "Files:"
echo "  DOCX: $DOCX_OUTPUT"
if [[ "$GENERATE_PDF" == true ]]; then
  echo "  PDF:  $PDF_OUTPUT"
fi
echo ""
echo "Output directory: $OUTPUT_DIR"

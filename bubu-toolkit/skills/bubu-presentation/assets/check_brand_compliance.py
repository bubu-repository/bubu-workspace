#!/usr/bin/env python3
"""Check a built BUBU deck (.pptx) against the locked design-system tokens in
bubu-theme.js (see design-spec.md). Scans only ppt/slides/slide*.xml — the
actual rendered content — for colors and fonts, and flags anything outside
the BUBU palette/type set. Also confirms fonts were embedded.

Usage:
    python check_brand_compliance.py deck.pptx

Exit code 0 = PASS, 1 = FAIL.
"""
import sys, zipfile, re
from collections import defaultdict

# Mirrors BRAND.color / BRAND.font in bubu-theme.js and design-spec.md, PLUS
# three explicit dark-mode literal exceptions that were never promoted to named
# BRAND.color tokens: 2A2A2A (bubu-theme.js line 107, texCircles), 3A3A3A
# (line 97, texTicks), and 5A5A5A (line 145, imgBlock). Keep all three sources
# in sync by hand if bubu-theme.js or design-spec.md ever change (same pattern
# as embed_fonts.py's FONT_MAP).
ALLOWED_COLORS = {
    "FF5E00", "F15A24", "F06622", "111111", "000000", "FFFFFF",
    "666666", "434343", "8A8A8A", "B7B7B7", "CCCCCC", "E4E4E4",
    "F3F3F3", "1C1C1C", "2A2A2A", "3A3A3A", "5A5A5A",
}
ALLOWED_FONTS = {"Bebas Neue", "Poppins", "Comfortaa"}

COLOR_RE = re.compile(r'srgbClr val="([0-9A-Fa-f]{6})"')
FONT_RE = re.compile(r'typeface="([^"]+)"')
SLIDE_NAME_RE = re.compile(r'^ppt/slides/slide(\d+)\.xml$')


def check(pptx_path):
    bad_colors = defaultdict(set)   # color -> set of slide numbers
    bad_fonts = defaultdict(set)    # font -> set of slide numbers

    with zipfile.ZipFile(pptx_path, "r") as z:
        names = z.namelist()
        slide_names = sorted(
            (n for n in names if SLIDE_NAME_RE.match(n)),
            key=lambda n: int(SLIDE_NAME_RE.match(n).group(1)),
        )
        for name in slide_names:
            slide_num = int(SLIDE_NAME_RE.match(name).group(1))
            xml = z.read(name).decode("utf-8")
            for color in COLOR_RE.findall(xml):
                if color.upper() not in ALLOWED_COLORS:
                    bad_colors[color.upper()].add(slide_num)
            for font in FONT_RE.findall(xml):
                if font not in ALLOWED_FONTS:
                    bad_fonts[font].add(slide_num)

        pres_xml = z.read("ppt/presentation.xml").decode("utf-8")
        fonts_embedded = "<p:embeddedFontLst>" in pres_xml

    return bad_colors, bad_fonts, fonts_embedded, len(slide_names)


def report(pptx_path):
    bad_colors, bad_fonts, fonts_embedded, slide_count = check(pptx_path)
    problems = []

    for color, slides in sorted(bad_colors.items()):
        slide_list = ", ".join(str(s) for s in sorted(slides))
        problems.append(f"Unexpected color #{color} on slide(s) {slide_list}")

    for font, slides in sorted(bad_fonts.items()):
        slide_list = ", ".join(str(s) for s in sorted(slides))
        problems.append(f"Unexpected font \"{font}\" on slide(s) {slide_list}")

    if not fonts_embedded:
        problems.append("Fonts not embedded — run embed_fonts.py before shipping")

    if problems:
        print(f"FAIL — {pptx_path} ({slide_count} slides checked)")
        for p in problems:
            print(f"  - {p}")
        return False

    print(f"PASS — {pptx_path} ({slide_count} slides checked, fonts embedded)")
    return True


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    ok = report(sys.argv[1])
    sys.exit(0 if ok else 1)

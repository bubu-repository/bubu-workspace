#!/usr/bin/env node

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, PageBreak,
        AlignmentType, WidthType, BorderStyle, ShadingType, VerticalAlign, HeadingLevel, PageNumber } = require('docx');
const fs = require('fs');
const path = require('path');

// BUBU Brand Colors
const ORANGE = 'FF5900';
const WHITE = 'FFFFFF';
const DARK_GRAY = '333333';
const LIGHT_GRAY = 'F5F5F5';

// Border config
const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top: border, bottom: border, left: border, right: border };

/**
 * Generate a professional BUBU MOM document
 * @param {Object} meetingData - Meeting information object
 * @param {string} outputPath - Where to save the DOCX
 */
function generateMOM(meetingData, outputPath) {
  const {
    title = 'Minutes of Meeting',
    date,
    time,
    location,
    participants = { bubu_team: [], external: [] },
    agenda = [],
    executive_summary = '',
    key_points = [],
    discussions = [],
    action_items = [],
    workarounds = [],
    next_steps = '',
    summary = '',
    glossary = {},
    meeting_type = 'internal'
  } = meetingData;

  // Build participant rows
  const participantRows = [];
  const allParticipants = [...(participants.bubu_team || []), ...(participants.external || [])];

  for (let i = 0; i < allParticipants.length; i += 2) {
    participantRows.push(
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 4680, type: WidthType.DXA },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun(allParticipants[i] || '')]
            })]
          }),
          new TableCell({
            borders,
            width: { size: 4680, type: WidthType.DXA },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({
              children: [new TextRun(allParticipants[i + 1] || '')]
            })]
          })
        ]
      })
    );
  }

  // Build action items & workarounds table
  const actionRows = [];

  // Action items
  if (action_items && action_items.length > 0) {
    action_items.forEach(item => {
      actionRows.push(
        new TableRow({
          children: [
            new TableCell({
              borders,
              width: { size: 2900, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: item.item, bold: false, size: 18 })] })]
            }),
            new TableCell({
              borders,
              width: { size: 2000, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun(item.owner || '')] })]
            }),
            new TableCell({
              borders,
              width: { size: 2000, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun(item.deadline || '')] })]
            }),
            new TableCell({
              borders,
              width: { size: 1500, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun(item.status || 'open')] })]
            })
          ]
        })
      );
    });
  }

  // Workarounds
  if (workarounds && workarounds.length > 0) {
    workarounds.forEach(item => {
      actionRows.push(
        new TableRow({
          children: [
            new TableCell({
              borders,
              width: { size: 2900, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: '[WORKAROUND] ' + item.issue, bold: true, size: 18, color: DARK_GRAY })] })]
            }),
            new TableCell({
              borders,
              width: { size: 2000, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun(item.owner || '')] })]
            }),
            new TableCell({
              borders,
              width: { size: 2000, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun(item.resolution_date || '')] })]
            }),
            new TableCell({
              borders,
              width: { size: 1500, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun('workaround')] })]
            })
          ]
        })
      );
    });
  }

  // Build discussions section
  const discussionParagraphs = [];
  if (discussions && discussions.length > 0) {
    discussions.forEach((disc, idx) => {
      discussionParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: `${idx + 1}. ${disc.topic}`, bold: true, size: 24, color: ORANGE })]
        })
      );

      if (disc.what_was_discussed) {
        discussionParagraphs.push(
          new Paragraph({
            spacing: { before: 120, after: 120 },
            indent: { left: 480 },
            children: [new TextRun({ text: disc.what_was_discussed, size: 20 })]
          })
        );
      }

      if (disc.decision) {
        discussionParagraphs.push(
          new Paragraph({
            spacing: { before: 60, after: 120 },
            indent: { left: 480 },
            children: [new TextRun({ text: '✓ Decision: ' + disc.decision, bold: true, size: 20, color: '006B3F' })]
          })
        );
      }
    });
  }

  // Build glossary
  const glossaryParagraphs = [];
  if (glossary && Object.keys(glossary).length > 0) {
    glossaryParagraphs.push(new PageBreak());
    glossaryParagraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: 'GLOSSARY', bold: true, size: 32, color: ORANGE })]
      })
    );

    Object.entries(glossary).forEach(([term, definition]) => {
      glossaryParagraphs.push(
        new Paragraph({
          spacing: { before: 120, after: 60 },
          indent: { left: 480 },
          children: [
            new TextRun({ text: term, bold: true, size: 22 }),
            new TextRun({ text: ': ' + definition, size: 22 })
          ]
        })
      );
    });
  }

  // Build document sections using YOUR template design
  const sections = [
    // Empty paragraph for spacing
    new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: '', size: 12 })]
    }),

    // Orange header table (matching your design)
    new Table({
      width: { size: 10515, type: WidthType.DXA },
      rows: [
        new TableRow({
          height: { value: 786, rule: 'atLeast' },
          children: [
            new TableCell({
              columnSpan: 3,
              shading: { fill: ORANGE, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              verticalAlign: VerticalAlign.CENTER,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 0, line: 240, lineRule: 'auto' },
                  children: [new TextRun({
                    text: 'MINUTES OF MEETING',
                    bold: true,
                    size: 46,
                    color: WHITE,
                    font: 'Bebas Neue'
                  })]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 0, line: 240, lineRule: 'auto' },
                  children: [new TextRun({
                    text: (title || 'BUBU Organizational Meeting').toUpperCase(),
                    bold: true,
                    size: 26,
                    color: WHITE,
                    font: 'Bebas Neue'
                  })]
                })
              ]
            })
          ]
        }),
        // Metadata row (Date, Organization, Partner Logo)
        new TableRow({
          height: { value: 867, rule: 'atLeast' },
          children: [
            new TableCell({
              width: { size: 3540, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              verticalAlign: VerticalAlign.CENTER,
              borders,
              children: [new Paragraph({
                spacing: { after: 0, line: 276, lineRule: 'auto' },
                children: [new TextRun('')]
              })]
            }),
            new TableCell({
              width: { size: 3960, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              verticalAlign: VerticalAlign.CENTER,
              borders,
              children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 0, line: 276, lineRule: 'auto' },
                children: [new TextRun({
                  text: 'Date: ' + (date || '___________'),
                  bold: true,
                  size: 18,
                  underline: 'single'
                })]
              })]
            }),
            new TableCell({
              width: { size: 3015, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              verticalAlign: VerticalAlign.CENTER,
              borders,
              children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 0, line: 276, lineRule: 'auto' },
                children: [new TextRun({
                  text: '(logo partner)',
                  size: 18
                })]
              })]
            })
          ]
        }),
        // Agenda row
        new TableRow({
          height: { value: 597, rule: 'atLeast' },
          children: [
            new TableCell({
              columnSpan: 3,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              verticalAlign: VerticalAlign.CENTER,
              borders,
              children: [
                new Paragraph({
                  spacing: { after: 0, line: 276, lineRule: 'auto' },
                  children: [new TextRun({
                    text: 'Agenda of the Meeting:',
                    bold: true,
                    size: 18
                  })]
                })
              ]
            })
          ]
        }),
        // Participants row
        new TableRow({
          height: { value: 1193, rule: 'atLeast' },
          children: [
            new TableCell({
              columnSpan: 3,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              verticalAlign: VerticalAlign.CENTER,
              borders,
              children: [
                new Paragraph({
                  spacing: { after: 0, line: 276, lineRule: 'auto' },
                  children: [new TextRun({
                    text: 'Participants:',
                    bold: true,
                    size: 18
                  })]
                }),
                new Table({
                  width: { size: 9744, type: WidthType.DXA },
                  columnWidths: [4872, 4872],
                  rows: participantRows.length > 0 ? participantRows : [new TableRow({
                    children: [
                      new TableCell({
                        columnSpan: 2,
                        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
                        children: [new Paragraph({ children: [new TextRun('No participants recorded')] })]
                      })
                    ]
                  })]
                })
              ]
            })
          ]
        })
      ]
    }),

    new Paragraph({ text: '' }),

    // Participants
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: 'PARTICIPANTS', bold: true, size: 28, color: ORANGE })]
    }),

    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [4680, 4680],
      rows: participantRows.length > 0 ? participantRows : [new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 9360, type: WidthType.DXA },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun('No participants recorded')] })]
          })
        ]
      })]
    }),

    new Paragraph({ text: '' }),

    // Agenda
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: 'AGENDA', bold: true, size: 28, color: ORANGE })]
    }),

    ...(agenda && agenda.length > 0
      ? agenda.map((item, idx) => new Paragraph({
          spacing: { before: 60, after: 60 },
          indent: { left: 480 },
          numbering: { reference: 'agenda-bullets', level: 0 },
          children: [new TextRun(item)]
        }))
      : [new Paragraph({ children: [new TextRun('No agenda items recorded')] })]
    ),

    new Paragraph({ text: '' }),

    // Summary of Discussion and Action Points (main content table - your template style)
    new Paragraph({
      spacing: { before: 200, after: 200, line: 276, lineRule: 'auto' },
      children: [new TextRun({
        text: 'Summary of Discussion and Action Points',
        bold: true,
        size: 24,
        font: 'Calibri'
      })]
    }),

    new Table({
      width: { size: 10396, type: WidthType.DXA },
      rows: [
        new TableRow({
          height: { value: 2400, rule: 'atLeast' },
          children: [
            new TableCell({
              width: { size: 10396, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              borders,
              children: [
                // Executive Summary Section
                new Paragraph({
                  heading: HeadingLevel.HEADING_2,
                  spacing: { after: 120, line: 276, lineRule: 'auto' },
                  children: [new TextRun({
                    text: 'Executive Summary',
                    bold: true,
                    size: 24
                  })]
                }),
                new Paragraph({
                  spacing: { after: 200, line: 276, lineRule: 'auto' },
                  alignment: AlignmentType.JUSTIFIED,
                  indent: { left: 480 },
                  children: [new TextRun({
                    text: executive_summary || 'Summary of meeting outcomes pending.',
                    size: 18
                  })]
                }),

                // Key Points Section
                new Paragraph({
                  heading: HeadingLevel.HEADING_2,
                  spacing: { after: 120, line: 276, lineRule: 'auto' },
                  children: [new TextRun({
                    text: 'Key Points',
                    bold: true,
                    size: 24
                  })]
                }),
                ...(key_points && key_points.length > 0
                  ? key_points.map(point => new Paragraph({
                      spacing: { after: 80, line: 276, lineRule: 'auto' },
                      indent: { left: 480, hanging: 360 },
                      numbering: { reference: 'key-bullets', level: 0 },
                      children: [new TextRun({ text: point, size: 18 })]
                    }))
                  : [new Paragraph({
                      spacing: { after: 120 },
                      children: [new TextRun({ text: 'Key points pending.', size: 18 })]
                    })]
                ),

                new Paragraph({ text: '', spacing: { after: 120 } }),

                // Discussion Section
                new Paragraph({
                  heading: HeadingLevel.HEADING_2,
                  spacing: { after: 120, line: 276, lineRule: 'auto' },
                  children: [new TextRun({
                    text: 'Discussion',
                    bold: true,
                    size: 24
                  })]
                }),
                ...(discussionParagraphs.length > 0
                  ? discussionParagraphs
                  : [new Paragraph({ children: [new TextRun('Discussion details pending.')] })]
                ),

                new Paragraph({ text: '', spacing: { after: 120 } }),

                // Action Items & Workarounds Section
                new Paragraph({
                  heading: HeadingLevel.HEADING_2,
                  spacing: { after: 120, line: 276, lineRule: 'auto' },
                  children: [new TextRun({
                    text: 'Action Items & Workarounds',
                    bold: true,
                    size: 24
                  })]
                }),

                ...(actionRows.length > 0 ? actionRows : [new Paragraph({ children: [new TextRun({ text: 'No action items or workarounds recorded', size: 18 })] })]),

                new Paragraph({ text: '', spacing: { after: 120 } }),

                // Next Steps (optional)
                ...(next_steps ? [
                  new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    spacing: { after: 120, line: 276, lineRule: 'auto' },
                    children: [new TextRun({
                      text: 'Next Steps',
                      bold: true,
                      size: 24
                    })]
                  }),
                  new Paragraph({
                    spacing: { after: 120, line: 276, lineRule: 'auto' },
                    indent: { left: 480 },
                    children: [new TextRun({ text: next_steps, size: 18 })]
                  })
                ] : []),

                // Summary (optional)
                ...(summary ? [
                  new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    spacing: { after: 120, line: 276, lineRule: 'auto' },
                    children: [new TextRun({
                      text: 'Summary',
                      bold: true,
                      size: 24
                    })]
                  }),
                  new Paragraph({
                    spacing: { after: 120, line: 276, lineRule: 'auto' },
                    alignment: AlignmentType.JUSTIFIED,
                    indent: { left: 480 },
                    children: [new TextRun({ text: summary, size: 18 })]
                  })
                ] : []),

                // Glossary (optional)
                ...(glossary && Object.keys(glossary).length > 0 ? [
                  new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    spacing: { after: 120, line: 276, lineRule: 'auto' },
                    children: [new TextRun({
                      text: 'Glossary',
                      bold: true,
                      size: 24
                    })]
                  }),
                  ...(Object.entries(glossary).map(([term, definition]) =>
                    new Paragraph({
                      spacing: { after: 80, line: 276, lineRule: 'auto' },
                      indent: { left: 480 },
                      children: [
                        new TextRun({ text: term, bold: true, size: 18 }),
                        new TextRun({ text: ': ' + definition, size: 18 })
                      ]
                    })
                  ))
                ] : [])
              ]
            })
          ]
        })
      ]
    }),

    new Paragraph({ text: '' }),

    // Footer
    new Paragraph({
      spacing: { before: 200 },
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999' } },
      children: [new TextRun({
        text: 'BUBU — 30 Years of Cultural Intelligence',
        italic: true,
        size: 18,
        color: '999999'
      })]
    })
  ];

  // Create document with numbering config
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: 'agenda-bullets',
          levels: [
            {
              level: 0,
              format: 'bullet',
              text: '•',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: 480, hanging: 360 }
                }
              }
            }
          ]
        },
        {
          reference: 'key-bullets',
          levels: [
            {
              level: 0,
              format: 'bullet',
              text: '•',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: 480, hanging: 360 }
                }
              }
            }
          ]
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: sections
    }]
  });

  // Write to file
  return Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
  });
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const inputPath = args.find(arg => arg.startsWith('--input='))?.split('=')[1] || args[0];
  const outputPath = args.find(arg => arg.startsWith('--output='))?.split('=')[1];

  if (!inputPath) {
    console.error('Usage: node mom-formatter.js --input=<json-file> [--output=<output-path>]');
    process.exit(1);
  }

  try {
    const meetingData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    const outPath = outputPath || `/tmp/MOM_${new Date().toISOString().split('T')[0]}_${path.parse(inputPath).name}.docx`;

    generateMOM(meetingData, outPath).then(() => {
      console.log(`✓ MOM generated: ${outPath}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

module.exports = { generateMOM };

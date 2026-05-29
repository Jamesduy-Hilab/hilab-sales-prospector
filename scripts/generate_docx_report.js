const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, ImageRun,
        Header, Footer, AlignmentType, HeadingLevel,
        Table, TableRow, TableCell, WidthType,
        PageNumber, TabStopType, TabStopPosition,
        PageBreak } = require('docx');

const COLORS = {
  fireRed: 'CE2029',
  rubyRed: '9B001F',
  carbonBlack: '1E1D1B',
  brightGray: 'EDEDED',
  softBlush: 'FFE8E8',
  racingRed: 'FF003D',
  white: 'FFFFFF',
};

const FONTS = {
  heading: 'Open Sans',
  body: 'Inter',
};

const SIZES = {
  docTitle: 48,      // 24pt
  heading1: 36,      // 18pt
  heading2: 28,      // 14pt
  heading3: 24,      // 12pt
  body: 22,          // 11pt
  caption: 18,       // 9pt
  footer: 16,        // 8pt
};

// Help message
if (process.argv.includes('--help') || process.argv.includes('-h') || process.argv.length < 4) {
  console.log(`
HILAB Document Compiler - Markdown to branded DOCX converter.

Usage:
  node generate_docx_report.js --input <path_to_markdown> --output <path_to_docx>

Options:
  --input, -i   Path to the input Markdown (.md) file (required)
  --output, -o  Path to the output Word (.docx) file (required)
  --help, -h    Show this help message
`);
  process.exit(0);
}

// Parse args
let inputPath = '';
let outputPath = '';
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--input' || process.argv[i] === '-i') {
    inputPath = process.argv[i + 1];
  }
  if (process.argv[i] === '--output' || process.argv[i] === '-o') {
    outputPath = process.argv[i + 1];
  }
}

if (!inputPath || !outputPath) {
  console.error('Error: Both --input and --output arguments are required.');
  process.exit(1);
}

// Read Markdown
if (!fs.existsSync(inputPath)) {
  console.error(`Error: Input file not found: ${inputPath}`);
  process.exit(1);
}

const markdown = fs.readFileSync(inputPath, 'utf8');

// Helper to parse formatting (bold, italic, links) inside text
function parseTextFormatting(text) {
  const runs = [];
  let currentIdx = 0;
  
  // Simple regex to match **bold** or *italic* or [link](url)
  const pattern = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let match;
  
  while ((match = pattern.exec(text)) !== null) {
    const matchIdx = match.index;
    
    // Add text before match
    if (matchIdx > currentIdx) {
      runs.push(new TextRun({
        text: text.substring(currentIdx, matchIdx),
        font: FONTS.body,
        size: SIZES.body,
        color: COLORS.carbonBlack,
      }));
    }
    
    if (match[2]) { // Bold: **text**
      runs.push(new TextRun({
        text: match[2],
        bold: true,
        font: FONTS.body,
        size: SIZES.body,
        color: COLORS.carbonBlack,
      }));
    } else if (match[3]) { // Italic: *text*
      runs.push(new TextRun({
        text: match[3],
        italics: true,
        font: FONTS.body,
        size: SIZES.body,
        color: COLORS.carbonBlack,
      }));
    } else if (match[4]) { // Link: [text](url)
      runs.push(new TextRun({
        text: `${match[4]} (${match[5]})`,
        color: COLORS.fireRed,
        underline: {},
        font: FONTS.body,
        size: SIZES.body,
      }));
    }
    
    currentIdx = pattern.lastIndex;
  }
  
  // Add remaining text
  if (currentIdx < text.length) {
    runs.push(new TextRun({
      text: text.substring(currentIdx),
      font: FONTS.body,
      size: SIZES.body,
      color: COLORS.carbonBlack,
    }));
  }
  
  // Fallback if no formatting found
  if (runs.length === 0 && text.length > 0) {
    runs.push(new TextRun({
      text: text,
      font: FONTS.body,
      size: SIZES.body,
      color: COLORS.carbonBlack,
    }));
  }
  
  return runs;
}

function createHeader() {
  const logoPath = path.join(__dirname, '..', 'resources', 'logo', 'hilab-black.png');
  if (fs.existsSync(logoPath)) {
    const logoData = fs.readFileSync(logoPath);
    return new Header({
      children: [
        new Paragraph({
          children: [
            new ImageRun({
              data: logoData,
              transformation: { width: 120, height: 32 },  // 3.75:1 ratio
              type: 'png',
            }),
          ],
        }),
      ],
    });
  }
  return new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: 'HILAB Technology', bold: true, color: COLORS.fireRed, size: SIZES.heading3, font: FONTS.heading }),
        ],
      }),
    ],
  });
}

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: 'HILAB Technology  |  hilab.asia  |  info@hilab.asia',
            font: FONTS.body,
            size: SIZES.footer,
            color: '999999',
          }),
          new TextRun({ text: '\t' }),
          new TextRun({
            children: ['Page ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES],
            font: FONTS.body,
            size: SIZES.footer,
            color: '999999',
          }),
        ],
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      }),
    ],
  });
}

function createCoverPage(title, subtitle, date) {
  return [
    ...Array(5).fill(new Paragraph({ text: '' })),
    new Paragraph({
      children: [
        new TextRun({ text: '━━━━━━━━━━━━━━━━━━━━', color: COLORS.fireRed, size: 28, font: FONTS.heading }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: title, bold: true, size: 56, font: FONTS.heading, color: COLORS.carbonBlack }),
      ],
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: subtitle, size: 28, font: FONTS.body, color: '666666' }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '━━━━━━━━━━━━━━━━━━━━', color: COLORS.fireRed, size: 28, font: FONTS.heading }),
      ],
    }),
    ...Array(3).fill(new Paragraph({ text: '' })),
    new Paragraph({
      children: [
        new TextRun({ text: 'Date: ' + (date || new Date().toISOString().split('T')[0]), size: 22, font: FONTS.body, color: '999999' }),
      ],
      spacing: { before: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'HILAB Technology', size: 22, font: FONTS.heading, color: COLORS.fireRed }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'hilab.asia  |  info@hilab.asia', size: 18, font: FONTS.body, color: '999999' }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function createBrandedTable(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: headers.map(h => new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: h, bold: true, color: COLORS.white, font: FONTS.heading, size: 20 })],
            spacing: { before: 120, after: 120 },
          })],
          shading: { fill: COLORS.fireRed },
          verticalAlign: 'center',
        })),
        tableHeader: true,
      }),
      ...rows.map((row, i) => new TableRow({
        children: row.map(cell => new TableCell({
          children: [new Paragraph({
            children: parseTextFormatting(String(cell).trim()),
            spacing: { before: 100, after: 100 },
          })],
          shading: i % 2 === 0 ? {} : { fill: 'F5F5F5' },
        })),
      })),
    ],
  });
}

// Simple Markdown Line Parser
const lines = markdown.split(/\r?\n/);
const docChildren = [];

let isCoverPageCreated = false;
let docTitle = 'B2B PROSPECT ANALYSIS';
let docSubtitle = 'Target Lead Audit & Strategy Brief';

// Peek cover page details from markdown
for (let i = 0; i < Math.min(lines.length, 10); i++) {
  const line = lines[i].trim();
  if (line.startsWith('# ')) {
    docTitle = line.replace('# ', '').trim();
  } else if (line.startsWith('**Website:**') || line.startsWith('**URL:**') || line.startsWith('**Company:**')) {
    docSubtitle = `Target: ${line.replace(/\*\*[^*]+\*\*/, '').replace(/[:\s]+/, '').trim()}`;
  }
}

// Generate cover page
docChildren.push(...createCoverPage(docTitle, docSubtitle));

// Parse lines into document elements
let tableHeaders = [];
let tableRows = [];
let inTable = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Table detection
  if (line.startsWith('|')) {
    inTable = true;
    const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
    
    // Check if separator line
    if (cells.every(c => c.startsWith('-'))) {
      continue;
    }
    
    if (tableHeaders.length === 0) {
      tableHeaders = cells;
    } else {
      tableRows.push(cells);
    }
    continue;
  } else if (inTable) {
    // Flush table
    if (tableHeaders.length > 0) {
      docChildren.push(createBrandedTable(tableHeaders, tableRows));
      docChildren.push(new Paragraph({ text: '' }));
    }
    tableHeaders = [];
    tableRows = [];
    inTable = false;
  }
  
  // Skip separator blocks
  if (line === '---') {
    continue;
  }
  
  // Headers
  if (line.startsWith('# ')) {
    const text = line.replace('# ', '').trim();
    docChildren.push(new Paragraph({
      text: text,
      style: HeadingLevel.HEADING_1,
    }));
  } else if (line.startsWith('## ')) {
    const text = line.replace('## ', '').trim();
    docChildren.push(new Paragraph({
      text: text,
      style: HeadingLevel.HEADING_2,
    }));
  } else if (line.startsWith('### ')) {
    const text = line.replace('### ', '').trim();
    docChildren.push(new Paragraph({
      text: text,
      style: HeadingLevel.HEADING_3,
    }));
  }
  // Bullet points
  else if (line.startsWith('- ') || line.startsWith('* ')) {
    const text = line.substring(2).trim();
    docChildren.push(new Paragraph({
      children: parseTextFormatting(text),
      bullet: { level: 0 },
      spacing: { after: 80 },
    }));
  }
  // Blockquotes / Callouts
  else if (line.startsWith('> ')) {
    const text = line.substring(2).trim();
    docChildren.push(new Paragraph({
      children: [
        new TextRun({
          text: text,
          italics: true,
          color: '555555',
        }),
      ],
      spacing: { before: 100, after: 100 },
      indent: { left: 720 }, // Indent blockquote
    }));
  }
  // Paragraphs
  else if (line.length > 0) {
    docChildren.push(new Paragraph({
      children: parseTextFormatting(line),
      spacing: { after: 120 },
    }));
  }
}

// Flush last table if any
if (inTable && tableHeaders.length > 0) {
  docChildren.push(createBrandedTable(tableHeaders, tableRows));
}

// Build Document
const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: FONTS.body,
          size: SIZES.body,
          color: COLORS.carbonBlack,
        },
        paragraph: {
          spacing: { after: 120, line: 276 }, // 1.15 line spacing
        },
      },
      heading1: {
        run: { font: FONTS.heading, size: SIZES.heading1, bold: true, color: COLORS.fireRed },
        paragraph: { spacing: { before: 360, after: 200 } },
      },
      heading2: {
        run: { font: FONTS.heading, size: SIZES.heading2, bold: true, color: COLORS.carbonBlack },
        paragraph: { spacing: { before: 240, after: 120 } },
      },
      heading3: {
        run: { font: FONTS.heading, size: SIZES.heading3, bold: true, color: COLORS.carbonBlack },
        paragraph: { spacing: { before: 200, after: 100 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, // 1 inch
        size: { width: 12240, height: 15840 }, // Letter size
      },
    },
    headers: { default: createHeader() },
    footers: { default: createFooter() },
    children: docChildren,
  }],
});

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log('Word document successfully compiled at: ' + outputPath);
}).catch((err) => {
  console.error('Error generating document:', err);
  process.exit(1);
});

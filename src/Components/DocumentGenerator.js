import React from "react";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  TextDirection,
  WidthType,
  BorderStyle,
  TextRun,
  Column,
} from "docx";
import { saveAs } from "file-saver";

export const DocumentGenerator = (patientCase) => {
  const table = new Table({
    columnWidths: [3505, 5505],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("Hello")],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
            children: [],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph("World")],
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        children: [new Paragraph({ text: "Table with skewed widths" }), table],
      },
    ],
  });

  if (doc) {
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Case_#${patientCase._id}.docx`);
    });
  }
};

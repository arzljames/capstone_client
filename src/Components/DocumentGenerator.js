import React from "react";
import { Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, VerticalAlign, TextDirection }from "docx";
import { saveAs } from "file-saver";

export const DocumentGenerator = (patientCase) => {
  const doc = new Document({
    sections: [
        {
            children: [
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({}), new Paragraph({})],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [new Paragraph({}), new Paragraph({})],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: "bottom to top" }), new Paragraph({})],
                                    textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: "top to bottom" }), new Paragraph({})],
                                    textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text:
                                                "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah",
                                            heading: HeadingLevel.HEADING_1,
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text: "This text should be in the middle of the cell",
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text: "Text above should be vertical from bottom to top",
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text: "Text above should be vertical from top to bottom",
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        },
    ],
});

  if (doc) {
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `ds.docx`);
      
    });
  }
};

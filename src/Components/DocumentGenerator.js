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
} from "docx";
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
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [new Paragraph("Hello")],
                    borders: {
                      top: {
                        style: BorderStyle.DASH_DOT_STROKED,
                        size: 3,
                        color: "FF0000",
                      },
                      bottom: {
                        style: BorderStyle.DOUBLE,
                        size: 3,
                        color: "0000FF",
                      },
                      left: {
                        style: BorderStyle.DASH_DOT_STROKED,
                        size: 3,
                        color: "00FF00",
                      },
                      right: {
                        style: BorderStyle.DASH_DOT_STROKED,
                        size: 3,
                        color: "#ff8000",
                      },
                    },
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
                  }),
                  new TableCell({
                    children: [],
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
      saveAs(blob, `Case_#${patientCase.caseId}.docx`);
    });
  }
};

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

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const getDate = (date) => {
  let today = new Date(date);
  let createdAt =
    today.toLocaleString("en-us", { month: "short" }) +
    " " +
    today.getDate() +
    "," +
    " " +
    today.getFullYear();

  return createdAt;
};

const getTime = (date) => {
  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  let today = new Date(date).toLocaleString("en-US", options);

  return today;
};

export const DocumentGenerator = (patientCase) => {
  const table = new Table({
    columnWidths: [5505, 3505],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(""),
              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Contact: ",
                    bold: true,
                  }),
                  new TextRun(`${patientCase.patient.contact}`),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Sex: ",
                    bold: true,
                  }),
                  new TextRun(patientCase.patient.sex),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Civil Status: ",
                    bold: true,
                  }),
                  new TextRun(patientCase.patient.civilStatus),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Birthday: ",
                    bold: true,
                  }),
                  new TextRun(getDate(patientCase.patient.birthday)),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Age: ",
                    bold: true,
                  }),
                  new TextRun(`${getAge(patientCase.patient.birthday)}`),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Religion: ",
                    bold: true,
                  }),
                  new TextRun(patientCase.patient.religion),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Address: ",
                    bold: true,
                  }),
                  new TextRun(
                    patientCase.patient.address.barangay +
                      "," +
                      " " +
                      patientCase.patient.address.city
                  ),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Birth Place: ",
                    bold: true,
                  }),
                  new TextRun(patientCase.patient.birthplace),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Ethnicity: ",
                    bold: true,
                  }),
                  new TextRun(patientCase.patient.ethnicity),
                ],
              }),

              new Paragraph({
                children: [
                  new TextRun("  "),
                  new TextRun({
                    text: "Legal Guardian: ",
                    bold: true,
                  }),
                  new TextRun(patientCase.patient.guardian.name),
                ],
              }),
            ],
          }),
          new TableCell({
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(""),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "  Hospital",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph("  na"),
              new Paragraph(""),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "  Attending Pysician",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph(
                `  Dr. ${
                  patientCase.physician.firstname +
                  " " +
                  patientCase.physician.lastname
                }`
              ),
              new Paragraph(""),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "  Specialization",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph("  na"),
              new Paragraph(""),

              new Paragraph({
                children: [
                  new TextRun({
                    text: "  Date & Time",
                    bold: true,
                  }),
                ],
              }),

              new Paragraph(
                "  " +
                  getDate(patientCase.createdAt) +
                  " " +
                  getTime(patientCase.createdAt)
              ),
              new Paragraph(""),
            ],
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text:
                  patientCase.patient.firstname +
                  " " +
                  patientCase.patient.middlename[0] +
                  "." +
                  " " +
                  patientCase.patient.lastname,
                bold: true,
                size: 42,
              }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: `CASE ID #${patientCase.caseId}` })],
          }),
          new Paragraph(""),
          table,
          new Paragraph(""),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Temperature: ",
                bold: true,
              }),
              new TextRun(patientCase.temperature),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Respiratory Rate: ",
                bold: true,
              }),

              new TextRun(patientCase.respiratory),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Heart Rate: ",
                bold: true,
              }),

              new TextRun(patientCase.heart),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Blood Pressure: ",
                bold: true,
              }),

              new TextRun(patientCase.blood),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Oxygen Saturation: ",
                bold: true,
              }),

              new TextRun(patientCase.oxygen),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Weight: ",
                bold: true,
              }),

              new TextRun(patientCase.weight),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Height: ",
                bold: true,
              }),

              new TextRun(patientCase.height),
            ],
          }),

          new Paragraph(""),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Chief complaint:",
                bold: true,
              }),
            ],
          }),
          new Paragraph(`  ${patientCase.cc}`),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Pertinent History of Present Illness:",
                bold: true,
              }),
            ],
          }),
          new Paragraph(`  ${patientCase.hpi}`),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Pertinent Past Medical History:",
                bold: true,
              }),
            ],
          }),
          new Paragraph(`  ${patientCase.pmh}`),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Pertinent Review of Systems:",
                bold: true,
              }),
            ],
          }),
          new Paragraph(`  ${patientCase.ros}`),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Pertinent PE Findings:",
                bold: true,
              }),
            ],
          }),
          new Paragraph(`  ${patientCase.pe}`),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Working Impression:",
                bold: true,
              }),
            ],
          }),
          new Paragraph(`  ${patientCase.wi}`),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Initial Management Done:",
                bold: true,
              }),
            ],
          }),
          new Paragraph(`  ${patientCase.imd}`),
          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "  Reason for Referral:",
                bold: true,
              }),
            ],
          }),
          new Paragraph(`  ${patientCase.reason}`),
          new Paragraph(""),
        ],
      },
    ],
  });

  if (doc) {
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Case_#${patientCase._id}.docx`);
    });
  }
};

import React, { useState } from "react";
import { HiDocumentDownload, HiFilter } from "react-icons/hi";

const GenerateReport = ({ setFilterModal }) => {
  return (
    <>
      <div className="reports-header">
        <h2>Reports</h2>
        <div className="reports-header-btns">
          <button onClick={() => setFilterModal(true)} className="edit-filter">
            <p>
              <HiFilter />
            </p>
            Edit Filter
          </button>
          <button className="export-csv">
            <p>
              <HiDocumentDownload />
            </p>
            Export to CSV
          </button>
        </div>
      </div>
    </>
  );
};

export default GenerateReport;

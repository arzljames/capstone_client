import React, { useState } from "react";
import { HiDocumentDownload, HiFilter } from "react-icons/hi";
import { AnimatePresence } from "framer-motion";
import FilterReportModal from "./FilterReportModal";

const GenerateReport = ({ filterModal, setFilterModal }) => {
  return (
    <>
      <AnimatePresence>{filterModal && <FilterReportModal />}</AnimatePresence>
      <div className="reports-header">
        <button className="edit-filter">
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
      <p>GenerateReport</p>
    </>
  );
};

export default GenerateReport;

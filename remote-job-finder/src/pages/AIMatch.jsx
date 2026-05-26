import React, { useState } from "react";
import AIJobMatch from "../components/AIJobMatch";
import CompanyModal from "../components/CompanyModal";

const AIMatch = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIJobMatch onJobClick={setSelectedJob} />
      </div>
      {selectedJob && (
        <CompanyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default AIMatch;
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (start > 2) {
        pages.push("...");
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center mt-6 gap-3">
      <button
        className="px-4 py-2 rounded bg-gray-600 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <div className="flex gap-1 mx-2">
        {getPageNumbers().map((page, index) => (
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              key={`page-${page}`}
              className={`px-3 py-2 rounded text-sm min-w-8 ${
                currentPage === page 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
              onClick={() => page !== currentPage && onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      <button
        className="px-4 py-2 rounded bg-gray-600 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
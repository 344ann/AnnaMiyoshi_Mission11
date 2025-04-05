interface PaginationProps {
  currentPage: number; // Current active page number
  totalPages: number; // Total number of pages available
  pageSize: number; // How many results to show per page
  onPageChange: (newPage: number) => void; // Callback when user selects a new page
  onPageSizeChange: (newSize: number) => void; // Callback when user changes page size
}

// Pagination component to handle page navigation and size selection
const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="flex item-center justify-center mt-4">
      {/* Previous Button - Disabled if already on the first page */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)} // Set new page on click
          disabled={currentPage === index + 1} // Disable button if it's the current page
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button - Disabled if already on the last page */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

      <br />
      {/* Dropdown for changing number of results per page */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            onPageSizeChange(Number(p.target.value)); // Update how many items to show
            onPageChange(1); // Reset to first page when page size changes
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;

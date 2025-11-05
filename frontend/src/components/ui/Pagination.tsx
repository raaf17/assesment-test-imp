interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="join flex justify-center mt-8">
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn ${
            currentPage === page ? "btn-active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        »
      </button>
    </div>
  );
}
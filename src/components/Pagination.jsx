function Pagination({ currentPage, lastPage, onPageChange }) {
    return (
        <div className="d-flex justify-content-end align-items-center w-100">

            <button
                className="btn btn-secondary me-2 text-white"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ←
            </button>

            <span className="text-white">
                Página {currentPage} de {lastPage}
            </span>

            <button
                className="btn btn-secondary ms-2 text-white"
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                →
            </button>

        </div>
    );
}

export default Pagination;
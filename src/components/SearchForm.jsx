function SearchForm({ ipQuery, setIpQuery, onSearch, errorMessage }) {
    return (
        <form onSubmit={onSearch}>
            <div className="input-group">
                <input
                    type="text"
                    value={ipQuery}
                    onChange={(e) => setIpQuery(e.target.value)}
                    className="form-control"
                    placeholder="Consultar nueva IP..."
                />
                <button className="btn btn-secondary">Consultar <i className="bi bi-search"></i></button>
            </div>

            {errorMessage && (
                <small className="text-danger">{errorMessage}</small>
            )}
        </form>
    );
}

export default SearchForm;
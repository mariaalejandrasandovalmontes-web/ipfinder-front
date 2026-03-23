function FilterForm({ filterQuery, setFilterQuery, onFilter }) {
    return (
        <form onSubmit={onFilter}>
            <div className="input-group">
                <input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="form-control"
                    placeholder="Buscar existentes..."
                />
                <button className="btn btn-secondary">Filtrar <i className="bi bi-filter"></i></button>
            </div>
        </form>
    );
}

export default FilterForm;
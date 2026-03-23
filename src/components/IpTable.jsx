function IpTable({ data, onSelectIp, onDelete }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table-dark">

                <thead>
                <tr>
                    <th>IP</th>
                    <th className="d-none d-lg-table-cell">RIR</th>
                    <th>Compañía</th>
                    <th>Dominio</th>
                    <th>Tipo</th>
                    <th className="d-none d-lg-table-cell">Coordenadas</th>
                    <th>País</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="8" className="text-center text-white">
                            No se encontraron resultados
                        </td>
                    </tr>
                ) : (
                    data.map((item) => (
                        <tr key={item.id}>

                            {/* IP (click abre modal) */}
                            <td
                                className="text-success opacity-75"
                                style={{ cursor: "pointer" }}
                                onClick={() => onSelectIp(item)}
                            >
                                <strong>
                                    <i className="bi bi-info-circle"></i> {item.ip}
                                </strong>
                            </td>

                            <td className="d-none d-lg-table-cell">
                                {item.rir}
                            </td>

                            <td>{item.company_name}</td>
                            <td>{item.company_domain}</td>
                            <td>{item.type}</td>

                            <td className="d-none d-lg-table-cell">
                                {item.lat}, {item.lon}
                            </td>

                            <td>{item.country}</td>

                            {/* eliminar */}
                            <td>
                                <a
                                    href="#"
                                    className="text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete(item.id);
                                    }}
                                >
                                    <i className="bi bi-x"></i>
                                </a>
                            </td>

                        </tr>
                    ))
                )}
                </tbody>

            </table>
        </div>
    );
}

export default IpTable;
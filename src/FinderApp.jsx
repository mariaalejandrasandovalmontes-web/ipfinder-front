import React, { useEffect, useState } from "react";
import './assets/app.css';

function FinderApp() {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });
    const [ipQuery, setIpQuery] = useState("");
    const [filterQuery, setFilterQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedIp, setSelectedIp] = useState(null);
    const [showIpModal, setShowIpModal] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);



    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}\d|)\d)\.){3,3}(25[0-5]|(2[0-4]|1{0,1}\d|)\d)|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}\d|)\d)\.){3,3}(25[0-5]|(2[0-4]|1{0,1}\d|)\d))$/;

    const isValidIp = (ip) => ipv4Regex.test(ip) || ipv6Regex.test(ip);

    const fetchData = (page = 1, query = "") => {
        setLoading(true);
        setLoading(true);
        let url = `https://ipfinder-back-production.up.railway.app/list?per_page=10&page=${page}`;
        if (query) {
            url += `&query=${query}`;
        }
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setData(json.data);
                setPagination({
                    current_page: json.current_page,
                    last_page: json.last_page,
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
                setLoading(false);
            });
    };

    const searchIp = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!ipQuery) return;

        if (!isValidIp(ipQuery)) {
            setModalMessage("La IP ingresada no posee un formato válido (IPv4/IPv6).");
            setShowModal(true);
            return;
        }

        fetch(`https://ipfinder-back-production.up.railway.app/get?ip=${ipQuery}`)
            .then((res) => res.json())
            .then((json) => {
                if (!json.success) {
                    setModalMessage(json.message);
                    setShowModal(true);
                } else {
                    fetchData();
                    setIpQuery("");
                }
            })
            .catch(() => {
                setModalMessage("Error de conexión con el servidor.");
                setShowModal(true);
            });
    };

    const filterData = (e) => {
        e.preventDefault();
        if (!filterQuery) {
            fetchData(); // si está vacío, muestra todo
            return;
        }
        fetchData(1, filterQuery); // aplica el filtro
    };

    const deleteRecord = (id) => {
        fetch(`https://ipfinder-back-production.up.railway.app/remove/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    // refrescar la tabla
                    fetchData(pagination.current_page, filterQuery);
                } else {
                    setModalMessage(json.message || "No se pudo eliminar el registro.");
                    setShowModal(true);
                }
            })
            .catch(() => {
                setModalMessage("Error de conexión con el servidor.");
                setShowModal(true);
            });
    };


    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style={{
                    backgroundColor: "rgba(000, 000, 000, 0.5)", // blanco con opacidad
                    zIndex: 1050, // por encima de la tabla y otros elementos
                }}
            >
                <div className="spinner-border text-white" role="status" style={{width: "6rem", height: "6rem"}}>
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>

        );
    }

    return (
        <div className="container mt-4">
            <h2 className="text-white press-start mt-5">BUSCADOR IPS</h2>


            <div className="row mb-3">
                <div className="col-12 col-md-4 mb-2">
                    <form className="d-flex flex-column" onSubmit={searchIp}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Consultar nueva IP..."
                                value={ipQuery}
                                onChange={(e) => setIpQuery(e.target.value)}
                            />
                            <button type="submit" className="btn btn-secondary">
                                Consultar <i className="bi bi-search"></i>
                            </button>
                        </div>
                        {errorMessage && (
                            <small className="text-danger mt-1">{errorMessage}</small>
                        )}
                    </form>
                </div>

                <div className="col-12 col-md-4 mb-2">
                    <form className="d-flex flex-column" onSubmit={filterData}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar existentes..."
                                value={filterQuery}
                                onChange={(e) => setFilterQuery(e.target.value)}
                            />
                            <button type="submit" className="btn btn-secondary col-sm-3">
                                Filtrar <i className="bi bi-filter"></i>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-12 col-md-2"></div>

                <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
                    <button
                        className="btn btn-secondary me-2"
                        disabled={pagination.current_page === 1}
                        onClick={() => fetchData(pagination.current_page - 1)}
                    >
                        ←
                    </button>
                    <span className="text-white">
          Página {pagination.current_page} de {pagination.last_page}
        </span>
                    <button
                        className="btn btn-secondary ms-2"
                        disabled={pagination.current_page === pagination.last_page}
                        onClick={() => fetchData(pagination.current_page + 1)}
                    >
                        →
                    </button>
                </div>
            </div>


            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content border-warning-subtle ">
                            <div className="modal-header bg-warning text-warning-emphasis">
                                <h5 className="modal-title d-flex align-items-center">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    Aviso
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body bg-dark text-white">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer bg-dark text-white">
                                <button
                                    type="button"
                                    className="btn btn-outline-warning"
                                    onClick={() => setShowModal(false)}
                                >
                                    <i className="bi bi-x-circle me-1"></i> Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showIpModal && selectedIp && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedIp.company_name} | {selectedIp.ip}  </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowIpModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-xs-12">
                                        <span><strong>Dominio:</strong> {selectedIp.company_domain}</span>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-xs-12">
                                        <span><strong>Tipo:</strong> {selectedIp.type}</span>
                                    </div>
                                    <div className="col-lg-5 col-md-6 col-xs-12">
                                        <span><strong>País:</strong> {selectedIp.country}</span>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-xs-12">
                                        <span><strong>Latitud:</strong> {selectedIp.lat}</span>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-xs-12">
                                        <span><strong>Longitud:</strong>{selectedIp.lon}</span>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-xs-12">
                                        <span><strong>CP:</strong> {selectedIp.zipcode}</span>
                                    </div>
                                </div>


                                {/* Aquí va el mapa */}
                                <div className="mt-3" style={{height: "300px"}}>
                                    <iframe
                                        title="Mapa de IP"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        src={`https://www.google.com/maps?q=${selectedIp.lat},${selectedIp.lon}&hl=es&z=12&output=embed`}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowIpModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {showConfirmModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowConfirmModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de que deseas eliminar este registro?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowConfirmModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => {
                                        deleteRecord(recordToDelete);
                                        setShowConfirmModal(false);
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead className="">
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
                    {
                        data.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center text-white">
                                            No se encontraron resultados
                                        </td>
                                    </tr>
                                ) :

                            ( data.map((item) => (
                        <tr key={item.id}>
                            <td  className="text-success opacity-75"
                                 style={{cursor: "pointer"}}
                                 onClick={() => {
                                     setSelectedIp(item);
                                     setShowIpModal(true);
                                 }} >
                                <strong>
                                    <i className="bi bi-info-circle"></i> {item.ip}
                                </strong>
                            </td>
                            <td className=" d-none d-lg-table-cell">{item.rir}</td>
                            <td>{item.company_name}</td>
                            <td>{item.company_domain}</td>
                            <td>{item.type}</td>
                            <td className="d-none d-lg-table-cell">{item.lat}, {item.lon}</td>
                            <td>{item.country}</td>
                            <td>
                                <a href="javascript:void(0);" className="text-white"

                                   onClick={() => {
                                       setRecordToDelete(item.id);
                                       setShowConfirmModal(true);
                                   }}

                                >
                                    <i className="bi bi-x"></i>


                                </a>

                            </td>
                        </tr>
                        )
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FinderApp;
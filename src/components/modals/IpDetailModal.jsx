function IpDetailModal({ show, ipData, onClose }) {
    if (!show || !ipData) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            {ipData.company_name} | {ipData.ip}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="row">

                            <div className="col-lg-3 col-md-6 col-xs-12">
                                <span>
                                    <strong>Dominio:</strong> {ipData.company_domain}
                                </span>
                            </div>

                            <div className="col-lg-3 col-md-6 col-xs-12">
                                <span>
                                    <strong>Tipo:</strong> {ipData.type}
                                </span>
                            </div>

                            <div className="col-lg-5 col-md-6 col-xs-12">
                                <span>
                                    <strong>País:</strong> {ipData.country}
                                </span>
                            </div>

                            <div className="col-lg-3 col-md-6 col-xs-12">
                                <span>
                                    <strong>Latitud:</strong> {ipData.lat}
                                </span>
                            </div>

                            <div className="col-lg-3 col-md-6 col-xs-12">
                                <span>
                                    <strong>Longitud:</strong> {ipData.lon}
                                </span>
                            </div>

                            <div className="col-lg-3 col-md-6 col-xs-12">
                                <span>
                                    <strong>CP:</strong> {ipData.zipcode}
                                </span>
                            </div>

                        </div>

                        {/* mapa */}
                        <div className="mt-3" style={{ height: "300px" }}>
                            <iframe
                                title="Mapa de IP"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps?q=${ipData.lat},${ipData.lon}&hl=es&z=12&output=embed`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default IpDetailModal;
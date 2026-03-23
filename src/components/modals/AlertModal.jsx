function AlertModal({ show, message, onClose }) {
    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content border-warning-subtle">

                    <div className="modal-header bg-warning text-warning-emphasis">
                        <h5 className="modal-title d-flex align-items-center">
                            <i className="bi bi-exclamation-circle me-2"></i>
                            Alerta
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body bg-dark text-white">
                        <p>{message}</p>
                    </div>

                    <div className="modal-footer bg-dark text-white">
                        <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={onClose}
                        >
                            <i className="bi bi-x-circle me-1"></i>
                            Cerrar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AlertModal;
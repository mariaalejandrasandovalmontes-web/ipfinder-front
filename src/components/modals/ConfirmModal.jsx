function ConfirmModal({ show, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar</h5>
                        <button className="btn-close" onClick={onCancel}></button>
                    </div>

                    <div className="modal-body">
                        <p>¿Estás seguro de que deseas eliminar este registro?</p>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={onConfirm}>
                            Eliminar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
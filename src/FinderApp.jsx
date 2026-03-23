import { useState } from "react";
import { useIpData } from "./hooks/useIpData";
import { isValidIp } from "./utils/ipValidator";

import SearchForm from "./components/SearchForm";
import FilterForm from "./components/FilterForm";
import IpTable from "./components/IpTable";
import Pagination from "./components/Pagination";

import AlertModal from "./components/Modals/AlertModal";
import ConfirmModal from "./components/Modals/ConfirmModal";
import IpDetailModal from "./components/Modals/IpDetailModal";

import './assets/app.css';

function FinderApp() {

    const {
        data,
        loading,
        pagination,
        fetchData,
        handleSearch,
        handleDelete,
    } = useIpData();

    const [ipQuery, setIpQuery] = useState("");
    const [filterQuery, setFilterQuery] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [selectedIp, setSelectedIp] = useState(null);
    const [showIpModal, setShowIpModal] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);

    const onSearch = async (e) => {
        e.preventDefault();

        if (!ipQuery) return;

        if (!isValidIp(ipQuery)) {
            setModalMessage("La IP ingresada no es válida.");
            setShowModal(true);
            return;
        }

        const res = await handleSearch(ipQuery);

        if (!res.success) {
            setModalMessage(res.message);
            setShowModal(true);
        } else {
            fetchData();
            setIpQuery("");
        }
    };

    const onFilter = (e) => {
        e.preventDefault();

        if (!filterQuery) {
            fetchData();
        } else {
            fetchData(1, filterQuery);
        }
    };

    const onAskDelete = (id) => {
        setRecordToDelete(id);
        setShowConfirmModal(true);
    };

    const onConfirmDelete = async () => {
        const res = await handleDelete(
            recordToDelete,
            pagination.current_page,
            filterQuery
        );

        if (!res.success) {
            setModalMessage(res.message || "Error al eliminar");
            setShowModal(true);
        }

        setShowConfirmModal(false);
    };

    const onSelectIp = (item) => {
        setSelectedIp(item);
        setShowIpModal(true);
    };

    if (loading) {
        return <div className="text-white text-center mt-5">Cargando...</div>;
    }

    return (
        <div className="container mt-4">

            <h1 className="text-white press-start mt-5 text-center text-md-start">BUSCADOR IPS</h1>

            <div className="row mb-3">

                <div className="col-md-4 pb-1">
                    <SearchForm
                        ipQuery={ipQuery}
                        setIpQuery={setIpQuery}
                        onSearch={onSearch}
                    />
                </div>

                <div className="col-md-4 pb-1">
                    <FilterForm
                        filterQuery={filterQuery}
                        setFilterQuery={setFilterQuery}
                        onFilter={onFilter}
                    />
                </div>

                <div className="col-md-1"></div>
                <div className="col-md-3 justify-content-end">
                    <Pagination
                        currentPage={pagination.current_page}
                        lastPage={pagination.last_page}
                        onPageChange={(page) => fetchData(page, filterQuery)}
                    />
                </div>

            </div>

            <IpTable
                data={data}
                onSelectIp={onSelectIp}
                onDelete={onAskDelete}
            />

            <AlertModal
                show={showModal}
                message={modalMessage}
                onClose={() => setShowModal(false)}
            />

            <ConfirmModal
                show={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={onConfirmDelete}
            />

            <IpDetailModal
                show={showIpModal}
                ipData={selectedIp}
                onClose={() => setShowIpModal(false)}
            />

        </div>
    );
}

export default FinderApp;
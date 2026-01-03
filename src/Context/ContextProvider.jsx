import { createContext, useState } from "react";
import GenericStatusModal from "../Component/common/GenericStatusModal";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [openModal, setOpenModal] = useState(false);
    const [invoices, setInvoices] = useState([]);





    // Generic alert modal state
    const [statusModal, setStatusModal] = useState({
        open: false,
        type: "success",
        title: "",
        message: "",
        primaryButtonText: "OK",
        onPrimaryAction: null,
    });

    // 🔹Generic alert GLOBAL FUNCTION (IMPORTANT)
    const showStatusModal = (config) => {
        setStatusModal({
            open: true,
            ...config,
        });
    };

    // Generic alert modal close function
    const closeStatusModal = () => {
        setStatusModal((prev) => ({ ...prev, open: false }));
    };
    return (
        <Context.Provider value={{ openModal, setOpenModal, invoices, setInvoices, statusModal, setStatusModal, showStatusModal, closeStatusModal }}>
            {children}


            {/* GLOBAL MODAL RENDER */}

            <GenericStatusModal
                open={statusModal.open}
                type={statusModal.type}
                title={statusModal.title}
                message={statusModal.message}
                primaryButtonText={statusModal.primaryButtonText}
                onPrimaryAction={() => {
                    statusModal.onPrimaryAction?.();
                    closeStatusModal();
                }}
                onClose={closeStatusModal}
            />
        </Context.Provider>
    )
}
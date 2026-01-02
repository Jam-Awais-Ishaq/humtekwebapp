import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="lg" height="auto"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 0,
                    width: {
                        xs: "100%",
                        sm: "80%",
                        md: "60%",
                        lg: "50%",
                        xl: "40%",
                    },
                },
            }}
        >
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

export default Modal;
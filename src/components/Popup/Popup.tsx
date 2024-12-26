import { Box } from "@mui/material"
import Button from "../Button/Button";

export interface PopupProps {
    open: boolean;
    onClose: () => void;
    heading: string;
    handleSubmit?: () => void;
    handleCancel?: () => void;
    submitText?: string;
    text?: string;
    children?: React.ReactNode;
    showButton?: boolean;
}
const Popup = ({ open, onClose, heading, handleSubmit, handleCancel, text, submitText,children,showButton }: PopupProps) => {
    return (
        <Box
            sx={{
                height: "100%",
                width: "600px",
                backgroundColor: "white",
                position: "fixed",
                top: 0,
                right: open ? 0 : "-600px",
                transition: "transform 0.3s ease, right 0.3s ease",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                zIndex: 1000,
            }}
        >
            <Box sx={{ padding: "16px", display: "flex", justifyContent: "space-between", borderBottom: '2px solid black' }}>
                <Box sx={{ marginTop: '80px', fontWeight: 700, fontSize: '16px' }}>{heading}</Box>
                <button onClick={onClose} style={{ cursor: "pointer", marginTop: '80px' }}>✖</button>
            </Box>

            <Box sx={{ fontSize: '16px', padding: '10px 10px' }}>
                {text}
            </Box>
            {children}
            {showButton &&
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button text={submitText || ''} variant="primary" size="medium" css={{ width: '200px' }} onClick={handleSubmit} />
                <Button text="Cancel" variant="primary" size="medium" css={{ width: '100px' }} onClick={handleCancel} />

            </Box>
}

        </Box>
    )
}
export default Popup;

"use client";


type Props = {
    open: boolean;
    onClose: () => void;
};

export default function UpdateTicketModal({open, onClose}: Props) {
    
    if (!open) return null;
    
    return (
        <div 
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                zIndex: 9999,
            }}
        >
            <div onClick={(e) => e.stopPropagation()}
                 style={{
                     background: "white",
                     borderRadius: 12,
                     padding: 16,
                     width: 420,
                     border: "1px solid #e5e5e5",
                 }}>
                <h3 style={{ marginTop: 0, color: "black" }}>Update Ticket</h3>
                <button onClick={onClose} style={{color: "black"}}>close</button>
            </div>
            
        </div>
    )
}
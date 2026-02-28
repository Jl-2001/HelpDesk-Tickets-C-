"use client";
import {useState, useEffect} from "react";


type Ticket = {
    id: number;
    category: string;
    priority: string;
    status: string;
};


type Props = {
    open: boolean;
    onClose: () => void;
    ticket: Ticket ;
    onUpdated: (ticket: Ticket) => void;
};
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5217";


//send in props to receive data 
export default function UpdateTicketModal({open, onClose, ticket, onUpdated}: Props) {
    const [status, setStatus] = useState(ticket.status);
    const [priority, setPriority] = useState(ticket.priority);
    const [category, setCategory] = useState(ticket.category);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if(!open) return;
        setStatus(ticket.status);
        setCategory(ticket.category);
        setPriority(ticket.priority);
    }, [open, ticket])
    
    const saveChanges = async () => {
        
        try {
            setSaving(true);
            const res = await fetch(`${API_BASE}/api/tickets/${ticket.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status,
                    priority,
                    category
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text)
            }
            const updated: Ticket = await res.json();
            onUpdated(updated);
            onClose();
        } catch (err: any) {
            setError(err?.message ?? "failed to updated ticket ")
        } finally {
            setSaving(false);
        }
        
    } 
    
    if (!open) return null;
    
    
    
    return (
        <div 
            onClick={() => {
                if (saving) return;
                onClose();
            }}
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
                     width: 520,                // a bit wider so fields don’t wrap
                     border: "1px solid #e5e5e5",
                     display: "flex",
                     flexDirection: "column",
                     gap: 12,
                 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, color: "#111" }}>Update Ticket</h3>
                    <button onClick={onClose}  disabled={saving} style={{ border: "1px solid #444",
                        borderRadius: 8,
                        padding: "6px 10px",
                        background: "transparent",
                        cursor: "pointer"}}>x</button>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ color: "#111", fontSize: 12, fontWeight: 600 }}>Priority</span>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)} style={selectStyle}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ color: "#111", fontSize: 12, fontWeight: 600 }}>Category</span>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} style={selectStyle}>
                                <option>Hardware</option>
                                <option>Software</option>
                                <option>Network</option>
                                <option>Access</option>
                            </select>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ color: "#111", fontSize: 12, fontWeight: 600 }}>Status</span>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)} style={selectStyle}>
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                            </select>
                    </div>
                </div>
                
                {error && <p style={{color: "crimson"}}>{error}</p>}
                
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
                <button
                    onClick={onClose}
                    disabled={saving}
                    style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #444",
                        background: "transparent",
                        cursor: saving ? "not-allowed" : "pointer",
                        opacity: saving ? 0.6 : 1,
                    }}
                >
                    Cancel
                </button>
                <button disabled={saving} onClick={saveChanges} style={{
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #111",
                    background: "#111",
                    color: "white",
                    cursor: saving ? "not-allowed" : "pointer",
                    opacity: saving ? 0.7 : 1,
                }}>{saving ? "Saving..." : "Save Changes"}</button>
                </div>
                
            </div>
            
        </div>
    )
}

const selectStyle: React.CSSProperties = {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #ccc",
    background: "white",
};
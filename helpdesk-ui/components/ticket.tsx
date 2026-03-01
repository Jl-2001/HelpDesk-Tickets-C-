"use client";

type Ticket = {
    id: number;
    title: string;
    description?: string | null;
    category: string;
    priority: string;
    status: string;
    createdAt: string;
    resolvedAt?: string | null;
};

export default function TicketView({ ticket }: { ticket: Ticket }) {
    return (
        <div style={{ marginTop: 16, border: "1px solid #e5e5e5", borderRadius: 10, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <h1 style={{ margin: 0 }}>{ticket.title}</h1>
                <div style={{ opacity: 0.8 }}>ID: {ticket.id}</div>
               
            </div>
            

            {ticket.description && <p style={{ marginTop: 12 }}>{ticket.description}</p>}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                <Badge label={`Status: ${ticket.status}`} />
                <Badge label={`Priority: ${ticket.priority}`} />
                <Badge label={`Category: ${ticket.category}`} />
            </div>

            <div style={{ marginTop: 12, opacity: 0.8, fontSize: 13 }}>
                Created: {new Date(ticket.createdAt).toLocaleString()}
                {ticket.resolvedAt ? <> • Resolved: {new Date(ticket.resolvedAt).toLocaleString()}</> : null}
            </div>
                
            
            
            {/* Later: notes/comments UI goes here */}
        </div>
        
    );
}

function Badge({ label }: { label: string }) {
    return (
        <span
            style={{
                border: "1px solid #444",
                borderRadius: 999,
                padding: "6px 10px",
                fontSize: 12,
            }}
        >
      {label}
    </span>
    );
}


const label: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    marginBottom: 10,
};
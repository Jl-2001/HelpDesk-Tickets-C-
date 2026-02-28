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
                
            
            <div style={{marginTop: 16,
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: 16,
                background: "#0f0f0f"}}>
               <h4>Comments</h4>

                <div style={{
                    border: "1px solid #333",
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 8,
                    background: "#151515"
                }}>
                    <p style={{ margin: 0, color: "#e5e5e5" }}>
                        my vpn is not connecting or holding connection longer than 10 seconds
                    </p>

                    <span style={{
                        fontSize: 12,
                        color: "#9ca3af"
                    }}>
                    Feb 5, 7:41 PM
                  </span>
                </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <textarea
                      placeholder="Add a comment..."
                      style={{
                          flex: 1,
                          borderRadius: 10,
                          border: "1px solid #333",
                          padding: 10,
                          background: "#111",
                          color: "white",
                          minHeight: 60,
                          resize: "vertical"
                      }}
                  />

                        <button style={{
                            padding: "8px 14px",
                            borderRadius: 10,
                            border: "1px solid #444",
                            background: "#111",
                            color: "white",
                            cursor: "pointer"
                        }}>
                            Add
                        </button>
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
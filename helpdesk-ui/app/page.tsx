"use client";
import {useEffect, useState} from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5127";


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

type CreateTicketDto = {
  title: string;
  description?: string | null;
  category: string;
  priority: string;
}
  
export default function Home() {
  
  const [tickets,setTickets] = useState<Ticket[]>([]);
  const [loading,setLoading] = useState(true);
  
  //form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hardware");
  const [priority, setPriority] = useState("Medium");
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchTickets();
  }, []);
  
  async function fetchTickets(){
    setError(null)
    setLoading(true);
    
    try {
      const res = await fetch(`${API_BASE}/api/tickets`);
      if (!res.ok) {
        const text =await res.text();
        throw new Error(`GET failed: (${res.status}): ${text}`)
      }
      const data: Ticket[] = await res.json();
      setTickets(data);
    } catch (e: any) {
      setError(e?.message ?? "failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  }
  
  async function createTicket() {
    setError(null);
    
    const payload: CreateTicketDto = {
      title: title.trim(),
      description: description.trim() ? description.trim() : null,
      category,
      priority
    };
    
    if (!payload.title) {
      setError("title is required");
      return;
    }
    setSubmitting(true);
    
    try {
      const res = await fetch(`${API_BASE}/api/tickets`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`POST failed: (${res.status}) : ${text}`);
      }
      
      setTitle("");
      setDescription("");
      setCategory("Hardware");
      setPriority("Medium");
      
      await fetchTickets();
    } catch (e:any) {
      setError(e?.message ?? "failed to create ticket")
    } finally {
      setSubmitting(false);
    }
  }
  
  return (
    <main style={{ fontFamily: "system-ui", padding: 24, maxWidth: 950, margin: "0 auto" }}>
      <header>
        <div>
          <h1 style={{ margin: 0 }}>Help Desk Tickets</h1>
            <p style={{ margin: "6px 0 0", color: "#555" }}>
              C# get and post requests example
            </p>
        </div>
        
        <button onClick={fetchTickets} disabled={loading} style={btnSecondary}>
          {loading ? "refreshing..." : "refresh"}
        </button>
      </header>

      {error && (
          <div style={errorBox}>
            <strong>Error:</strong> {error}
          </div>
      )}
      
      
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 2fr", marginTop: 18 }}>
        <div style={card}>
        <h2 style={{ marginTop: 0 }}> Create Ticket</h2>
        
        
          <label style={label}>
            Title
            <input
                style={input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. VPN not connecting"
            />
          </label>
          
          <label style={label}>
            Description
            <textarea
                style={{ ...input, height: 90, resize: "vertical" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="optional details..."
            />
          </label>
          
            <label style={label}>
              category
              <select 
                  style={input}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
                <option>Access</option>
              </select>
            </label>
            
            <label style={label}>
              Priority
              <select
                  style={input}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
          
            <button
              onClick={createTicket}
              disabled={submitting}
              style={btnPrimary}
            >
              {submitting ? "creating...": "create ticket"}
            </button>
          </div>
          
          <div style={card}>
            <h2 style={{ marginTop: 0 }}>Tickets</h2>
            {loading ? (
                <p>Loading tickets...</p>
            ) : (
                <div style={{ overflowX: "auto", marginTop: 10 }}>
                  <table style={table}>
                    <thead>
                    <tr>
                      <th style={th}>Title</th>
                      <th style={th}>Category</th>
                      <th style={th}>Priority</th>
                      <th style={th}>Status</th>
                      <th style={th}>Created</th>
                    </tr>
                    </thead>

                    <tbody>
                    {tickets.map((t) => (
                        <tr key={t.id}>
                          <td style={td}>{t.id}</td>
                          <td style={td}>
                            <div style={{ fontWeight: 600 }}>{t.title}</div>
                            {t.description && (
                                <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>
                                  {t.description}
                                </div>
                            )}
                          </td>
                          <td style={td}>{t.category}</td>
                          <td style={td}>{t.priority}</td>
                          <td style={td}>{t.status}</td>
                          <td style={td}>{new Date(t.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                  {tickets.length === 0 && <p>No Title</p>}
                </div> 
            )}
          </div>
      </section>
      </main>
  );
}

const card: React.CSSProperties = {
  background: "white",
  border: "1px solid #e5e5e5",
  borderRadius: 10,
  padding: 16,
  boxShadow: "0 1px 6px rgba(0,0,0,0.06)"
};

const label: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  marginBottom: 10,
  color: "#333"
};

const input: React.CSSProperties = {
  width: "100%",
  marginTop: 6,
  padding: "10px 10px",
  borderRadius: 8,
  border: "1px solid #ddd",
  outline: "none"
};

const btnPrimary: React.CSSProperties = {
  width: "100%",
  marginTop: 8,
  padding: "10px 12px",
  borderRadius: 10,
  border: "none",
  background: "#111",
  color: "white",
  fontWeight: 600,
  cursor: "pointer"
};

const btnSecondary: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "white",
  color: "black",
  cursor: "pointer"
};

const errorBox: React.CSSProperties = {
  marginTop: 14,
  padding: 12,
  borderRadius: 10,
  border: "1px solid #f5c2c7",
  background: "#f8d7da",
  color: "#842029"
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse"
};

const th: React.CSSProperties = {
  textAlign: "left",
  fontSize: 12,
  color: "#668",
  padding: "10px 8px",
  borderBottom: "1px solid #eee"
};

const td: React.CSSProperties = {
  padding: "10px 8px",
  borderBottom: "1px solid #f2f2f2",
  color: "#668",
  verticalAlign: "top"
};

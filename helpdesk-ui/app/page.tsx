"use client";
import {useEffect, useState} from "react";

const API_BASE = "http://localhost:5217"


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
    <main style={{padding: "2rem"}}>
      <h1>Help Desk Tickets</h1>
      
      <section style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}> Create Ticket</h2>
        
        <div>
          <label>
            Title
            <input
                style={{ width: "100%", padding: 8, marginTop: 4 }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. VPN not connecting"
            />
          </label>
          <label>
            Description
            <textarea
                style={{ width: "100%", padding: 8, marginTop: 4 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="optional details..."
                rows={3}
            />
          </label>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label>
              category
              <select 
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
                <option>Access</option>
              </select>
            </label>
            
            <label>Priority
              <select
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                  value={category}
                  onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
          </div>
          
          <button
            onClick={createTicket}
            disabled={submitting}
            style={{
              padding: "10px 14px",
              cursor: submitting ? "not-allowed" : "pointer"
            }}
          >
            {submitting ? "creating...": "create ticket"}
          </button>

          {error && (
              <p style={{ color: "crimson", margin: 0 }}>
                {error}
              </p>
          )}
        </div>
      </section>
      
      <section style={{ color: "crimson", margin: 0 }}>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0 }}>Ticket</h2>
          <button onClick={fetchTickets} disabled={loading} style={{ padding: "8px 12px"}}>
            {loading ? "refreshing...": "refresh"}
          </button>
        </div>
        
        
      {loading && <p>loading tickets</p>}
        {!loading && tickets.length === 0 && <p>no tickets yet</p>}

      {!loading && tickets.length > 0 &&(
          <div style={{ overflowX: "auto", marginTop: 10 }}>
          <table width="100%" border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
            <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
            </thead>
            
            <tbody>
            {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.title}</td>
                  <td>{ticket.category}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.status}</td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                </tr>
            ))}
            </tbody>
          </table>
          </div>
      )}
      </section>
      </main>
  );
}

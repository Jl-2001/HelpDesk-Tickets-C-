"use client";
import Link from "next/link"
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import TicketView from "@/components/Ticket";
import UpdateTicketModal from "@/components/modals/UpdateTicketModal";



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

type TicketComment = {
    id: number;
    ticketId: number;
    body: string;
    createdAt: string;
    updatedAt?: string | null;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5217";




export default function Page() {

    const { id } = useParams<{ id: string }>();

    const [ticket,setTicket] = useState<Ticket | null>(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedTicket, setUpdatedTicket] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    //tickets comments
    const [comments, setComments] = useState<TicketComment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [postingComment, setPostingComment] = useState(false);



    useEffect(() => {
        
        if(!id) return;

        const fetchTicket = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${API_BASE}/api/tickets/${id}`);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`GET failed (${res.status}): ${text}`);
                }
                const data: Ticket = await res.json();
                setTicket(data);
            } catch (e: any) {
                setError(e?.message ?? "failed to load ticket");
            } finally {
                setLoading(false);
            }
        };
        
        fetchTicket();
    }, [id]);


    const handleResolve = async () => {
        if (!id) return;
        
        try {
            setUpdatedTicket(true);
            setError(null);
            
            const res = await fetch(`${API_BASE}/api/tickets/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "Resolved",
                }),
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text)
            }
            const updated: Ticket = await res.json();
            setTicket(updated);
        } catch (err: any) {
            setError(err?.message ?? "failed to update ticket")
        } finally {
            setUpdatedTicket(false);
        }
    }
    
    const fetchTicketComments = async () => {
        if(!id) return;
            try {
                setCommentsLoading(true);
                setError(null);
                
                const res = await fetch(`${API_BASE}/api/tickets/${id}/comments`);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`GET comments failed(${res.status}): ${text}`);
                }
                const data: TicketComment[] = await res.json();
                setComments(data);
            }catch (e: any) {
                setError(e?.message ?? "failed to load comments");
            } finally {
                setCommentsLoading(false);
            }
    };

    
    
    useEffect(() => {
        if(!id) return;
        fetchTicketComments();
    }, [id])
    
    const postComment = async () => {
        if (!id) return;
        const body = newComment.trim();
        if (!body) return;
        
        try {
            setPostingComment(true);
            setError(null);
            const res = await fetch(`${API_BASE}/api/tickets/${id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ body }),
            });
            
            if (!res.ok){
                const text = await res.text();
                throw new Error(`POST failed (${res.status}): ${text}`);
            }
            setNewComment("");
            await fetchTicketComments();
        } catch (e: any) {
            setError(e?.message ?? "failed to load comments");
        } finally {
            setPostingComment(false);
        }
    }

    if (loading) return <div style={{ padding: 20 }}>Loading ticket...</div>;

    if (error)
        
        return (
            <div style={{ padding: 20 }}>
                <p>Error: {error}</p>
                <Link href="/" style={{ textDecoration: "underline" }}>
                    Back
                </Link>
            </div>
        );

    if (!ticket)
        return (
            <div style={{ padding: 20 }}>
                <p>Ticket not found</p>
                <Link href="/" style={{ textDecoration: "underline" }}>
                    Back
                </Link>
            </div>
        );


    return (
        <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Link href="/" style={{ textDecoration: "underline" }}>
                    ← Back
                </Link>

                <button
                    onClick={() => setIsEditOpen(true)}
                    style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "1px solid #444",
                    cursor: "pointer",
                    opacity: 1 ,
                }}>Edit</button>

                {/*
                <label>
                    Category:
                    <select>
                       
                        <option>Hardware</option>
                        <option>Software</option>
                        <option>Network</option>
                        <option>Access</option>
                    </select>
                </label>
*/}
                <button
                    onClick={handleResolve}
                    disabled={updatedTicket}
                    style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid #444",
                        cursor: updatedTicket ? "not-allowed" : "pointer",
                        opacity: updatedTicket ? 0.6 : 1,
                    }}
                >
                    {updatedTicket ? "Currnetly Resolving..." : "Mark Resolved"}
                </button>
            </div>
            
            
            <TicketView ticket={ticket} />


                <UpdateTicketModal
                open={isEditOpen}
                ticket={ticket}
                onUpdated={(t) => setTicket(t)}
                onClose={() => setIsEditOpen(false)}
                />

            <div
                style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: 10,
                    padding: 16,
                    marginTop: 20,
                    minHeight: 160, 
                }}>
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
                    {commentsLoading ? (
                        <p>Loading comments</p>
                    ) : (
                        
                        comments.length === 0 ? (
                            <p>No Comments</p>
                        ) : (
                            comments.map((c) => (
                                <div key={c.id}
                                     style={{
                                         border: "1px solid #333",
                                         borderRadius: 10,
                                         padding: 12,
                                         marginBottom: 8,
                                         background: "#151515"
                                     }}>
                                    <p>{c.body}</p>
                                    <span>
                                        {new Date(c.createdAt).toLocaleString()}
                                        {c.updatedAt ? " • Edited": ""}
                                    </span>
                                </div>
                            ))
                        )
                        )}
                </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
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

                <button 
                    onClick={postComment}
                    style={{
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
            </div>
        </div>
    );
}
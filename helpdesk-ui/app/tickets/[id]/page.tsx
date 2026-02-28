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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5217";




export default function Page() {

    const { id } = useParams<{ id: string }>();

    const [ticket,setTicket] = useState<Ticket | null>(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedTicket, setUpdatedTicket] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);



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
        </div>
    );
}
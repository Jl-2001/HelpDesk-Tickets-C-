export type Ticket = {
    id: number;
    title: string;
    description?: string | null;
    category: string;
    priority: string;
    status: string;
    createdAt: string;
    resolvedAt?: string | null;
};
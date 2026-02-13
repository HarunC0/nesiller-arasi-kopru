"use client";

import Header from "@/components/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
            <Header />
            <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem" }}>
                {children}
            </main>
        </div>
    );
}

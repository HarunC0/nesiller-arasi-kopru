"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
    avatar: string;
}

export default function Header() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("nak_user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("nak_user");
        router.push("/login");
    };

    return (
        <header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                background: "var(--color-bg-card)",
                borderBottom: "1px solid var(--color-border)",
                position: "sticky",
                top: 0,
                zIndex: 50,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                }}
                onClick={() => router.push("/dashboard")}
            >
                <span style={{ fontSize: "1.5rem" }}>🌿</span>
                <h1
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--color-text)",
                    }}
                >
                    Nesiller Arası Köprü
                </h1>
            </div>

            <div
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
                {user && (
                    <span
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-text-light)",
                            fontWeight: 500,
                        }}
                    >
                        Merhaba, {user.name}
                    </span>
                )}

                {/* Cart icon */}
                <button
                    onClick={() => router.push("/dashboard/cart")}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.25rem",
                        color: "var(--color-text-light)",
                        fontSize: "1.25rem",
                    }}
                    title="Sepet"
                >
                    🛒
                </button>

                {/* Avatar - Profile Menu */}
                <div style={{ position: "relative" }}>
                    <div
                        onClick={() => setShowMenu(!showMenu)}
                        title="Profil"
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background:
                                "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            transition: "transform 0.2s ease",
                        }}
                    >
                        {user?.avatar || "?"}
                    </div>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div
                            style={{
                                position: "absolute",
                                right: 0,
                                top: "calc(100% + 0.5rem)",
                                background: "var(--color-bg-card)",
                                border: "1px solid var(--color-border)",
                                borderRadius: "0.75rem",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                minWidth: "180px",
                                overflow: "hidden",
                                animation: "fadeIn 0.2s ease",
                                zIndex: 100,
                            }}
                        >
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    router.push("/dashboard/profile");
                                }}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem 1rem",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "0.875rem",
                                    color: "var(--color-text)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = "var(--color-secondary)")}
                                onMouseOut={(e) => (e.currentTarget.style.background = "none")}
                            >
                                👤 Profilim
                            </button>
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    router.push("/dashboard/cart");
                                }}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem 1rem",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "0.875rem",
                                    color: "var(--color-text)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = "var(--color-secondary)")}
                                onMouseOut={(e) => (e.currentTarget.style.background = "none")}
                            >
                                🛒 Sepetim
                            </button>
                            <div style={{ borderTop: "1px solid var(--color-border)" }} />
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    handleLogout();
                                }}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem 1rem",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "0.875rem",
                                    color: "var(--color-danger)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = "var(--color-secondary)")}
                                onMouseOut={(e) => (e.currentTarget.style.background = "none")}
                            >
                                🚪 Çıkış Yap
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

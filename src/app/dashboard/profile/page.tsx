"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
    avatar: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("nak_user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    return (
        <div className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <button
                    onClick={() => router.push("/dashboard")}
                    style={{
                        background: "none",
                        border: "1px solid var(--color-border)",
                        borderRadius: "0.5rem",
                        padding: "0.4rem 0.6rem",
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        color: "var(--color-text-light)",
                    }}
                >
                    ←
                </button>
                <h1 className="page-title" style={{ marginBottom: 0, flex: 1 }}>
                    Profilim
                </h1>
            </div>

            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                {/* Profile Card */}
                <div className="card" style={{ padding: "2rem", textAlign: "center", marginBottom: "1.25rem" }}>
                    <div
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "1.5rem",
                            margin: "0 auto 1rem",
                        }}
                    >
                        {user?.avatar || "?"}
                    </div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                        {user?.name || "Kullanıcı"}
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                        {user?.email || "email@example.com"}
                    </p>
                </div>

                {/* Info Card */}
                <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-primary)" }}>
                        📋 Kişisel Bilgiler
                    </h3>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: "0.625rem 0", fontSize: "0.875rem", color: "var(--color-text-muted)", fontWeight: 500, whiteSpace: "nowrap", verticalAlign: "top" }}>Ad Soyad:</td>
                                <td style={{ padding: "0.625rem 0 0.625rem 1rem", fontSize: "0.9375rem", fontWeight: 600 }}>{user?.name || "—"}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ borderBottom: "1px solid var(--color-border)" }} />
                            </tr>
                            <tr>
                                <td style={{ padding: "0.625rem 0", fontSize: "0.875rem", color: "var(--color-text-muted)", fontWeight: 500, whiteSpace: "nowrap", verticalAlign: "top" }}>E-posta:</td>
                                <td style={{ padding: "0.625rem 0 0.625rem 1rem", fontSize: "0.9375rem", fontWeight: 600 }}>{user?.email || "—"}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ borderBottom: "1px solid var(--color-border)" }} />
                            </tr>
                            <tr>
                                <td style={{ padding: "0.625rem 0", fontSize: "0.875rem", color: "var(--color-text-muted)", fontWeight: 500, whiteSpace: "nowrap", verticalAlign: "top" }}>Üyelik Tarihi:</td>
                                <td style={{ padding: "0.625rem 0 0.625rem 1rem", fontSize: "0.9375rem", fontWeight: 600 }}>Şubat 2026</td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ borderBottom: "1px solid var(--color-border)" }} />
                            </tr>
                            <tr>
                                <td style={{ padding: "0.625rem 0", fontSize: "0.875rem", color: "var(--color-text-muted)", fontWeight: 500, whiteSpace: "nowrap", verticalAlign: "top" }}>Toplam Adım:</td>
                                <td style={{ padding: "0.625rem 0 0.625rem 1rem", fontSize: "0.9375rem", fontWeight: 600 }}>6.800</td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ borderBottom: "1px solid var(--color-border)" }} />
                            </tr>
                            <tr>
                                <td style={{ padding: "0.625rem 0", fontSize: "0.875rem", color: "var(--color-text-muted)", fontWeight: 500, whiteSpace: "nowrap", verticalAlign: "top" }}>Kazanılan Kahve:</td>
                                <td style={{ padding: "0.625rem 0 0.625rem 1rem", fontSize: "0.9375rem", fontWeight: 600 }}>☕ 12 kahve</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Stats */}
                <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-primary)" }}>
                        📊 İstatistikler
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", textAlign: "center" }}>
                        <div>
                            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-primary)" }}>3</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Bakım Yapılan</div>
                        </div>
                        <div>
                            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-primary)" }}>2</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Sipariş</div>
                        </div>
                        <div>
                            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-primary)" }}>1</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Rezervasyon</div>
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <button
                    className="btn-danger"
                    onClick={() => {
                        localStorage.removeItem("nak_user");
                        router.push("/login");
                    }}
                    style={{ marginTop: "0.5rem" }}
                >
                    🚪 Çıkış Yap
                </button>
            </div>
        </div>
    );
}

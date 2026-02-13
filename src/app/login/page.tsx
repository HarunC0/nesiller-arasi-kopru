"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        setTimeout(() => {
            if (email && password) {
                localStorage.setItem(
                    "nak_user",
                    JSON.stringify({
                        name: "Harun Çelik",
                        email: email,
                        avatar: "HC",
                    })
                );
                router.push("/dashboard");
            } else {
                setError("Lütfen email ve şifre girin.");
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(135deg, var(--color-bg) 0%, var(--color-secondary) 100%)",
                padding: "1rem",
            }}
        >
            <div
                className="animate-fade-in"
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "var(--color-bg-card)",
                    borderRadius: "1.25rem",
                    padding: "2.5rem",
                    boxShadow: "0 10px 40px rgba(45, 32, 21, 0.08)",
                    border: "1px solid var(--color-border)",
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <span style={{ fontSize: "2rem" }}>🌿</span>
                        <h1
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color: "var(--color-text)",
                            }}
                        >
                            Nesiller Arası Köprü
                        </h1>
                    </div>
                    <p
                        style={{
                            color: "var(--color-text-muted)",
                            fontSize: "0.875rem",
                        }}
                    >
                        Hesabınıza giriş yapın
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.375rem",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                color: "var(--color-text-light)",
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="ornek@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.375rem",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                color: "var(--color-text-light)",
                            }}
                        >
                            Şifre
                        </label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p
                            style={{
                                color: "var(--color-danger)",
                                fontSize: "0.875rem",
                                marginBottom: "1rem",
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "1.5rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                    }}
                >
                    Hesabınız yok mu?{" "}
                    <Link
                        href="/register"
                        style={{
                            color: "var(--color-primary)",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        Kayıt Ol
                    </Link>
                </p>
            </div>
        </div>
    );
}

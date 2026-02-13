"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReservationPage() {
    const router = useRouter();
    const [date, setDate] = useState("2026-02-13");
    const [guests, setGuests] = useState("1");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const months = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
        ];
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

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
                    Yaşam Birimleri
                </h1>
            </div>

            <div
                className="card"
                style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    padding: "2rem",
                }}
            >
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.375rem" }}>
                    Yeni Rezervasyon Oluştur
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                    Lütfen kalmak istediğiniz tarihi ve kişi sayısını seçin.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Date */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.375rem",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                color: "var(--color-primary)",
                            }}
                        >
                            Giriş Tarihi
                        </label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}>
                                📅
                            </span>
                            <input
                                type="date"
                                className="input-field"
                                style={{ paddingLeft: "2.5rem" }}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Guests */}
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
                            Kişi Sayısı
                        </label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}>
                                👤
                            </span>
                            <select
                                className="select-field"
                                style={{ paddingLeft: "2.5rem" }}
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            >
                                <option value="1">1 Kişi</option>
                                <option value="2">2 Kişi</option>
                                <option value="3">3 Kişi</option>
                                <option value="4">4 Kişi</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{
                            background: submitted ? "var(--color-success)" : undefined,
                        }}
                    >
                        {submitted ? `✓ ${formatDate(date)} - ${guests} kişi için onaylandı!` : "Rezervasyonu Onayla"}
                    </button>
                </form>
            </div>
        </div>
    );
}

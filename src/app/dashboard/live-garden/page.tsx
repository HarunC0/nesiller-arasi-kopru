"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface GardenItem {
    id: number;
    name: string;
    type: "plant" | "animal";
    lastCare: string;
    icon: string;
}

const initialItems: GardenItem[] = [
    { id: 1, name: "Orkide", type: "plant", lastCare: "Son bakım: 2 gün önce", icon: "🌺" },
    { id: 2, name: "Fido (Köpek)", type: "animal", lastCare: "Son bakım: yaklaşık 4 saat önce", icon: "🐕" },
    { id: 3, name: "Domates Fidesi", type: "plant", lastCare: "Son bakım: 1 gün önce", icon: "🍅" },
    { id: 4, name: "Tekir (Kedi)", type: "animal", lastCare: "Son bakım: yaklaşık 6 saat önce", icon: "🐱" },
    { id: 5, name: "Zeytin Ağacı", type: "plant", lastCare: "Son bakım: 7 gün önce", icon: "🫒" },
];

const coffeeRewards: Record<number, number> = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
};

export default function LiveGardenPage() {
    const router = useRouter();
    const [items, setItems] = useState<GardenItem[]>(initialItems);
    const [caredId, setCaredId] = useState<number | null>(null);
    const [notification, setNotification] = useState<{ name: string; coffee: number } | null>(null);

    const handleCare = (id: number) => {
        const item = items.find((i) => i.id === id);
        if (!item) return;

        setCaredId(id);
        setItems((prev) =>
            prev.map((i) =>
                i.id === id
                    ? { ...i, lastCare: "Son bakım: Az önce ✓" }
                    : i
            )
        );

        const coffee = coffeeRewards[id] || 3;
        setNotification({ name: item.name, coffee });

        setTimeout(() => {
            setCaredId(null);
            setNotification(null);
        }, 3000);
    };

    return (
        <div className="animate-fade-in">
            {/* Coffee Reward Notification */}
            {notification && (
                <div
                    style={{
                        position: "fixed",
                        top: "1rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #6f4e37, #8b6914)",
                        color: "white",
                        padding: "0.875rem 1.5rem",
                        borderRadius: "0.75rem",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                        zIndex: 200,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        animation: "fadeIn 0.3s ease",
                        maxWidth: "90vw",
                    }}
                >
                    <span style={{ fontSize: "1.5rem" }}>☕</span>
                    <div>
                        <div>{notification.name} bakımı yapıldı!</div>
                        <div style={{ fontSize: "0.8125rem", opacity: 0.9, fontWeight: 400, marginTop: "0.125rem" }}>
                            {notification.coffee} kahve kazandınız! ☕🎉
                        </div>
                    </div>
                </div>
            )}

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
                    Canlı Bahçe
                </h1>
            </div>

            {/* QR Button */}
            <div style={{ maxWidth: "500px", margin: "0 auto 2rem" }}>
                <button className="btn-primary" style={{ fontSize: "1.0625rem", padding: "1rem" }}>
                    🌱 Eklemek için QR Kodu Tara
                </button>
            </div>

            {/* Items list */}
            <div
                style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}
            >
                {items.map((item) => (
                    <div key={item.id} className="list-item">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: item.type === "plant"
                                        ? "rgba(194, 87, 42, 0.1)"
                                        : "rgba(234, 179, 8, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.25rem",
                                    flexShrink: 0,
                                }}
                            >
                                {item.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.125rem" }}>
                                    {item.name}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "0.8125rem",
                                        color: item.lastCare.includes("✓")
                                            ? "var(--color-success)"
                                            : "var(--color-primary)",
                                    }}
                                >
                                    {item.lastCare}
                                </p>
                            </div>
                        </div>
                        <button
                            className="btn-outline"
                            onClick={() => handleCare(item.id)}
                            style={{
                                background: caredId === item.id ? "var(--color-success)" : undefined,
                                color: caredId === item.id ? "white" : undefined,
                                borderColor: caredId === item.id ? "var(--color-success)" : undefined,
                            }}
                        >
                            {caredId === item.id ? "✓" : "Bakım Yap"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

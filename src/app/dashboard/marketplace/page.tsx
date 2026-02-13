"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const products = [
    {
        id: 1,
        name: "El Yapımı Reçel",
        price: 150,
        image: "/images/recel.png",
    },
    {
        id: 2,
        name: "Örgü Atkı",
        price: 245,
        image: "https://images.unsplash.com/photo-1457545195570-67f207084966?w=300&h=300&fit=crop",
    },
    {
        id: 3,
        name: "Ahşap Oyuncak Araba",
        price: 125,
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=300&fit=crop",
    },
    {
        id: 4,
        name: "Seramik Kupa",
        price: 180,
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=300&fit=crop",
    },
    {
        id: 5,
        name: "Doğal Sabun",
        price: 85,
        image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=300&h=300&fit=crop",
    },
    {
        id: 6,
        name: "El Yapımı Çanta",
        price: 320,
        image: "/images/canta.png",
    },
];

export default function MarketplacePage() {
    const router = useRouter();
    const [addedId, setAddedId] = useState<number | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const handleAddToCart = (id: number, name: string) => {
        setAddedId(id);
        setNotification(name);
        setTimeout(() => {
            setAddedId(null);
            setNotification(null);
        }, 2500);
    };

    return (
        <div className="animate-fade-in">
            {/* Toast Notification */}
            {notification && (
                <div
                    style={{
                        position: "fixed",
                        top: "1rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--color-success)",
                        color: "white",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "0.75rem",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                        zIndex: 200,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        animation: "fadeIn 0.3s ease",
                    }}
                >
                    🛒 &quot;{notification}&quot; sepete eklendi!
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
                    Dijital Pazar Yeri
                </h1>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "1.25rem",
                }}
            >
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="card animate-slide-up"
                        style={{ animationDelay: `${index * 0.06}s`, opacity: 0 }}
                    >
                        <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />
                        </div>
                        <div style={{ padding: "1rem" }}>
                            <h3
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    marginBottom: "0.5rem",
                                    color: "var(--color-text)",
                                }}
                            >
                                {product.name}
                            </h3>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "0.9375rem",
                                        fontWeight: 700,
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    {product.price.toFixed(2)} TL
                                </span>
                                <button
                                    onClick={() => handleAddToCart(product.id, product.name)}
                                    style={{
                                        background: addedId === product.id ? "var(--color-success)" : "none",
                                        border: addedId === product.id ? "none" : "1px solid var(--color-border)",
                                        borderRadius: "0.5rem",
                                        padding: "0.4rem 0.6rem",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        color: addedId === product.id ? "white" : "var(--color-text-light)",
                                        transition: "all 0.2s ease",
                                    }}
                                    title="Sepete Ekle"
                                >
                                    {addedId === product.id ? "✓" : "🛒"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

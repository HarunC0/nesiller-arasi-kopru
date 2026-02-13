"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const initialCart: CartItem[] = [
    {
        id: 1,
        name: "El Yapımı Reçel",
        price: 150,
        quantity: 1,
        image: "/images/recel.png",
    },
    {
        id: 2,
        name: "Örgü Atkı",
        price: 245,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1457545195570-67f207084966?w=100&h=100&fit=crop",
    },
];

export default function CartPage() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [ordered, setOrdered] = useState(false);

    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleOrder = () => {
        if (cart.length === 0) return;
        setOrdered(true);
        setTimeout(() => {
            setOrdered(false);
            setCart([]);
        }, 3000);
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
                    🛒 Sepetim
                </h1>
            </div>

            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                {cart.length === 0 && !ordered ? (
                    <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
                        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🛒</span>
                        <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                            Sepetiniz boş
                        </h2>
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                            Dijital Pazar Yeri&apos;nden ürün ekleyebilirsiniz.
                        </p>
                        <button
                            className="btn-primary"
                            onClick={() => router.push("/dashboard/marketplace")}
                            style={{ maxWidth: "250px" }}
                        >
                            Alışverişe Başla
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                            {cart.map((item) => (
                                <div key={item.id} className="card" style={{ padding: "1rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{ width: "64px", height: "64px", borderRadius: "0.5rem", overflow: "hidden", flexShrink: 0 }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                                                {item.name}
                                            </h3>
                                            <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-primary)" }}>
                                                {item.price.toFixed(2)} TL
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "50%",
                                                    border: "1px solid var(--color-border)",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    fontSize: "1rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                −
                                            </button>
                                            <span style={{ fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "50%",
                                                    border: "1px solid var(--color-border)",
                                                    background: "none",
                                                    cursor: "pointer",
                                                    fontSize: "1rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "1.25rem",
                                                color: "var(--color-danger)",
                                                padding: "0.25rem",
                                            }}
                                            title="Kaldır"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total + Order */}
                        <div className="card" style={{ padding: "1.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                <span style={{ fontSize: "1rem", fontWeight: 600 }}>Toplam</span>
                                <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-primary)" }}>
                                    {total.toFixed(2)} TL
                                </span>
                            </div>
                            <button
                                className="btn-primary"
                                onClick={handleOrder}
                                style={{
                                    background: ordered ? "var(--color-success)" : undefined,
                                }}
                            >
                                {ordered ? "✓ Siparişiniz Alındı!" : "Siparişi Tamamla"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

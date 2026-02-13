"use client";

import Link from "next/link";

const features = [
    {
        title: "Adım Kardeşliği",
        description: "Adım hedeflerine birlikte ulaşın.",
        href: "/dashboard/step-brotherhood",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=250&fit=crop",
    },
    {
        title: "Dijital Pazar Yeri",
        description: "Yaşlılar tarafından el yapımı ürünler.",
        href: "/dashboard/marketplace",
        image: "/images/pazaryeri.png",
    },
    {
        title: "Sesli Miras",
        description: "Anlatılan hikayeleri dinleyin.",
        href: "/dashboard/audio-legacy",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop",
    },
    {
        title: "Yalnız Değilsin",
        description: "Sohbet veya yardım isteyin.",
        href: "/dashboard/panic-button",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop",
    },
    {
        title: "Canlı Bahçe",
        description: "Bitki ve evcil hayvanlarla ilgilenin.",
        href: "/dashboard/live-garden",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
    },
    {
        title: "Yaşam Birimleri",
        description: "Güvenli yaşam alanları ve barınma.",
        href: "/dashboard/reservation",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop",
    },
];

export default function DashboardPage() {
    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1.5rem",
                }}
            >
                {features.map((feature, index) => (
                    <Link
                        key={feature.title}
                        href={feature.href}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            className="card animate-slide-up"
                            style={{
                                animationDelay: `${index * 0.08}s`,
                                opacity: 0,
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        transition: "transform 0.3s ease",
                                    }}
                                    onMouseOver={(e) =>
                                        (e.currentTarget.style.transform = "scale(1.05)")
                                    }
                                    onMouseOut={(e) =>
                                        (e.currentTarget.style.transform = "scale(1)")
                                    }
                                />
                            </div>
                            <div style={{ padding: "1.25rem" }}>
                                <h3
                                    style={{
                                        fontSize: "1.125rem",
                                        fontWeight: 600,
                                        marginBottom: "0.25rem",
                                        color: "var(--color-text)",
                                    }}
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "var(--color-text-muted)",
                                    }}
                                >
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

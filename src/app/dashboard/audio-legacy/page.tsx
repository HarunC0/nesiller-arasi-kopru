"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const stories = [
    {
        id: 1,
        title: "Deniz Kenarında Çocukluğum",
        narrator: "Hilf Yılmaz",
        duration: "15:32",
    },
    {
        id: 2,
        title: "Büyük Demiryolu Yolculuğu",
        narrator: "Görkem Peker",
        duration: "22:05",
    },
    {
        id: 3,
        title: "Bir Fırıncının Hikayesi",
        narrator: "Meryem Usta",
        duration: "18:45",
    },
    {
        id: 4,
        title: "Savaş Zamanı Anıları",
        narrator: "Artur Çetin",
        duration: "35:10",
    },
];

export default function AudioLegacyPage() {
    const router = useRouter();
    const [playingId, setPlayingId] = useState<number | null>(null);

    const togglePlay = (id: number) => {
        setPlayingId(playingId === id ? null : id);
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
                    Sesli Miras
                </h1>
            </div>

            {/* Record button */}
            <div style={{ maxWidth: "500px", margin: "0 auto 2rem" }}>
                <button className="btn-primary" style={{ fontSize: "1.0625rem", padding: "1rem" }}>
                    + Yeni Bir Hikaye Kaydet
                </button>
            </div>

            {/* Stories list */}
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>🎧</span>
                    <h2 style={{ fontSize: "1.0625rem", fontWeight: 700 }}>Bir Hikaye Dinle</h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {stories.map((story) => (
                        <div key={story.id} className="list-item">
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <button
                                    onClick={() => togglePlay(story.id)}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        border: "none",
                                        background: playingId === story.id
                                            ? "var(--color-primary)"
                                            : "var(--color-secondary)",
                                        color: playingId === story.id ? "white" : "var(--color-primary)",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1rem",
                                        transition: "all 0.2s ease",
                                        flexShrink: 0,
                                    }}
                                >
                                    {playingId === story.id ? "⏸" : "▶"}
                                </button>
                                <div>
                                    <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.125rem" }}>
                                        {story.title}
                                    </h3>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                                        <span>👤 {story.narrator}</span>
                                        <span>⏱ {story.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

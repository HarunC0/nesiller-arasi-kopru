"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const teamData = {
    teamGoal: 20000,
    teamCurrent: 11100,
    members: [
        {
            name: "Ali",
            age: 24,
            dailyGoal: 10000,
            dailyCurrent: 6800,
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face",
        },
        {
            name: "Bekir",
            age: 72,
            dailyGoal: 10000,
            dailyCurrent: 4300,
            avatar: "/images/bekir.png",
        },
    ],
};

export default function StepBrotherhoodPage() {
    const router = useRouter();
    const [data] = useState(teamData);
    const teamPercent = (data.teamCurrent / data.teamGoal) * 100;

    return (
        <div className="animate-fade-in">
            {/* Back button + Title */}
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
                    Adım Kardeşliği
                </h1>
            </div>

            {/* Team Progress */}
            <div
                className="card"
                style={{ padding: "1.5rem", marginBottom: "1.5rem" }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>👥</span>
                    <div>
                        <h2 style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                            Takım İlerlemesi
                        </h2>
                        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                            Daha sağlıklı bir yaşam için ortak çabanız. Hedef: {data.teamGoal.toLocaleString("tr-TR")} adım.
                        </p>
                    </div>
                </div>

                <div className="progress-bar" style={{ marginBottom: "0.5rem" }}>
                    <div className="progress-fill" style={{ width: `${teamPercent}%` }} />
                </div>
                <p
                    style={{
                        textAlign: "right",
                        fontWeight: 600,
                        color: "var(--color-primary)",
                        fontSize: "0.9375rem",
                    }}
                >
                    {data.teamCurrent.toLocaleString("tr-TR")} / {data.teamGoal.toLocaleString("tr-TR")} adım
                </p>
            </div>

            {/* Members */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "1rem",
                }}
            >
                {data.members.map((member) => {
                    const percent = (member.dailyCurrent / member.dailyGoal) * 100;
                    return (
                        <div key={member.name} className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
                            <div
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    margin: "0 auto 0.75rem",
                                    border: "3px solid var(--color-secondary)",
                                }}
                            >
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                                {member.name}
                            </h3>
                            <p
                                style={{
                                    fontSize: "0.875rem",
                                    color: "var(--color-text-muted)",
                                    marginBottom: "1rem",
                                }}
                            >
                                {member.age} yaşında
                            </p>
                            <p
                                style={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    marginBottom: "0.5rem",
                                }}
                            >
                                Bugünkü Adımlar
                            </p>
                            <div className="progress-bar" style={{ marginBottom: "0.5rem" }}>
                                <div className="progress-fill" style={{ width: `${percent}%` }} />
                            </div>
                            <p
                                style={{
                                    fontWeight: 600,
                                    color: "var(--color-primary)",
                                    fontSize: "0.9375rem",
                                }}
                            >
                                {member.dailyCurrent.toLocaleString("tr-TR")} / {member.dailyGoal.toLocaleString("tr-TR")}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

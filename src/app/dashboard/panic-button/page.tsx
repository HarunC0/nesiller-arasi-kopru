"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const mockMessages = [
    { id: 1, sender: "Gönüllü Ayşe", text: "Merhaba, hoş geldiniz! Nasıl yardımcı olabilirim?", time: "14:21", isUser: false },
    { id: 2, sender: "Gönüllü Ayşe", text: "Burada sizinle sohbet etmek için bekliyorum 😊", time: "14:21", isUser: false },
];

export default function PanicButtonPage() {
    const router = useRouter();
    const [showChat, setShowChat] = useState(false);
    const [emergencyStep, setEmergencyStep] = useState(0); // 0: none, 1: first confirm, 2: second confirm, 3: sent
    const [messages, setMessages] = useState(mockMessages);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const userMsg = {
            id: messages.length + 1,
            sender: "Ben",
            text: newMessage,
            time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
            isUser: true,
        };
        setMessages((prev) => [...prev, userMsg]);
        setNewMessage("");

        // Auto reply after 1.5s
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    sender: "Gönüllü Ayşe",
                    text: "Anlıyorum, sizinle ilgileniyorum. Merak etmeyin, yalnız değilsiniz! 💛",
                    time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
                    isUser: false,
                },
            ]);
        }, 1500);
    };

    const handleEmergency = () => {
        if (emergencyStep === 0) {
            setEmergencyStep(1);
        } else if (emergencyStep === 1) {
            setEmergencyStep(2);
        } else if (emergencyStep === 2) {
            setEmergencyStep(3);
            setTimeout(() => setEmergencyStep(0), 4000);
        }
    };

    const cancelEmergency = () => {
        setEmergencyStep(0);
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
                    Yalnız Değilsin
                </h1>
            </div>

            {!showChat ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1.5rem",
                        minHeight: "50vh",
                        padding: "2rem",
                    }}
                >
                    <button
                        className="btn-warning"
                        onClick={() => setShowChat(true)}
                    >
                        💬 Sohbet Odasına Katıl
                    </button>

                    <button
                        className="btn-danger"
                        onClick={handleEmergency}
                    >
                        🚨 Acil Yardım
                    </button>

                    <p
                        style={{
                            maxWidth: "400px",
                            textAlign: "center",
                            fontSize: "0.875rem",
                            color: "var(--color-text-muted)",
                            lineHeight: 1.6,
                            marginTop: "1rem",
                        }}
                    >
                        Dost canlısı gönüllüler ve diğer üyelerle sohbet etmek için
                        &quot;Sohbet Odasına Katıl&quot; butonuna basın. Yalnızca gerçek bir
                        acil durumda &quot;Acil Yardım&quot; butonunu kullanın.
                    </p>
                </div>
            ) : (
                /* Chat Room */
                <div
                    className="card"
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        height: "calc(100vh - 200px)",
                        overflow: "hidden",
                    }}
                >
                    {/* Chat Header */}
                    <div
                        style={{
                            padding: "1rem 1.25rem",
                            borderBottom: "1px solid var(--color-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "var(--color-primary)",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    fontSize: "0.875rem",
                                }}
                            >
                                GA
                            </div>
                            <div>
                                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Sohbet Odası</h3>
                                <p style={{ fontSize: "0.75rem", color: "var(--color-success)" }}>● Gönüllü Ayşe aktif</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowChat(false)}
                            style={{
                                background: "none",
                                border: "1px solid var(--color-border)",
                                borderRadius: "0.5rem",
                                padding: "0.3rem 0.6rem",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                color: "var(--color-text-light)",
                            }}
                        >
                            ✕ Kapat
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem 1.25rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                        }}
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: "flex",
                                    justifyContent: msg.isUser ? "flex-end" : "flex-start",
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: "75%",
                                        padding: "0.75rem 1rem",
                                        borderRadius: msg.isUser
                                            ? "1rem 1rem 0.25rem 1rem"
                                            : "1rem 1rem 1rem 0.25rem",
                                        background: msg.isUser
                                            ? "var(--color-primary)"
                                            : "var(--color-secondary)",
                                        color: msg.isUser ? "white" : "var(--color-text)",
                                    }}
                                >
                                    {!msg.isUser && (
                                        <p style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--color-primary)" }}>
                                            {msg.sender}
                                        </p>
                                    )}
                                    <p style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>{msg.text}</p>
                                    <p
                                        style={{
                                            fontSize: "0.6875rem",
                                            marginTop: "0.25rem",
                                            opacity: 0.7,
                                            textAlign: "right",
                                        }}
                                    >
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Message Input */}
                    <div
                        style={{
                            padding: "0.75rem 1.25rem",
                            borderTop: "1px solid var(--color-border)",
                            display: "flex",
                            gap: "0.5rem",
                        }}
                    >
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Mesajınızı yazın..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            style={{ flex: 1, marginBottom: 0 }}
                        />
                        <button
                            className="btn-primary"
                            onClick={handleSendMessage}
                            style={{ padding: "0.5rem 1rem", whiteSpace: "nowrap" }}
                        >
                            Gönder
                        </button>
                    </div>
                </div>
            )}

            {/* Emergency First Confirmation */}
            {emergencyStep === 1 && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100,
                        padding: "1rem",
                    }}
                    onClick={cancelEmergency}
                >
                    <div
                        className="card animate-fade-in"
                        style={{
                            padding: "2rem",
                            maxWidth: "400px",
                            width: "100%",
                            textAlign: "center",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>⚠️</span>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-danger)" }}>
                            Emin misiniz?
                        </h2>
                        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.875rem", lineHeight: 1.6 }}>
                            Acil yardım çağrısı göndermek üzeresiniz. Bu, en yakın gönüllü ve yetkili birimlere bildirim gönderecektir.
                        </p>
                        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                            <button className="btn-outline" onClick={cancelEmergency}>
                                İptal
                            </button>
                            <button className="btn-danger" onClick={handleEmergency}>
                                Evet, Eminim
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Emergency Second Confirmation */}
            {emergencyStep === 2 && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100,
                        padding: "1rem",
                    }}
                    onClick={cancelEmergency}
                >
                    <div
                        className="card animate-fade-in"
                        style={{
                            padding: "2rem",
                            maxWidth: "400px",
                            width: "100%",
                            textAlign: "center",
                            border: "2px solid var(--color-danger)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🚨</span>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-danger)" }}>
                            Son Onay!
                        </h2>
                        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.875rem", lineHeight: 1.6 }}>
                            <strong>Bu işlem geri alınamaz.</strong> Acil yardım çağrısını onaylıyor musunuz?
                        </p>
                        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                            <button className="btn-outline" onClick={cancelEmergency}>
                                Vazgeç
                            </button>
                            <button className="btn-danger" onClick={handleEmergency}>
                                🚨 Acil Yardım Gönder
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Emergency Sent Confirmation */}
            {emergencyStep === 3 && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100,
                        padding: "1rem",
                    }}
                >
                    <div
                        className="card animate-fade-in"
                        style={{
                            padding: "2rem",
                            maxWidth: "400px",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>✅</span>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--color-success)" }}>
                            Yardım Çağrısı İletildi
                        </h2>
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                            En yakın gönüllü ve yetkili birimler bilgilendirildi. Lütfen yerinizde kalın.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

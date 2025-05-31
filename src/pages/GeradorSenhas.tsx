import { useState } from "react";

function generatePassword(length: number) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export default function GeradorSenhas() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  return (
    <main>
      <h1>🔑 Gerador de Senhas</h1>
      <div
        style={{
          maxWidth: 400,
          margin: "2rem auto",
          padding: 24,
          background: "#23272f",
          borderRadius: 16,
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
        }}
      >
        <label style={{ display: "block", marginBottom: 8 }}>
          Tamanho da senha:
          <input
            type="number"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ marginLeft: 8, width: 60 }}
          />
        </label>
        <button
          onClick={() => setPassword(generatePassword(length))}
          style={{ marginBottom: 16 }}
        >
          Gerar Senha
        </button>
        {password && (
          <div style={{ marginTop: 16 }}>
            <input
              type="text"
              value={password}
              readOnly
              style={{
                width: "100%",
                fontSize: 18,
                padding: 8,
                borderRadius: 8,
                border: "1px solid #444",
                background: "#181a20",
                color: "#fff",
              }}
              onFocus={(e) => e.target.select()}
            />
          </div>
        )}
      </div>
    </main>
  );
}

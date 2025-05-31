import { useState } from "react";

function decodeJWT(token: string) {
  try {
    const [header, payload] = token.split(".").slice(0, 2);
    return {
      header: JSON.parse(atob(header)),
      payload: JSON.parse(atob(payload)),
    };
  } catch {
    return null;
  }
}

export default function JWTDebugger() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<{
    header: object;
    payload: object;
  } | null>(null);

  function handleDecode() {
    setDecoded(decodeJWT(token));
  }

  return (
    <main>
      <h1>🔍 JWT Debugger</h1>
      <div
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          padding: 24,
          background: "#23272f",
          borderRadius: 16,
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
        }}
      >
        <textarea
          rows={3}
          style={{
            width: "100%",
            marginBottom: 12,
            borderRadius: 8,
            padding: 8,
            border: "1px solid #444",
            background: "#181a20",
            color: "#fff",
          }}
          placeholder="Cole o token JWT aqui..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button onClick={handleDecode}>Decodificar</button>
        {decoded && (
          <div style={{ marginTop: 20 }}>
            <h3>Cabeçalho</h3>
            <pre
              style={{
                background: "#181a20",
                color: "#fff",
                padding: 12,
                borderRadius: 8,
                overflowX: "auto",
              }}
            >
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
            <h3>Payload</h3>
            <pre
              style={{
                background: "#181a20",
                color: "#fff",
                padding: 12,
                borderRadius: 8,
                overflowX: "auto",
              }}
            >
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        )}
        {decoded === null && token && (
          <div style={{ color: "#ff6b6b", marginTop: 12 }}>
            Token inválido ou mal formatado.
          </div>
        )}
      </div>
    </main>
  );
}

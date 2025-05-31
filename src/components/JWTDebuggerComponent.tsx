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

export function JWTDebuggerComponent({
  exampleToken,
}: {
  exampleToken?: string;
}) {
  const [token, setToken] = useState(exampleToken || "");
  const [decoded, setDecoded] = useState<{
    header: object;
    payload: object;
  } | null>(exampleToken ? decodeJWT(exampleToken) : null);
  const [copied, setCopied] = useState(false);

  function handleDecode() {
    setDecoded(decodeJWT(token));
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: 24,
        background: "#23272f",
        borderRadius: 16,
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
      }}
    >
      <label style={{ fontWeight: 500, marginBottom: 4, display: "block" }}>
        Token JWT
      </label>
      <div style={{ position: "relative" }}>
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
            fontFamily: "monospace",
          }}
          placeholder="Cole o token JWT aqui..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          onClick={copyToClipboard}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: copied ? "#22c55e" : "#888",
            fontSize: 18,
          }}
          title="Copiar token"
        >
          {copied ? "✔️" : "📋"}
        </button>
      </div>
      <button onClick={handleDecode} style={{ marginBottom: 16 }}>
        Decodificar
      </button>
      {decoded && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Cabeçalho</h3>
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
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Payload</h3>
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
    </section>
  );
}

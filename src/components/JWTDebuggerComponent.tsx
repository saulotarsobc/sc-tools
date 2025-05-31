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
        width: 900,
        margin: "2rem auto",
        padding: 32,
        background: "#23272f",
        borderRadius: 24,
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.13)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
        alignItems: "flex-start",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <label style={{ fontWeight: 500, marginBottom: 4, display: "block" }}>
          Token JWT
        </label>
        <div style={{ position: "relative" }}>
          <textarea
            rows={6}
            style={{
              width: "100%",
              minHeight: 90,
              marginBottom: 12,
              borderRadius: 8,
              padding: 12,
              border: "1px solid #444",
              background: "#181a20",
              color: "#fff",
              fontFamily: "monospace",
              fontSize: 16,
            }}
            placeholder="Cole o token JWT aqui..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button
            onClick={copyToClipboard}
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: copied ? "#22c55e" : "#888",
              fontSize: 20,
            }}
            title="Copiar token"
          >
            {copied ? "✔️" : "📋"}
          </button>
        </div>
        <button
          onClick={handleDecode}
          style={{
            marginBottom: 16,
            width: "100%",
            padding: 10,
            fontSize: 16,
            borderRadius: 8,
            background: "#181a20",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Decodificar
        </button>
        {decoded === null && token && (
          <div style={{ color: "#ff6b6b", marginTop: 12 }}>
            Token inválido ou mal formatado.
          </div>
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        {decoded && (
          <div>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Cabeçalho
            </h3>
            <pre
              style={{
                background: "#181a20",
                color: "#fff",
                padding: 16,
                borderRadius: 8,
                overflowX: "auto",
                fontSize: 15,
                marginBottom: 24,
              }}
            >
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Payload
            </h3>
            <pre
              style={{
                background: "#181a20",
                color: "#fff",
                padding: 16,
                borderRadius: 8,
                overflowX: "auto",
                fontSize: 15,
              }}
            >
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

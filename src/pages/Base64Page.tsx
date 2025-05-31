import { useCallback, useEffect, useState } from "react";

export default function Base64Page() {
  const [encodeInput, setEncodeInput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");

  const handleEncode = useCallback(
    (text = encodeInput) => {
      try {
        setEncodeOutput(btoa(encodeURIComponent(text)));
      } catch {
        setEncodeOutput("Erro ao codificar. Verifique o conteúdo.");
      }
    },
    [encodeInput]
  );

  const handleDecode = useCallback(
    (text = decodeInput) => {
      try {
        setDecodeOutput(decodeURIComponent(atob(text)));
      } catch {
        setDecodeOutput("Erro ao decodificar. Verifique o conteúdo.");
      }
    },
    [decodeInput]
  );

  const onPasteEncode = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setEncodeInput(pastedText);
    handleEncode(pastedText);
  };

  const onPasteDecode = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setDecodeInput(pastedText);
    handleDecode(pastedText);
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
      const text = event.clipboardData?.getData("text");
      if (text) {
        if (/^[A-Za-z0-9+/=]+$/.test(text) && text.length % 4 === 0) {
          setDecodeInput(text);
          handleDecode(text);
        } else {
          setEncodeInput(text);
          handleEncode(text);
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handleDecode, handleEncode]);

  return (
    <main
      style={{
        minHeight: "100vh",
        maxWidth: 900,
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        🅱️ Base64 Encode e Decode
      </h1>
      <p
        style={{
          color: "#b0b0b0",
          marginBottom: 32,
        }}
      >
        Codifique e decodifique textos facilmente usando Base64. Cole seu texto
        e veja o resultado instantaneamente.
      </p>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          marginBottom: 40,
        }}
      >
        {/* ENCODE */}
        <div>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Codificar para Base64
          </h2>
          <label
            style={{
              display: "block",
              fontWeight: 500,
              marginBottom: 4,
            }}
          >
            Texto de Entrada
          </label>
          <textarea
            value={encodeInput}
            onChange={(e) => setEncodeInput(e.target.value)}
            onPaste={onPasteEncode}
            placeholder="Digite o texto para codificar..."
            rows={6}
            style={{
              width: "100%",
              borderRadius: 8,
              padding: 8,
              border: "1px solid #444",
              background: "#181a20",
              color: "#fff",
              marginBottom: 8,
            }}
          />
          <p
            style={{
              fontSize: 13,
              color: "#888",
              marginBottom: 8,
            }}
          >
            Caracteres: {encodeInput.length}
          </p>
          <button onClick={() => handleEncode()} style={{ marginBottom: 12 }}>
            Codificar
          </button>
          <label
            style={{
              display: "block",
              fontWeight: 500,
              margin: "16px 0 4px 0",
            }}
          >
            Resultado
          </label>
          <textarea
            readOnly
            value={encodeOutput}
            rows={6}
            style={{
              width: "100%",
              borderRadius: 8,
              padding: 8,
              border: "1px solid #444",
              background: "#23272f",
              color: "#fff",
              marginBottom: 8,
            }}
          />
          <p
            style={{
              fontSize: 13,
              color: "#888",
            }}
          >
            Caracteres: {encodeOutput.length}
          </p>
        </div>
        {/* DECODE */}
        <div>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Decodificar de Base64
          </h2>
          <label
            style={{
              display: "block",
              fontWeight: 500,
              marginBottom: 4,
            }}
          >
            Texto Base64
          </label>
          <textarea
            value={decodeInput}
            onChange={(e) => setDecodeInput(e.target.value)}
            onPaste={onPasteDecode}
            placeholder="Digite o texto Base64 para decodificar..."
            rows={6}
            style={{
              width: "100%",
              borderRadius: 8,
              padding: 8,
              border: "1px solid #444",
              background: "#181a20",
              color: "#fff",
              marginBottom: 8,
            }}
          />
          <p
            style={{
              fontSize: 13,
              color: "#888",
              marginBottom: 8,
            }}
          >
            Caracteres: {decodeInput.length}
          </p>
          <button onClick={() => handleDecode()} style={{ marginBottom: 12 }}>
            Decodificar
          </button>
          <label
            style={{
              display: "block",
              fontWeight: 500,
              margin: "16px 0 4px 0",
            }}
          >
            Resultado
          </label>
          <textarea
            readOnly
            value={decodeOutput}
            rows={6}
            style={{
              width: "100%",
              borderRadius: 8,
              padding: 8,
              border: "1px solid #444",
              background: "#23272f",
              color: "#fff",
              marginBottom: 8,
            }}
          />
          <p
            style={{
              fontSize: 13,
              color: "#888",
            }}
          >
            Caracteres: {decodeOutput.length}
          </p>
        </div>
      </section>
    </main>
  );
}

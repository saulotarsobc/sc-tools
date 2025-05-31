import { useCallback, useEffect, useState } from "react";

function getStrength(password: string) {
  let score = 0;
  if (!password) return score;
  if (password.length > 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const STORAGE_KEY = "passwordGeneratorSettings";

export default function GeradorSenhas() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const settings = JSON.parse(stored);
      setLength(settings.length || 12);
      setIncludeUpper(settings.includeUpper);
      setIncludeLower(settings.includeLower);
      setIncludeNumbers(settings.includeNumbers);
      setIncludeSymbols(settings.includeSymbols);
    }
  }, []);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!charset) return setPassword("");
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(pass);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    const settings = {
      length,
      includeUpper,
      includeLower,
      includeNumbers,
      includeSymbols,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    generatePassword();
  }, [
    length,
    includeUpper,
    includeLower,
    includeNumbers,
    includeSymbols,
    generatePassword,
  ]);

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password);
  const strengthPercent = (strength / 5) * 100;
  const strengthColor = ["#ef4444", "#f59e42", "#eab308", "#4ade80", "#22c55e"];

  return (
    <main
      style={{
        minHeight: "100vh",
        maxWidth: 500,
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: 8 }}>
        🔑 Gerador de Senhas Seguras
      </h1>
      <p style={{ color: "#b0b0b0", marginBottom: 32 }}>
        Crie senhas fortes e únicas para suas contas online. Ajuste as
        configurações abaixo e clique em "Gerar Senha" para criar uma senha
        segura.
      </p>
      <div
        style={{
          background: "#23272f",
          borderRadius: 16,
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
          padding: 24,
          marginBottom: 32,
        }}
      >
        <label style={{ display: "block", fontWeight: 500, marginBottom: 8 }}>
          Comprimento: {length}
          <input
            type="range"
            min={4}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ width: "100%", marginTop: 8 }}
          />
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Letras Maiúsculas
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
            />
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Letras Minúsculas
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
            />
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Números
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Símbolos
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
          </label>
        </div>
        <button
          onClick={generatePassword}
          style={{ width: "100%", marginBottom: 16 }}
        >
          Gerar Senha
        </button>
        <div style={{ position: "relative", marginBottom: 8 }}>
          <input
            type="text"
            value={password}
            readOnly
            className="font-mono"
            style={{
              width: "100%",
              fontSize: 18,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #444",
              background: "#181a20",
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
            onClick={copyToClipboard}
          />
          {password && (
            <button
              onClick={copyToClipboard}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
              }}
              title="Copiar senha"
            >
              📋
            </button>
          )}
        </div>
        {copied && (
          <p style={{ color: "#22c55e", fontSize: 13, textAlign: "center" }}>
            Senha copiada!
          </p>
        )}
        <div style={{ marginTop: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 4,
            }}
          >
            Força da Senha
          </label>
          <div style={{ height: 8, borderRadius: 4, background: "#444" }}>
            <div
              style={{
                width: `${strengthPercent}%`,
                height: 8,
                borderRadius: 4,
                background: strengthColor[strength - 1] || "#888",
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>
      </div>
      <section
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: "#e0e0e0",
          maxWidth: 700,
          margin: "0 auto",
          padding: "0 2px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Por que é importante usar senhas fortes e únicas?
        </h2>
        <p>
          Senhas são a primeira linha de defesa contra acessos não autorizados
          às suas contas online. Uma senha forte dificulta ataques por força
          bruta ou adivinhação.
        </p>
        <p>
          Evite reutilizar senhas em diferentes serviços. Se um site for
          comprometido, todas as contas que usam a mesma senha ficam em risco.
        </p>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>
          Boas práticas para criar senhas seguras:
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Use pelo menos 12 caracteres.</li>
          <li>Misture letras maiúsculas, minúsculas, números e símbolos.</li>
          <li>Evite palavras óbvias ou sequências como "123456" ou "senha".</li>
          <li>
            Utilize um gerenciador de senhas para armazenar senhas longas e
            únicas.
          </li>
          <li>
            Considere usar autenticação em dois fatores (2FA) sempre que
            possível.
          </li>
        </ul>
        <p>
          Geradores de senha, como o desta página, ajudam você a criar
          combinações seguras e difíceis de serem descobertas.
        </p>
      </section>
    </main>
  );
}

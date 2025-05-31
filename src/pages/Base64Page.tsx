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
        maxWidth: 700,
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
      <section style={{ marginBottom: 40 }}>
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
          rows={4}
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
          rows={4}
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
      </section>
      <section style={{ marginBottom: 40 }}>
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
          rows={4}
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
          rows={4}
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
      </section>
      <section style={{ margin: "32px 0 0 0", padding: "0 2px" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          O que é Base64? Entenda do básico ao avançado
        </h2>
        <article
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#e0e0e0",
            maxWidth: 700,
          }}
        >
          <p>
            <strong>Base64</strong> é um método de codificação usado para
            representar dados binários em formato de texto ASCII. Essa técnica é
            amplamente utilizada quando é necessário transmitir dados através de
            meios que lidam apenas com texto, como emails ou URLs.
          </p>
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Como funciona a codificação Base64?
            </h3>
            <p>
              A codificação Base64 divide os dados em blocos de 3 bytes e os
              converte em 4 caracteres ASCII. O conjunto de caracteres utilizado
              inclui letras maiúsculas e minúsculas, números e dois símbolos
              adicionais:{" "}
              <code
                style={{
                  background: "#181a20",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                +
              </code>{" "}
              e{" "}
              <code
                style={{
                  background: "#181a20",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                /
              </code>
              . Caso os dados não formem um múltiplo de 3, o caractere{" "}
              <code
                style={{
                  background: "#181a20",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                =
              </code>{" "}
              é usado como preenchimento.
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Por que usar Base64?
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>Compatibilidade com sistemas que só lidam com texto.</li>
              <li>
                Evita problemas de codificação ao transmitir arquivos binários.
              </li>
              <li>Fácil de implementar e reverter (decodificar).</li>
            </ul>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Aplicações comuns do Base64
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>
                Incorporação de imagens em HTML ou CSS como{" "}
                <code
                  style={{
                    background: "#181a20",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  data URI
                </code>
                .
              </li>
              <li>Envio de anexos em emails (MIME).</li>
              <li>
                Armazenamento de arquivos binários em bancos de dados baseados
                em texto.
              </li>
            </ul>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Limitações do Base64
            </h3>
            <p>
              Apesar de prático, o Base64 não é eficiente em termos de tamanho:
              a codificação aumenta o tamanho dos dados em cerca de 33%. Por
              isso, não é ideal para grandes volumes de dados ou quando há
              limitação de largura de banda.
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Segurança
            </h3>
            <p>
              É importante destacar que o Base64{" "}
              <strong>não é um método de criptografia</strong>. Ele apenas
              transforma os dados em outro formato. Se a segurança for uma
              preocupação, é necessário usar criptografia real (como AES ou RSA)
              em conjunto com o Base64.
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Conclusão
            </h3>
            <p>
              O Base64 é uma ferramenta poderosa para desenvolvedores e
              profissionais de tecnologia. Seu uso simples e versátil o torna
              ideal para inúmeras situações em que dados binários precisam ser
              manipulados em ambientes textuais. Contudo, é essencial entender
              suas limitações e usá-lo corretamente.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

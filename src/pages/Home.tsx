import { Card } from "../components/Card";

const Home = () => {
  return (
    <main>
      <h1>Ferramentas</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "2.5rem",
        }}
      >
        <Card
          to="/gerador-senhas"
          emoji="🔑"
          title="Gerador de Senhas"
          description="Gere senhas seguras e aleatórias."
        />
        <Card
          to="/base64"
          emoji="🅱️"
          title="Base64 Encode/Decode"
          description="Codifique e decodifique textos em Base64."
        />
        <Card
          to="/jwt-debugger"
          emoji="🔍"
          title="JWT Debugger"
          description="Visualize o conteúdo de tokens JWT."
        />
      </div>
    </main>
  );
};

export default Home;

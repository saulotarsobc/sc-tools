import { JWTDebuggerComponent } from "../components/JWTDebuggerComponent";

export default function JWTDebugger() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem 1rem",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: 8 }}>
        🔍 JWT Debugger
      </h1>
      <JWTDebuggerComponent exampleToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzQ3OTQ3Mzc4fQ.b2162OHrrHoM0BibkViaaO04EttfksJbT6sK45KI4qA" />
    </main>
  );
}

import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./components/Header.css";
import Base64Page from "./pages/Base64Page";
import GeradorSenhas from "./pages/GeradorSenhas";
import Home from "./pages/Home";
import JWTDebugger from "./pages/JWTDebugger";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gerador-senhas" element={<GeradorSenhas />} />
            <Route path="/base64" element={<Base64Page />} />
            <Route path="/jwt-debugger" element={<JWTDebugger />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

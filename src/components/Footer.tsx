const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "1.5rem 0 1rem 0",
        textAlign: "center",
        color: "#888",
        fontSize: "1rem",
      }}
    >
      © {new Date().getFullYear()}{" "}
      <a href="tools.hcode.com.br">tools.hcode.com.br</a> — Construído com ❤️
      por Hcode
    </footer>
  );
};

export default Footer;

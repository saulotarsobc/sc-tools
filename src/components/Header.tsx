import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

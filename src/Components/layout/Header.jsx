import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import SearchBar from './SearchBar';
import '../../styles/Header.css';

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">
          <img src={logo} alt="Pokemon Logo" className="logo" />
        </Link>
        <SearchBar />
      </nav>
    </header>
  );
}
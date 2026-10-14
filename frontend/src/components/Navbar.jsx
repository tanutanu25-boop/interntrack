
import { BriefcaseBusiness, Search } from "lucide-react";

export default function Navbar({ onHomeClick }) {
  return (
    <header className="navbar">
      <a
        href="#home"
        className="brand"
        onClick={(event) => {
          event.preventDefault();
          onHomeClick();
        }}
      >
        <span className="brand-icon">
          <BriefcaseBusiness size={22} />
        </span>
        <span>InternTrack</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            onHomeClick();
          }}
        >
          Find Internships
        </a>
        <a href="#opportunities">Explore Jobs</a>
      </nav>

      <a href="#opportunities" className="nav-action">
        <Search size={17} />
        Explore
      </a>
    </header>
  );
}

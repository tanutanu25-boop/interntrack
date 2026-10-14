
import { Search, X } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">
      <Search size={20} className="search-icon" />

      <input
        type="search"
        placeholder="Job title, company, or skill..."
        aria-label="Search internships"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search && (
        <button
          type="button"
          className="clear-search"
          aria-label="Clear search"
          onClick={() => setSearch("")}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

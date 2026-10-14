
import { SlidersHorizontal } from "lucide-react";

export default function FilterBar({
  mode,
  setMode,
  type,
  setType,
  location,
  setLocation,
  clearFilters,
}) {
  return (
    <section className="filter-bar" aria-label="Filter internships">
      <div className="filter-heading">
        <SlidersHorizontal size={18} />
        <span>Filters</span>
      </div>

      <select
        aria-label="Filter by work mode"
        value={mode}
        onChange={(event) => setMode(event.target.value)}
      >
        <option value="">All work modes</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
        <option value="On-site">On-site</option>
      </select>

      <select
        aria-label="Filter by job type"
        value={type}
        onChange={(event) => setType(event.target.value)}
      >
        <option value="">All job types</option>
        <option value="Internship">Internship</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
      </select>

      <input
        type="text"
        placeholder="Filter by location"
        aria-label="Filter by location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />

      <button
        type="button"
        className="clear-filters"
        onClick={clearFilters}
      >
        Clear all
      </button>
    </section>
  );
}

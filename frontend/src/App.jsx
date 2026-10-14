
import { useCallback, useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Globe2,
  Users,
} from "lucide-react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobDetails";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (search.trim()) params.set("search", search.trim());
      if (mode) params.set("mode", mode);
      if (type) params.set("type", type);
      if (location.trim()) {
        params.set("location", location.trim());
      }

      const query = params.toString();
      const url = `${API_URL}/jobs${query ? `?${query}` : ""}`;

      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error("Could not load internships.");
      }

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(
          "Unable to load internships. Check that your backend and database are running."
        );
      }
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, [search, mode, type, location]);

  useEffect(() => {
    const controller = new AbortController();

    fetchJobs(controller.signal);

    return () => controller.abort();
  }, [fetchJobs]);

  function clearFilters() {
    setSearch("");
    setMode("");
    setType("");
    setLocation("");
  }

  function goHome() {
    clearFilters();
    setSelectedJob(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div id="home" className="app-shell">
      <Navbar onHomeClick={goHome} />

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="status-dot" />
              YOUR CAREER STARTS HERE
            </span>

            <h1>
              Find your next
              <span> opportunity.</span>
            </h1>

            <p>
              Discover internships, explore new skills, and take
              the next step in your career.
            </p>

            <div className="hero-search">
              <SearchBar
                search={search}
                setSearch={setSearch}
              />
            </div>

            <p className="hero-note">
              Explore opportunities that match your goals.
            </p>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-icon art-icon-main">
              <BriefcaseBusiness size={54} />
            </div>
            <div className="art-icon art-icon-code">
              <Code2 size={30} />
            </div>
            <div className="art-icon art-icon-globe">
              <Globe2 size={28} />
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Platform highlights">
          <div className="stat-item">
            <BriefcaseBusiness size={22} />
            <div>
              <strong>{jobs.length}</strong>
              <span>Matching opportunities</span>
            </div>
          </div>

          <div className="stat-item">
            <Code2 size={22} />
            <div>
              <strong>MERN</strong>
              <span>Explore tech roles</span>
            </div>
          </div>

          <div className="stat-item">
            <Users size={22} />
            <div>
              <strong>Students</strong>
              <span>Built for your next step</span>
            </div>
          </div>
        </section>

        <section
          id="opportunities"
          className="opportunities-section"
        >
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                EXPLORE YOUR OPTIONS
              </span>
              <h2>Latest opportunities</h2>
              <p>Find a role that matches your skills and interests.</p>
            </div>

            <span className="results-count">
              {jobs.length} {jobs.length === 1 ? "result" : "results"}
            </span>
          </div>

          <FilterBar
            mode={mode}
            setMode={setMode}
            type={type}
            setType={setType}
            location={location}
            setLocation={setLocation}
            clearFilters={clearFilters}
          />

          {loading && (
            <div className="feedback-panel" role="status">
              <div className="loader" />
              <p>Loading opportunities...</p>
            </div>
          )}

          {!loading && error && (
            <div className="feedback-panel error-panel" role="alert">
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button
                type="button"
                className="retry-button"
                onClick={() => fetchJobs(new AbortController().signal)}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="feedback-panel">
              <div className="empty-icon">
                <BriefcaseBusiness size={30} />
              </div>
              <h3>No opportunities found</h3>
              <p>
                Try another search term or clear your filters.
              </p>
              <button
                type="button"
                className="retry-button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onViewDetails={setSelectedJob}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="footer-brand" onClick={(event) => {
          event.preventDefault();
          goHome();
        }}>
          <BriefcaseBusiness size={19} />
          InternTrack
        </a>
        <p>Helping students take their next career step.</p>
        <span>Built with the MERN stack.</span>
      </footer>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}

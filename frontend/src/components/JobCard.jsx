
import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";

export default function JobCard({ job, onViewDetails }) {
  const postedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently posted";

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-avatar">
          {(job.company || "C").charAt(0).toUpperCase()}
        </div>

        <span className="job-type-badge">
          {job.type || "Internship"}
        </span>
      </div>

      <h3>{job.title}</h3>
      <p className="company-name">{job.company}</p>

      <div className="job-meta">
        <span>
          <MapPin size={15} />
          {job.location}
        </span>

        <span>
          <BriefcaseBusiness size={15} />
          {job.mode}
        </span>
      </div>

      <div className="stipend">
        <IndianRupee size={16} />
        {job.stipend || "Not specified"}
      </div>

      <div className="skill-list">
        {(job.skills || []).slice(0, 4).map((skill, index) => (
          <span className="skill-tag" key={`${skill}-${index}`}>
            {skill}
          </span>
        ))}
      </div>

      <div className="job-card-footer">
        <span className="posted-date">{postedDate}</span>

        <button
          type="button"
          className="details-button"
          onClick={() => onViewDetails(job)}
        >
          View details
          <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}


import { X, MapPin, BriefcaseBusiness, CalendarDays } from "lucide-react";

export default function JobDetails({ job, onClose }) {
  if (!job) return null;

  const deadline = job.deadline
    ? new Date(job.deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not specified";

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="job-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-title"
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close job details"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div className="company-avatar modal-avatar">
          {(job.company || "C").charAt(0).toUpperCase()}
        </div>

        <span className="job-type-badge">
          {job.type || "Internship"}
        </span>

        <h2 id="job-modal-title">{job.title}</h2>
        <p className="company-name">{job.company}</p>

        <div className="details-meta">
          <span><MapPin size={16} /> {job.location}</span>
          <span><BriefcaseBusiness size={16} /> {job.mode}</span>
          <span><CalendarDays size={16} /> Deadline: {deadline}</span>
        </div>

        <h3>About this opportunity</h3>
        <p className="job-description">
          {job.description}
        </p>

        <h3>Required skills</h3>
        <div className="skill-list">
          {(job.skills || []).length > 0 ? (
            job.skills.map((skill, index) => (
              <span className="skill-tag" key={`${skill}-${index}`}>
                {skill}
              </span>
            ))
          ) : (
            <p>No skills specified.</p>
          )}
        </div>

        <div className="modal-stipend">
          Stipend: {job.stipend || "Not specified"}
        </div>

        {job.applyUrl && (
          <a
            className="apply-button"
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for this opportunity
          </a>
        )}
      </section>
    </div>
  );
}

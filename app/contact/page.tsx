export default function Contact() {
  return (
    <>
      <p className="eyebrow">Contact</p>
      <h1 className="page-heading">Let&rsquo;s talk.</h1>
      <p className="body-text">
        Open to Winter 2027 co-op conversations, or just chatting about
        computer engineering. Easiest ways to reach me:
      </p>

      <div className="panel-reserved">
        {/* TODO: replace every placeholder below with your real details */}
        <div className="contact-row">
          <span className="reserved-label">Email</span>
          <a className="trace-link" href="mailto:YOUR-EMAIL@uwaterloo.ca">
            YOUR-EMAIL@uwaterloo.ca
          </a>
        </div>
        <div className="contact-row">
          <span className="reserved-label">GitHub</span>
          <a
            className="trace-link"
            href="https://github.com/YOUR-USERNAME"
            target="_blank"
            rel="noreferrer"
          >
            github.com/YOUR-USERNAME
          </a>
        </div>
        <div className="contact-row">
          <span className="reserved-label">LinkedIn</span>
          <a
            className="trace-link"
            href="https://linkedin.com/in/YOUR-USERNAME"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/YOUR-USERNAME
          </a>
        </div>
      </div>
    </>
  );
}
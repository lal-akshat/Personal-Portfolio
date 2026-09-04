export default function Experience() {
  return (
    <>
      <p className="eyebrow">Experience</p>
      <h1 className="page-heading">Nothing logged yet.</h1>
      <p className="body-text">
        I haven&rsquo;t held an internship yet — I&rsquo;m a student at the
        University of Waterloo actively looking for a Winter 2027 co-op.
        This page will fill in as that happens.
      </p>

      <div className="panel-reserved">
        <p className="reserved-label">U1 — reserved</p>
        <h2 className="reserved-title">Winter 2027 co-op</h2>
        <p className="body-text" style={{ marginBottom: 0 }}>
          If you&rsquo;re hiring, or just want to talk computer engineering,{" "}
          <a className="trace-link" href="/contact">
            reach out
          </a>
          .
        </p>
      </div>
    </>
  );
}
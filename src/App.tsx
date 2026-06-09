import { useMemo, useState } from 'react';

const sampleLabels = [
  {
    id: 'old-tom',
    name: 'OLD TOM DISTILLERY',
    type: 'Kentucky Straight Bourbon Whiskey',
    summary: 'Strong match on brand, class, and proof. Warning statement and net contents should be double-checked for exact compliance.',
    confidence: 94,
    fields: [
      { label: 'Brand name', value: 'OLD TOM DISTILLERY', status: 'Match' },
      { label: 'Class / type', value: 'Kentucky Straight Bourbon Whiskey', status: 'Match' },
      { label: 'Alcohol content', value: '45% Alc./Vol. (90 Proof)', status: 'Match' },
      { label: 'Net contents', value: '750 mL', status: 'Review' },
      { label: 'Government warning', value: 'GOVERNMENT WARNING: (1) According to the Surgeon General...', status: 'Needs review' },
    ],
  },
  {
    id: 'sunset',
    name: 'SUNSET RIDGE WINERY',
    type: 'California Red Blend',
    summary: 'The bottle label appears legible. The warning statement is present but the producer address should be verified against the application.',
    confidence: 89,
    fields: [
      { label: 'Brand name', value: 'SUNSET RIDGE WINERY', status: 'Match' },
      { label: 'Class / type', value: 'California Red Blend', status: 'Review' },
      { label: 'Alcohol content', value: '13.5% Alc./Vol.', status: 'Match' },
      { label: 'Net contents', value: '750 mL', status: 'Match' },
      { label: 'Government warning', value: 'GOVERNMENT WARNING: (1) According to the Surgeon General...', status: 'Match' },
    ],
  },
  {
    id: 'river',
    name: 'RIVERSTONE DISTILLING CO.',
    type: 'Small Batch Gin',
    summary: 'This item is a good example of a batch review candidate with a long queue and a mixed set of clear and ambiguous field checks.',
    confidence: 86,
    fields: [
      { label: 'Brand name', value: 'RIVERSTONE DISTILLING CO.', status: 'Match' },
      { label: 'Class / type', value: 'Small Batch Gin', status: 'Match' },
      { label: 'Alcohol content', value: '40% Alc./Vol. (80 Proof)', status: 'Review' },
      { label: 'Net contents', value: '1 L', status: 'Match' },
      { label: 'Government warning', value: 'GOVERNMENT WARNING: (1) According to the Surgeon General...', status: 'Needs review' },
    ],
  },
];

const batchItems = [
  'Application 1042 — 4 labels queued for same-day review',
  'Application 1043 — 2 labels queued with warning-statement checks',
  'Application 1044 — 6 labels queued from Seattle import batch',
];

const complianceChecklist = [
  'Brand name and class/type are present and readable.',
  'Alcohol content matches the form submission and proof notation.',
  'Government warning is exact, all caps, and visible.',
  'Net contents and producer details are legible for final approval.',
];

export default function App() {
  const [selectedLabelId, setSelectedLabelId] = useState('old-tom');
  const [statusMessage, setStatusMessage] = useState('Demo mode active: the prototype uses preloaded label samples for fast feedback in constrained environments.');

  const selectedLabel = useMemo(
    () => sampleLabels.find((label) => label.id === selectedLabelId) ?? sampleLabels[0],
    [selectedLabelId],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isImage = file.type.startsWith('image/');
    setStatusMessage(
      isImage
        ? `${file.name} loaded. The interface keeps processing lightweight and readable for agents who need fast results.`
        : `${file.name} loaded. This prototype focuses on the review workflow rather than deep OCR integration.`,
    );
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">TTB label compliance prototype</p>
          <h1>AI-assisted review for alcohol label verification</h1>
          <p className="lede">
            This workflow is optimized for high-volume review queues, fast verification, and plain-language status cues for
            agents who need clear next steps without a long learning curve.
          </p>
        </div>

        <aside className="chip-panel" aria-label="Key metrics">
          <article className="metric-card">
            <span>Average response time</span>
            <strong>&lt; 5 sec</strong>
          </article>
          <article className="metric-card">
            <span>Batch queue</span>
            <strong>18 labels</strong>
          </article>
          <article className="metric-card accent">
            <span>Demo confidence</span>
            <strong>{selectedLabel.confidence}%</strong>
          </article>
        </aside>
      </section>

      <section className="grid-layout">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Upload</p>
              <h2>Review a label image</h2>
            </div>
            <span className="badge">Fast intake</span>
          </div>

          <label className="upload-row" htmlFor="label-upload">
            <span>Choose a label image</span>
            <input id="label-upload" type="file" accept="image/*,.pdf" onChange={handleFileChange} />
          </label>

          <div className="drop-zone" role="status" aria-live="polite">
            <strong>Upload or select a sample label</strong>
            <span>{statusMessage}</span>
          </div>

          <div className="mini-card">
            <p className="eyebrow">Selected sample</p>
            <strong>{selectedLabel.name}</strong>
            <span>{selectedLabel.type}</span>
          </div>

          <ul className="batch-list">
            {batchItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Inspection</p>
              <h2>Detected label fields</h2>
            </div>
            <span className="badge">Status: ready</span>
          </div>

          <p className="summary-copy">{selectedLabel.summary}</p>

          <div className="field-grid" role="list" aria-label="Detected fields">
            {selectedLabel.fields.map((field) => (
              <article className="field-card" key={field.label} role="listitem">
                <header>
                  <h3>{field.label}</h3>
                  <span className={`pill ${field.status.toLowerCase().replace(/\s+/g, '-')}`}>{field.status}</span>
                </header>
                <p>{field.value}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="grid-layout lower-grid">
        <article className="panel">
          <p className="eyebrow">Batch queue</p>
          <h2>Use the sample labels to test the workflow</h2>
          <div className="sample-grid" role="list" aria-label="Sample labels">
            {sampleLabels.map((label) => (
              <button
                key={label.id}
                className={`sample-card ${label.id === selectedLabel.id ? 'active' : ''}`}
                type="button"
                onClick={() => {
                  setSelectedLabelId(label.id);
                  setStatusMessage(`Switched to ${label.name}. The scoring logic keeps the review path fast and consistent for batch intake.`);
                }}
              >
                <strong>{label.name}</strong>
                <span>{label.type}</span>
                <small>{label.confidence}% confidence</small>
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Compliance checklist</p>
          <h2>Key checks the reviewer can confirm</h2>
          <ol className="checklist">
            {complianceChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className="note-copy">
            Assumption: this prototype intentionally uses lightweight, deterministic analysis rather than a live cloud OCR endpoint,
            which keeps the user experience fast in a government environment with restricted outbound traffic.
          </p>
        </article>
      </section>
    </main>
  );
}

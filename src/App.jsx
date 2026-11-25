import { useEffect, useMemo, useState } from 'react';

const iconPaths = {
  ArrowDownToLine: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/></>, ArrowLeft: <><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>, ArrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  BriefcaseBusiness: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/></>, Check: <path d="m5 12 4 4L19 6"/>, ChevronDown: <path d="m6 9 6 6 6-6"/>, CircleHelp: <><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m.1 4h.01"/></>, Code2: <><path d="m16 18 6-6-6-6M8 6l-6 6 6 6m6-16-4 20"/></>, FileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/></>, GraduationCap: <><path d="m22 10-10-5-10 5 10 5 10-5ZM6 12v5c3.5 3 8.5 3 12 0v-5m4-2v6"/></>, Plus: <path d="M12 5v14m-7-7h14"/>, Sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Zm7 11 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"/></>, Trash2: <><path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6"/></>, UserRound: <><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></>, WandSparkles: <><path d="m15 4 5 5M4 20l11-11M5 5l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Zm14 9 1.5 3.5L24 19l-3.5 1.5L19 24l-1.5-3.5L14 19l3.5-1.5L19 14Z"/></>,
};
function Icon({ name, size = 16, ...props }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{iconPaths[name]}</svg>; }

const initial = {
  fullName: 'Alex Morgan', role: 'Product designer', email: 'alex.morgan@email.com', phone: '+1 (555) 014-8291', location: 'Brooklyn, NY', linkedin: 'linkedin.com/in/alexmorgan', website: 'alexmorgan.design',
  summary: 'Product designer with 5+ years of experience turning complex problems into clear, intuitive digital experiences. Skilled at partnering across design, product, and engineering to ship thoughtful solutions that make a measurable impact.',
  experience: [
    { title: 'Senior Product Designer', company: 'Linear Studio', location: 'New York, NY', start: '2022', end: 'Present', bullets: ['Led end-to-end redesign of the onboarding flow, improving activation by 28%.', 'Built a scalable component library used by 4 product teams across web and mobile.', 'Partnered with product and engineering to bring 12+ features from concept to launch.'] },
    { title: 'Product Designer', company: 'Northstar Labs', location: 'Brooklyn, NY', start: '2020', end: '2022', bullets: ['Designed research-backed features for a platform serving 40k+ monthly users.', 'Ran 20+ usability sessions and translated insights into a prioritized roadmap.'] },
  ],
  internships: [],
  education: [{ school: 'Rhode Island School of Design', degree: 'BFA, Graphic Design', location: 'Providence, RI', start: '2016', end: '2020' }],
  certifications: [],
  skills: 'Product design, Interaction design, User research, Prototyping, Figma, Design systems, Accessibility, HTML & CSS',
  projects: [{ name: 'Open-source design system', description: 'Created an accessible component library with 30+ reusable patterns for early-stage teams.', link: 'github.com/alexmorgan/system' }],
};

const sections = [
  { id: 'personal', label: 'Personal details', icon: 'UserRound' },
  { id: 'experience', label: 'Work experience', icon: 'BriefcaseBusiness' },
  { id: 'internships', label: 'Internships', icon: 'BriefcaseBusiness' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'certifications', label: 'Certifications', icon: 'FileText' },
  { id: 'skills', label: 'Skills', icon: 'Sparkles' },
  { id: 'projects', label: 'Projects', icon: 'Code2' },
];

function getSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem('clearfolio-resume') || '{}');
    return { ...initial, ...saved, internships: saved.internships || [], certifications: saved.certifications || [] };
  } catch { return initial; }
}

function Field({ label, value, onChange, placeholder, type = 'text', wide = false, hint }) {
  return <label className={`field${wide ? ' field-wide' : ''}`}><span>{label}</span><input type={type} value={value ?? ''} placeholder={placeholder} onChange={e => onChange(e.target.value)} />{hint && <small>{hint}</small>}</label>;
}

function EntryCard({ title, subtitle, children, onRemove }) {
  return <div className="entry-card"><div className="entry-heading"><div><strong>{title}</strong><span>{subtitle}</span></div><button className="icon-button remove-button" onClick={onRemove} aria-label={`Remove ${title}`}><Icon name="Trash2" size={16}/></button></div>{children}</div>;
}

function ResumePreview({ data, pageRef }) {
  const skills = (data.skills || '').split(',').map(s => s.trim()).filter(Boolean);
  return <article className="resume-paper" ref={pageRef} aria-label="Resume preview">
    <header className="resume-header"><h1>{data.fullName || 'Your name'}</h1><p className="resume-role">{data.role || 'Your professional title'}</p><div className="resume-contact">
      {data.email && <span>{data.email}</span>}{data.phone && <span>{data.phone}</span>}{data.location && <span>{data.location}</span>}
      {data.linkedin && <span>{data.linkedin}</span>}{data.website && <span>{data.website}</span>}
    </div></header>
    {data.summary?.trim() && <section className="resume-section"><h2>Professional Summary</h2><p>{data.summary}</p></section>}
    {!!data.experience?.length && <section className="resume-section"><h2>Experience</h2>{data.experience.map((job, i) => <div className="resume-entry" key={i}>
      <div className="resume-entry-top"><strong>{job.title}</strong><span>{job.start}{job.end ? ` – ${job.end}` : ''}</span></div>
      <div className="resume-entry-sub"><i>{job.company}{job.location ? ` · ${job.location}` : ''}</i></div>
      {job.bullets?.filter(b => b.trim()).length > 0 && <ul>{job.bullets.filter(b => b.trim()).map((b, j) => <li key={j}>{b}</li>)}</ul>}
    </div>)}</section>}
    {!!data.internships?.filter(item => item.role || item.company || item.description || item.bullets?.some(b => b.trim())).length && <section className="resume-section"><h2>Internships</h2>{data.internships.filter(item => item.role || item.company || item.description || item.bullets?.some(b => b.trim())).map((item, i) => <div className="resume-entry" key={i}>
      <div className="resume-entry-top"><strong>{item.role}</strong><span>{item.start}{item.end ? ` – ${item.end}` : ''}</span></div>
      <div className="resume-entry-sub"><i>{item.company}{item.location ? ` · ${item.location}` : ''}</i></div>
      {item.description && <p>{item.description}</p>}{item.bullets?.filter(b => b.trim()).length > 0 && <ul>{item.bullets.filter(b => b.trim()).map((b, j) => <li key={j}>{b}</li>)}</ul>}
    </div>)}</section>}
    {!!data.education?.length && <section className="resume-section"><h2>Education</h2>{data.education.map((ed, i) => <div className="resume-entry" key={i}>
      <div className="resume-entry-top"><strong>{ed.school}</strong><span>{ed.start}{ed.end ? ` – ${ed.end}` : ''}</span></div><div className="resume-entry-sub"><i>{ed.degree}{ed.location ? ` · ${ed.location}` : ''}</i></div>
    </div>)}</section>}
    {!!data.certifications?.filter(item => item.name || item.issuer || item.date || item.link).length && <section className="resume-section"><h2>Certifications</h2>{data.certifications.filter(item => item.name || item.issuer || item.date || item.link).map((item, i) => <div className="resume-entry" key={i}>
      <div className="resume-entry-top"><strong>{item.name}</strong><span>{item.date}</span></div>
      <div className="resume-entry-sub">{item.issuer}{item.issuer && item.link ? ' · ' : ''}{item.link}</div>
    </div>)}</section>}
    {skills.length > 0 && <section className="resume-section"><h2>Skills</h2><p>{skills.join(' · ')}</p></section>}
    {!!data.projects?.length && <section className="resume-section"><h2>Projects</h2>{data.projects.map((p, i) => <div className="resume-entry" key={i}><div className="resume-entry-top"><strong>{p.name}</strong>{p.link && <span>{p.link}</span>}</div><p>{p.description}</p></div>)}</section>}
  </article>;
}

function App() {
  const [data, setData] = useState(getSaved);
  const [active, setActive] = useState('personal');
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(true);
  const [pdfState, setPdfState] = useState(false);

  useEffect(() => {
    setSaved(false);
    const timer = setTimeout(() => { localStorage.setItem('clearfolio-resume', JSON.stringify(data)); setSaved(true); }, 450);
    return () => clearTimeout(timer);
  }, [data]);

  const completion = useMemo(() => {
    const checks = [data.fullName, data.email, data.phone, data.summary, data.experience?.some(e => e.title && e.company), data.education?.some(e => e.school), data.skills];
    return Math.round(checks.filter(Boolean).length / checks.length * 100);
  }, [data]);

  function update(key, value) { setData(prev => ({ ...prev, [key]: value })); }
  function updateEntry(key, index, field, value) {
    setData(prev => ({ ...prev, [key]: prev[key].map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  }
  function addEntry(key) {
    const blank = key === 'experience' ? { title: '', company: '', location: '', start: '', end: '', bullets: [''] }
      : key === 'internships' ? { role: '', company: '', location: '', start: '', end: '', description: '', bullets: [''] }
      : key === 'education' ? { school: '', degree: '', location: '', start: '', end: '' }
      : key === 'certifications' ? { name: '', issuer: '', date: '', link: '' }
      : { name: '', description: '', link: '' };
    setData(prev => ({ ...prev, [key]: [...prev[key], blank] }));
  }
  function removeEntry(key, index) { setData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) })); }
  function updateBullet(index, bulletIndex, value) {
    setData(prev => ({ ...prev, experience: prev.experience.map((job, i) => i === index ? { ...job, bullets: job.bullets.map((b, j) => j === bulletIndex ? value : b) } : job) }));
  }
  function updateInternshipBullet(index, bulletIndex, value) {
    setData(prev => ({ ...prev, internships: prev.internships.map((item, i) => i === index ? { ...item, bullets: item.bullets.map((b, j) => j === bulletIndex ? value : b) } : item) }));
  }

  function exportPdf() {
    setPdfState(true);
    window.setTimeout(() => { window.print(); setPdfState(false); }, 80);
  }

  const title = sections.find(s => s.id === active)?.label;
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#"><span className="brand-mark"><Icon name="FileText" size={18}/></span><span>Resume Maker</span></a><div className="topbar-center"><span className="document-dot"/>Untitled resume <Icon name="ChevronDown" size={14}/></div><div className="topbar-right"><span className="save-status"><span className={`status-dot ${saved ? 'is-saved' : ''}`}/>{saved ? 'Saved locally' : 'Saving…'}</span><button className="button button-primary top-export" onClick={exportPdf}><Icon name="ArrowDownToLine" size={16}/> Export PDF</button></div></header>
    <main className={`workspace${preview ? ' preview-mode' : ''}`}>
      <aside className="editor-panel"><div className="editor-intro"><div><span className="eyebrow">YOUR RESUME</span><h1>Let’s make it <span>stand out.</span></h1><p>A few details are all it takes to build your next opportunity.</p></div><button className="help-button" title="Your draft saves automatically in this browser."><Icon name="CircleHelp" size={17}/></button></div>
        <div className="completion-card"><div className="completion-row"><span>Resume completeness</span><strong>{completion}%</strong></div><div className="progress-track"><div style={{ width: `${completion}%` }}/></div><span className="completion-caption">{completion === 100 ? 'Great work — your resume is ready to export.' : 'Add your details to build a complete resume.'}</span></div>
        <nav className="section-nav" aria-label="Resume sections">{sections.map(item => <button key={item.id} className={`section-nav-item${active === item.id ? ' active' : ''}`} onClick={() => setActive(item.id)}><Icon name={item.icon} size={16}/><span>{item.label}</span><Icon name="ArrowRight" size={14} className="nav-arrow"/></button>)}</nav>
        <div className="editor-form">
          {active === 'personal' && <><div className="section-heading"><div><span className="eyebrow">01 — INTRODUCE YOURSELF</span><h2>Personal details</h2><p>Start with the basics. Keep it professional and easy to scan.</p></div></div><div className="form-grid"><Field label="Full name" value={data.fullName} onChange={v => update('fullName', v)} placeholder="e.g. Jordan Lee"/><Field label="Professional title" value={data.role} onChange={v => update('role', v)} placeholder="e.g. Product designer" wide/><Field label="Email address" type="email" value={data.email} onChange={v => update('email', v)} placeholder="you@email.com"/><Field label="Phone number" value={data.phone} onChange={v => update('phone', v)} placeholder="+1 (555) 000-0000"/><Field label="Location" value={data.location} onChange={v => update('location', v)} placeholder="City, Country"/><Field label="LinkedIn profile" value={data.linkedin} onChange={v => update('linkedin', v)} placeholder="linkedin.com/in/you"/><Field label="Portfolio / website" value={data.website} onChange={v => update('website', v)} placeholder="yourwebsite.com" wide/><label className="field field-wide"><span>Professional summary</span><textarea rows="5" value={data.summary} onChange={e => update('summary', e.target.value)} placeholder="A short, confident introduction. Highlight your experience and what you bring."/><small>Aim for 2–4 lines. Lead with your strongest strengths.</small></label></div></>}
          {active === 'experience' && <><div className="section-heading"><div><span className="eyebrow">02 — YOUR EXPERIENCE</span><h2>Work experience</h2><p>Show the impact you made. Start each bullet with a strong action verb.</p></div></div>{data.experience.map((job, i) => <EntryCard key={i} title={job.title || `Position ${i + 1}`} subtitle={job.company || 'Company'} onRemove={() => removeEntry('experience', i)}><div className="form-grid compact-grid"><Field label="Job title" value={job.title} onChange={v => updateEntry('experience', i, 'title', v)} placeholder="e.g. Product designer"/><Field label="Company" value={job.company} onChange={v => updateEntry('experience', i, 'company', v)} placeholder="Company name"/><Field label="Location" value={job.location} onChange={v => updateEntry('experience', i, 'location', v)} placeholder="City, Country"/><div className="form-grid dates-grid"><Field label="From" value={job.start} onChange={v => updateEntry('experience', i, 'start', v)} placeholder="2022"/><Field label="To" value={job.end} onChange={v => updateEntry('experience', i, 'end', v)} placeholder="Present"/></div><div className="field field-wide"><span>Key achievements</span>{job.bullets.map((b, j) => <div className="bullet-input" key={j}><span>•</span><input value={b} onChange={e => updateBullet(i, j, e.target.value)} placeholder="What did you accomplish? Add a result if you can."/><button className="icon-button" onClick={() => updateEntry('experience', i, 'bullets', job.bullets.filter((_, n) => n !== j))} aria-label="Remove achievement"><Icon name="Trash2" size={14}/></button></div>)}<button className="text-add" onClick={() => updateEntry('experience', i, 'bullets', [...job.bullets, ''])}><Icon name="Plus" size={14}/> Add achievement</button></div></div></EntryCard>)}<button className="button button-outline add-entry" onClick={() => addEntry('experience')}><Icon name="Plus" size={16}/> Add experience</button></>}
          {active === 'internships' && <><div className="section-heading"><div><span className="eyebrow">03 — HANDS-ON EXPERIENCE</span><h2>Internships</h2><p>Add internships and the work or skills you gained.</p></div></div>{data.internships.map((item, i) => <EntryCard key={i} title={item.role || `Internship ${i + 1}`} subtitle={item.company || 'Company'} onRemove={() => removeEntry('internships', i)}><div className="form-grid compact-grid"><Field label="Role / internship title" value={item.role} onChange={v => updateEntry('internships', i, 'role', v)} placeholder="e.g. Software Engineering Intern"/><Field label="Company" value={item.company} onChange={v => updateEntry('internships', i, 'company', v)} placeholder="Company name"/><Field label="Location" value={item.location} onChange={v => updateEntry('internships', i, 'location', v)} placeholder="City, Country"/><div className="form-grid dates-grid"><Field label="From" value={item.start} onChange={v => updateEntry('internships', i, 'start', v)} placeholder="Jun 2025"/><Field label="To" value={item.end} onChange={v => updateEntry('internships', i, 'end', v)} placeholder="Aug 2025"/></div><label className="field field-wide"><span>Description</span><textarea rows="3" value={item.description} onChange={e => updateEntry('internships', i, 'description', e.target.value)} placeholder="Briefly describe the team or work."/></label><div className="field field-wide"><span>Key contributions</span>{item.bullets.map((b, j) => <div className="bullet-input" key={j}><span>•</span><input value={b} onChange={e => updateInternshipBullet(i, j, e.target.value)} placeholder="What did you work on or achieve?"/><button className="icon-button" onClick={() => updateEntry('internships', i, 'bullets', item.bullets.filter((_, n) => n !== j))} aria-label="Remove contribution"><Icon name="Trash2" size={14}/></button></div>)}<button className="text-add" onClick={() => updateEntry('internships', i, 'bullets', [...item.bullets, ''])}><Icon name="Plus" size={14}/> Add contribution</button></div></div></EntryCard>)}<button className="button button-outline add-entry" onClick={() => addEntry('internships')}><Icon name="Plus" size={16}/> Add internship</button></>}
          {active === 'education' && <><div className="section-heading"><div><span className="eyebrow">03 — YOUR EDUCATION</span><h2>Education</h2><p>Add your degree, school, or relevant training.</p></div></div>{data.education.map((ed, i) => <EntryCard key={i} title={ed.degree || `Education ${i + 1}`} subtitle={ed.school || 'School'} onRemove={() => removeEntry('education', i)}><div className="form-grid compact-grid"><Field label="School / institution" value={ed.school} onChange={v => updateEntry('education', i, 'school', v)} placeholder="University or school" wide/><Field label="Degree / field of study" value={ed.degree} onChange={v => updateEntry('education', i, 'degree', v)} placeholder="e.g. BSc, Computer Science" wide/><Field label="Location" value={ed.location} onChange={v => updateEntry('education', i, 'location', v)} placeholder="City, Country"/><div className="form-grid dates-grid"><Field label="From" value={ed.start} onChange={v => updateEntry('education', i, 'start', v)} placeholder="2018"/><Field label="To" value={ed.end} onChange={v => updateEntry('education', i, 'end', v)} placeholder="2022"/></div></div></EntryCard>)}<button className="button button-outline add-entry" onClick={() => addEntry('education')}><Icon name="Plus" size={16}/> Add education</button></>}
          {active === 'certifications' && <><div className="section-heading"><div><span className="eyebrow">05 — COURSES & CREDENTIALS</span><h2>Certifications</h2><p>Add certificates, licenses, or courses relevant to your goals.</p></div></div>{data.certifications.map((item, i) => <EntryCard key={i} title={item.name || `Certification ${i + 1}`} subtitle={item.issuer || 'Issuing organization'} onRemove={() => removeEntry('certifications', i)}><div className="form-grid compact-grid"><Field label="Certificate name" value={item.name} onChange={v => updateEntry('certifications', i, 'name', v)} placeholder="e.g. Google Data Analytics" wide/><Field label="Issuing organization" value={item.issuer} onChange={v => updateEntry('certifications', i, 'issuer', v)} placeholder="Organization or provider"/><Field label="Date earned" value={item.date} onChange={v => updateEntry('certifications', i, 'date', v)} placeholder="Month, Year"/><Field label="Credential link / ID" value={item.link} onChange={v => updateEntry('certifications', i, 'link', v)} placeholder="URL or credential ID" wide/></div></EntryCard>)}<button className="button button-outline add-entry" onClick={() => addEntry('certifications')}><Icon name="Plus" size={16}/> Add certification</button></>}
          {active === 'skills' && <><div className="section-heading"><div><span className="eyebrow">04 — YOUR TOOLKIT</span><h2>Skills</h2><p>Include relevant skills and tools that match the roles you want.</p></div></div><label className="field"><span>Skills</span><textarea rows="5" value={data.skills} onChange={e => update('skills', e.target.value)} placeholder="e.g. Project management, SQL, Figma"/><small>Separate each skill with a comma. Keep them specific and relevant.</small></label><div className="tip-card"><Icon name="Sparkles" size={16}/><div><strong>Quick tip</strong><p>Use the same language as the job description when it accurately describes your experience.</p></div></div></>}
          {active === 'projects' && <><div className="section-heading"><div><span className="eyebrow">05 — SHOW YOUR WORK</span><h2>Projects</h2><p>Highlight side projects, volunteer work, or anything you’re proud of.</p></div></div>{data.projects.map((p, i) => <EntryCard key={i} title={p.name || `Project ${i + 1}`} subtitle={p.link || 'Add a project link'} onRemove={() => removeEntry('projects', i)}><div className="form-grid compact-grid"><Field label="Project name" value={p.name} onChange={v => updateEntry('projects', i, 'name', v)} placeholder="What did you build?" wide/><Field label="Project link" value={p.link} onChange={v => updateEntry('projects', i, 'link', v)} placeholder="github.com/you/project" wide/><label className="field field-wide"><span>Description</span><textarea rows="3" value={p.description} onChange={e => updateEntry('projects', i, 'description', e.target.value)} placeholder="What was the goal and what did you do?"/></label></div></EntryCard>)}<button className="button button-outline add-entry" onClick={() => addEntry('projects')}><Icon name="Plus" size={16}/> Add project</button></>}
          <div className="form-footer"><span><span className="status-dot is-saved"/> Autosaved in this browser</span><div>{active !== 'personal' && <button className="button button-quiet" onClick={() => setActive(sections[sections.findIndex(s => s.id === active) - 1].id)}><Icon name="ArrowLeft" size={15}/> Back</button>}{active !== 'certifications' && <button className="button button-primary" onClick={() => setActive(sections[sections.findIndex(s => s.id === active) + 1].id)}>Continue <Icon name="ArrowRight" size={15}/></button>}</div></div>
        </div>
      </aside>
      <section className="preview-panel"><div className="preview-toolbar"><div className="preview-title"><span className="preview-indicator"/><strong>Live preview</strong><span className="ats-pill"><Icon name="Check" size={12}/> ATS friendly</span></div><div className="preview-tools"><button className="tool-button" onClick={() => window.print()}><Icon name="WandSparkles" size={15}/> Preview</button><span className="toolbar-divider"/><span className="zoom-label">100%</span><button className="tool-button" onClick={() => setPreview(!preview)}>{preview ? 'Edit resume' : 'Focus preview'} <Icon name="ArrowRight" size={14}/></button></div></div><div className="paper-wrap"><div className="page-counter">PAGE 1 OF 1</div><ResumePreview data={data} /></div><div className="preview-bottom"><span><Icon name="Check" size={14}/> Simple formatting for applicant tracking systems</span><button onClick={exportPdf}><Icon name="ArrowDownToLine" size={14}/> Download PDF</button></div></section>
    </main>
    <footer className="app-footer"><span>Made for your next chapter.</span><span><button onClick={() => { localStorage.removeItem('clearfolio-resume'); setData(initial); }}>Reset sample</button><i/> Your data stays on this device</span></footer>
  </div>;
}

export default App;

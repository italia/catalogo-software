import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSoftwareBySlug } from '../api/elasticsearch';
import type { SoftwareDetail } from '../types';
import { LANG, SOFTWARE_REUSE } from '../utils/constants';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { ImageWithPlaceholder } from '../components/ImageWithPlaceholder';
import Markdown from 'react-markdown';
import { labels, developmentStatusLabels, categoryLabels, scopeLabels } from '../utils/i18n';
import Layout from '../components/layout';

// ─── helpers ────────────────────────────────────────────────────────────────

function getDescription(detail: SoftwareDetail) {
  const descs = detail.publiccode.description;
  if (!descs) return null;
  const keys = Object.keys(descs);
  if (descs[LANG]) return descs[LANG];
  const baseLang = LANG.split('-')[0];
  const variant = keys.find((k) => k.startsWith(baseLang + '-'));
  if (variant) return descs[variant];
  if (descs['en']) return descs['en'];
  if (descs['it']) return descs['it'];
  return descs[keys[0]] ?? null;
}

function resolveUrl(url: string, repoUrl?: string): string {
  if (!url || /^https?:\/\//.test(url)) return url;
  if (!repoUrl) return url;
  try {
    const repo = new URL(repoUrl);
    const hostname = repo.hostname;
    if (hostname === 'github.com')
      return `https://raw.githubusercontent.com${repo.pathname}/HEAD/${url}`;
    if (hostname === 'bitbucket.org')
      return `https://bitbucket.org${repo.pathname}/raw/HEAD/${url}`;
    return `${repo.protocol}//${hostname}${repo.pathname}/-/raw/HEAD/${url}`;
  } catch {
    return url;
  }
}

function isReuse(detail: SoftwareDetail): boolean {
  return !!(
    detail.publiccode.organisation?.uri ||
    detail.publiccode.IT?.riuso?.codiceIPA ||
    detail.publiccode.it?.riuso?.codiceIPA
  );
}

// ─── sub-components ─────────────────────────────────────────────────────────

/** Small icon SVG paths reusing the same set as developers.italia.it */
const Icons = {
  link: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  roadmap: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

interface ActionLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}
function ActionLink({ href, icon, label }: ActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline-primary text-start"
    >
      {icon}
      <span className="d-inline-block" style={{ width: '1rem' }}></span>
      <span>{label}</span>
    </a>
  );
}

interface MetaRowProps {
  label: string;
  value: React.ReactNode;
  ddClasses?: string;
}
function MetaRow({ label, value, ddClasses }: MetaRowProps) {
  return (
    <div className="di-meta-row row">
      <dt className="di-meta-row__label col-12 col-md-6">{label}</dt>
      <dd className={`di-meta-row__value col-12 col-md-6 ${ddClasses || ''}`}>{value}</dd>
    </div>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

export function DetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [detail, setDetail] = useState<SoftwareDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchSoftwareBySlug(slug!);
        if (cancelled) return;
        setDetail(result);
      } catch (e) {
        if (cancelled) return;
        setError((e as Error).message);
      }
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage description={error} />;
  if (!detail) return <ErrorMessage description="Software non trovato" />;

  const desc = getDescription(detail);
  const name = desc?.localisedName ?? detail.publiccode.name;
  const category = isReuse(detail) ? SOFTWARE_REUSE : 'software_open';
  const fallback =
    category === SOFTWARE_REUSE
      ? '/assets/images/cover_softwareriuso.png'
      : '/assets/images/cover_software_opensource.png';
  const repoUrl = detail.publiccode.url;

  // logo is the first item; screenshots (index 0+) go into the carousel
  const logoRaw = detail.publiccode.logo ?? fallback;
  let logo = resolveUrl(logoRaw, repoUrl);
  if (/github/.test(logo) && /\.svg$/.test(logo)) logo += '?sanitize=true';

  const allScreenshots = (desc?.screenshots ?? []).map((s) => resolveUrl(s, repoUrl));

  // derived fields
  const repoOwner = detail.publiccode.legal?.repoOwner;
  const mainCopyrightOwner = detail.publiccode.legal?.mainCopyrightOwner;
  const license = detail.publiccode.legal?.license;
  const maintenanceType = detail.publiccode.maintenance?.type;
  const contacts = detail.publiccode.maintenance?.contacts ?? [];
  const contractors = detail.publiccode.maintenance?.contractors ?? [];
  const devStatus = detail.publiccode.developmentStatus;
  const releaseDate = detail.publiccode.releaseDate;
  const softwareVersion = detail.publiccode.softwareVersion;
  const applicationSuite = detail.publiccode.applicationSuite;
  const roadmap = detail.publiccode.roadmap;
  const deployPlatforms = detail.publiccode.platforms;
  const categories = detail.publiccode.categories;
  const intendedAudience = detail.publiccode.intendedAudience;
  const usedBy = detail.publiccode.usedBy;
  const features = desc?.features ?? [];
  const longDescription = desc?.longDescription;
  const apiDocumentation = desc?.apiDocumentation;
  const landingURL = detail.publiccode.landingURL;
  const docURL = desc?.documentation;
  const availableLanguages = detail.publiccode.localisation?.availableLanguages;
  const localisationReady = detail.publiccode.localisation?.localisationReady;
  const piattaforme = detail.publiccode.it?.piattaforme ?? detail.publiccode.IT?.piattaforme;
  const conformita = detail.publiccode.it?.conforme ?? detail.publiccode.IT?.conforme;
  const dependsOnOpen = detail.publiccode.dependsOn?.open;
  const dependsOnProprietary = detail.publiccode.dependsOn?.proprietary;
  const organisation = detail.publiccode.organisation;
  const codiceIPA = detail.publiccode.it?.riuso?.codiceIPA ?? detail.publiccode.IT?.riuso?.codiceIPA;
  const codiceIPALabel = detail['it-riuso-codiceIPA-label'];

  // enabling platforms as labelled badges
  const enablingPlatforms: string[] = [];
  if (piattaforme?.pagopa) enablingPlatforms.push('pagoPA');
  if (piattaforme?.spid) enablingPlatforms.push('SPID');
  if (piattaforme?.cie) enablingPlatforms.push('CIE');
  if (piattaforme?.anpr) enablingPlatforms.push('ANPR');
  if (piattaforme?.io) enablingPlatforms.push('App IO');

  // compliance labels
  const complianceItems: string[] = [];
  if (conformita?.lineeGuidaDesign) complianceItems.push('Linee Guida Design');
  if (conformita?.misureMinimeSicurezza) complianceItems.push('Misure Minime Sicurezza');
  if (conformita?.modelloInteroperabilita) complianceItems.push('Modello Interoperabilità');
  if (conformita?.gdpr) complianceItems.push('GDPR');

  return (
    <Layout>
      {/* ── scoped styles ──────────────────────────────────────────────── */}

      <main className="container swdetail" style={{ marginTop: '2.5rem', marginBottom: '6rem' }} data-testid="catalogue-container">

        {/* back */}
        <Link to="/" className="di-back-link">
          <svg className="icon icon-sm icon-primary me-2"><use href="/sprites.svg#it-arrow-left"></use></svg> {labels.software.back_to_catalogue}
        </Link>

        <div className="row flex-column-reverse flex-lg-row">
          {/* ── LEFT ───────────────────────────────────────────────────── */}
          <aside className="col-12 col-lg-3">
            {/* logo */}
            <div className="di-logo-card">
              <ImageWithPlaceholder placeholder={fallback} alt={'Logo ' + name} img={logo} />
            </div>

            {/* screenshot carousel */}
            {allScreenshots.length > 0 && (
              <div className="di-carousel">
                <a href={allScreenshots[activeScreenshot]} target="_blank" rel="noopener noreferrer">
                  <img
                    className="di-carousel__main"
                    src={allScreenshots[activeScreenshot]}
                    alt={`Screenshot ${activeScreenshot + 1}`}
                  />
                </a>
                {allScreenshots.length > 1 && (
                  <div className="di-carousel__thumbs">
                    {allScreenshots.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        className={`di-carousel__thumb${i === activeScreenshot ? ' di-carousel__thumb--active' : ''}`}
                        onClick={() => setActiveScreenshot(i)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* action links */}
            <div className="di-action-links">
              {landingURL && (
                <ActionLink href={landingURL} icon={Icons.link} label={labels.software.goToLandingUrl} />
              )}
              {docURL && (
                <ActionLink href={docURL} icon={Icons.docs} label={labels.software.goToDocumentation} />
              )}
              {repoUrl && (
                <ActionLink href={repoUrl} icon={Icons.code} label={labels.software.goToCode} />
              )}
              {apiDocumentation && (
                <ActionLink href={apiDocumentation} icon={Icons.api} label={labels.software.api_documentation} />
              )}
              {roadmap && (
                <ActionLink href={roadmap} icon={Icons.roadmap} label={labels.software.roadmap} />
              )}
            </div>
          </aside>

          {/* ── RIGHT ──────────────────────────────────────────────────── */}
          <main className="col-12 col-lg-9">
            {/* hero */}
            <div>
              {/* category chips */}
              {categories && categories.length > 0 && (
                <div className="mb-1">
                  {categories.map((cat, i) => (
                    <div className="chip chip-primary" key={cat}>
                      <span className="chip-label text-uppercase">{categoryLabels[cat] ?? cat}</span>
                    </div>
                  ))}
                </div>
              )}

              <h1>
                {name}&nbsp;
                {softwareVersion && (
                  <span className="badge badge-primary">{softwareVersion}</span>
                )}
              </h1>

              {desc?.shortDescription && (
                <p>{desc.shortDescription}</p>
              )}

              {(repoOwner || codiceIPALabel || organisation?.name) && (
                <p>
                  {labels.software.published_by}{' '}
                  <strong>{codiceIPALabel ?? organisation?.name ?? repoOwner}</strong>
                </p>
              )}

              {devStatus && (
                <div className="chip chip-success mb-4">
                  <span className="chip-label">
                    {labels.software.development_status}:{' '}
                    {developmentStatusLabels[devStatus] ?? devStatus}
                  </span>
                </div>
              )}
            </div>

            {/* features */}
            {features.length > 0 && (
              <section>
                <h2 className="">{labels.software.functionality}</h2>
                <ul className="di-features">
                  {features.map((f, i) => (
                    <li key={i}>
                      <Markdown components={{ p: ({ children }) => <>{children}</> }}>{f}</Markdown>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* used by */}
            {usedBy && usedBy.length > 0 && (
              <UsedBySection usedBy={usedBy} labels={labels} />
            )}

            {/* categories as badges (secondary display after hero) */}


            {/* detail info panel */}
            <section className="di-info-panel">
              <div className="di-info-panel__header">Informazioni di dettaglio</div>
              <dl className="di-info-panel__body">
                {((categories && categories.length > 0) ||
                  (intendedAudience?.scope && intendedAudience.scope.length > 0)) && (
                  <MetaRow
                    label={labels.software.categories}
                    value={
                      <div className="categories mt-2 mt-md-0">
                        {(categories ?? []).map((cat) => (
                          <div className="chip chip-primary">
                            <span key={cat} className="chip-label">{categoryLabels[cat] ?? cat}</span>
                          </div>
                        ))}
                        {(intendedAudience?.scope ?? []).map((s) => (
                          <div className="chip chip-primary">
                            <span key={s} className="chip-label">{scopeLabels[s] ?? s}</span>
                          </div>
                        ))}
                      </div>
                    } />
                )}
                {releaseDate && (
                  <MetaRow
                    label={labels.software.last_release}
                    value={<>{releaseDate}{softwareVersion && <> ({softwareVersion})</>}</>}
                  />
                )}
                {maintenanceType && (
                  <MetaRow label={labels.software.maintainance_type} value={maintenanceType} />
                )}
                {contacts.length > 0 && (
                  <MetaRow
                    label={labels.software.technical_contact}
                    value={
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.15rem' }}>
                        {contacts.map((c, i) => (
                          <div key={i} className="di-contact">
                            <span className="di-contact__name">{c.name}</span>
                            {c.affiliation && <span className="di-contact__affiliation">{c.affiliation}</span>}
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                              {c.email && <a href={`mailto:${c.email}`}>{c.email}</a>}
                              {c.phone && <a href={`tel:${c.phone}`}>{c.phone}</a>}
                            </div>
                          </div>
                        ))}
                      </div>
                    }
                  />
                )}
                {license && <MetaRow label={labels.software.license} value={license} />}
                {deployPlatforms && deployPlatforms.length > 0 && (
                  <MetaRow
                    label={labels.software.platforms}
                    value={<>{deployPlatforms.join('  \n')}</>}
                  />
                )}
                {enablingPlatforms.length > 0 && (
                  <MetaRow
                    ddClasses="mt-2 mt-md-0"
                    label={labels.software.enabling_platforms}
                    value=
                        {enablingPlatforms.map((p) => (
                          <div className="chip chip-primary">
                            <span key={p} className="chip-label">{p}</span>
                          </div>
                        ))}
                  />
                )}
                {(complianceItems.length > 0 || conformita !== undefined) && (
                  <MetaRow
                    label={labels.software.compliance}
                    value={
                      complianceItems.length > 0 ? (
                        <div className="chip chip-primary">
                          {complianceItems.map((c) => (
                            <span key={c} className="chip-label">{c}</span>
                          ))}
                        </div>
                      ) : 'Nessuna'
                    }
                  />
                )}
                {(dependsOnOpen && dependsOnOpen.length > 0) && (
                  <MetaRow
                    label={labels.software.dependencies_open}
                    value={
                      <div className="di-deps">
                        {dependsOnOpen.map((dep, i) => (
                          <div key={i} className="di-deps__item">
                            <strong>{dep.name}</strong>
                            {dep.version && <span>{dep.version}</span>}
                            {!dep.version && dep.versionMin && <span>≥ {dep.versionMin}</span>}
                            {dep.versionMax && <span>≤ {dep.versionMax}</span>}
                            {dep.optional && <span style={{ color: 'var(--di-muted)' }}>({labels.software.optional})</span>}
                          </div>
                        ))}
                      </div>
                    }
                  />
                )}
                {(dependsOnProprietary && dependsOnProprietary.length > 0) && (
                  <MetaRow
                    label={labels.software.dependencies_proprietary}
                    value={
                      <div className="di-deps">
                        {dependsOnProprietary.map((dep, i) => (
                          <div key={i} className="di-deps__item">
                            <strong>{dep.name}</strong>
                            {dep.version && <span>{dep.version}</span>}
                            {dep.optional && <span style={{ color: 'var(--di-muted)' }}>({labels.software.optional})</span>}
                          </div>
                        ))}
                      </div>
                    }
                  />
                )}
                {availableLanguages && availableLanguages.length > 0 && (
                  <MetaRow
                    label={labels.software.supported_languages}
                    value={availableLanguages.join(', ')}
                  />
                )}
                {apiDocumentation && (
                  <MetaRow
                    label={labels.software.api_documentation}
                    value={
                      <a href={apiDocumentation} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--di-blue)' }}>
                        {name} API
                      </a>
                    }
                  />
                )}
                {codiceIPA && (
                  <MetaRow label={labels.software.codice_ipa} value={codiceIPA} />
                )}
                {mainCopyrightOwner && (
                  <MetaRow label={labels.software.main_copyright_owner} value={mainCopyrightOwner} />
                )}
                {applicationSuite && (
                  <MetaRow label={labels.software.application_suite} value={applicationSuite} />
                )}
              </dl>
            </section>

            {/* vitality */}
            {typeof detail.vitalityScore === 'number' && (
              <section>
                <h2 className="">{labels.software.vitality}</h2>
                <div className="di-vitality">
                  <div className="di-vitality__bar">
                    <div
                      className="di-vitality__fill"
                      role="progressbar"
                      aria-valuenow={detail.vitalityScore}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: `${Math.min(detail.vitalityScore, 100)}%` }}
                    />
                  </div>
                  <small style={{ color: 'var(--di-muted)' }}>{detail.vitalityScore}%</small>
                </div>
              </section>
            )}

            {/* long description */}
            {longDescription && (
              <section>
                <h2 className="">{labels.software.extende_description}</h2>
                <div className="di-long-desc">
                  <Markdown>{longDescription}</Markdown>
                </div>
              </section>
            )}


            {/* contractors */}
            {contractors.length > 0 && (
              <section>
                <h2 className="">{labels.software.contractors}</h2>
                {contractors.map((c, i) => (
                  <div key={i} className="di-contact">
                    <span className="di-contact__name">{c.name}</span>
                    {c.until && <span className="di-contact__affiliation">fino al {c.until}</span>}
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </main>
    </Layout>
  );
}

// ── UsedBySection (with expand/collapse) ────────────────────────────────────
const PREVIEW_COUNT = 3;

function UsedBySection({ usedBy, labels }: { usedBy: string[]; labels: any }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? usedBy : usedBy.slice(0, PREVIEW_COUNT);
  const remaining = usedBy.length - PREVIEW_COUNT;

  return (
    <section className="di-usedby">
      <h3>
        {labels.software.used_by}&nbsp;
        <span>{usedBy.length} amministrazioni</span>
      </h3>
      <ul className="di-usedby__list">
        {visible.map((org, i) => (
          <li key={i}>{org}</li>
        ))}
      </ul>
      {usedBy.length > PREVIEW_COUNT && (
        <button
          className="di-usedby__toggle"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded
            ? 'Mostra meno'
            : `e altre ${remaining}`}
        </button>
      )}
    </section>
  );
}

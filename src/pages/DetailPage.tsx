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
    if (hostname === 'github.com') {
      return `https://raw.githubusercontent.com${repo.pathname}/HEAD/${url}`;
    }
    if (hostname === 'bitbucket.org') {
      return `https://bitbucket.org${repo.pathname}/raw/HEAD/${url}`;
    }
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

export function DetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [detail, setDetail] = useState<SoftwareDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  let logo = desc?.screenshots?.[0] ?? detail.publiccode.logo ?? fallback;
  if (/github/.test(logo) && /\.svg$/.test(logo)) {
    logo += '?sanitize=true';
  }

  const repoOwner = detail.publiccode.legal?.repoOwner;
  const mainCopyrightOwner = detail.publiccode.legal?.mainCopyrightOwner;
  const license = detail.publiccode.legal?.license;
  const maintenanceType = detail.publiccode.maintenance?.type;
  const contacts = detail.publiccode.maintenance?.contacts ?? [];
  const contractors = detail.publiccode.maintenance?.contractors ?? [];
  const devStatus = detail.publiccode.developmentStatus;
  const releaseDate = detail.publiccode.releaseDate;
  const softwareType = detail.publiccode.softwareType;
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
  const codeURL = detail.publiccode.url;
  const docURL = desc?.documentation;
  const availableLanguages = detail.publiccode.localisation?.availableLanguages;
  const localisationReady = detail.publiccode.localisation?.localisationReady;
  const piattaforme = detail.publiccode.it?.piattaforme ?? detail.publiccode.IT?.piattaforme;
  const conformita = detail.publiccode.it?.conforme ?? detail.publiccode.IT?.conforme;
  const dependsOnOpen = detail.publiccode.dependsOn?.open;
  const dependsOnProprietary = detail.publiccode.dependsOn?.proprietary;
  const publiccodeYmlVersion = detail.publiccode.publiccodeYmlVersion;
  const organisation = detail.publiccode.organisation;
  const codiceIPA = detail.publiccode.it?.riuso?.codiceIPA ?? detail.publiccode.IT?.riuso?.codiceIPA;
  const codiceIPALabel = detail['it-riuso-codiceIPA-label'];

  return (
    <article className="container" style={{ marginTop: '2.5rem', marginBottom: '6rem' }}>
      <div className="mb-4">
        <Link to="/" className="btn btn-primary">
          &larr; {labels.software.back_to_catalogue}
        </Link>
      </div>

      <div className="row">
        {/* Left: image + links */}
        <div className="col-12 col-lg-4 mb-4">
          <div className="ratio ratio-16x9 mb-3">
            <figure className="figure img-full">
              <ImageWithPlaceholder placeholder={fallback} alt={'Logo ' + name} img={logo} />
            </figure>
          </div>

          <div className="d-flex flex-column gap-2">
            {landingURL && (
              <a href={landingURL} target="_blank" rel="noopener noreferrer">
                {labels.software.goToLandingUrl}
              </a>
            )}
            {codeURL && (
              <a href={codeURL} target="_blank" rel="noopener noreferrer">
                {labels.software.goToCode}
              </a>
            )}
            {docURL && (
              <a href={docURL} target="_blank" rel="noopener noreferrer">
                {labels.software.goToDocumentation}
              </a>
            )}
            {apiDocumentation && (
              <a href={apiDocumentation} target="_blank" rel="noopener noreferrer">
                {labels.software.api_documentation}
              </a>
            )}
            {roadmap && (
              <a href={roadmap} target="_blank" rel="noopener noreferrer">
                {labels.software.roadmap}
              </a>
            )}
          </div>

          {/* Screenshots gallery */}
          {desc?.screenshots && desc.screenshots.length > 1 && (
            <div className="mt-3">
              <div className="row g-2">
                {desc.screenshots.slice(1, 5).map((src, i) => (
                  <div key={i} className="col-6">
                    <img src={src} alt={`Screenshot ${i + 2}`} className="img-fluid rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: details */}
        <div className="col-12 col-lg-8">
          <h1>{name}</h1>
          {desc?.shortDescription && <p className="lead">{desc.shortDescription}</p>}

          {repoOwner && (
            <p>
              <strong>{labels.software.published_by}:</strong> {repoOwner}
            </p>
          )}

          {/* Key info */}
          <div className="row mb-4">
            {devStatus && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.development_status}</small>
                <span>{developmentStatusLabels[devStatus] ?? devStatus}</span>
              </div>
            )}
            {releaseDate && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.last_release}</small>
                <span>{releaseDate}</span>
              </div>
            )}
            {softwareVersion && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.software_version}</small>
                <span>{softwareVersion}</span>
              </div>
            )}
            {license && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.license}</small>
                <span>{license}</span>
              </div>
            )}
            {maintenanceType && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.maintainance_type}</small>
                <span>{maintenanceType}</span>
              </div>
            )}
            {softwareType && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.software_type}</small>
                <span>{softwareType}</span>
              </div>
            )}
            {applicationSuite && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.application_suite}</small>
                <span>{applicationSuite}</span>
              </div>
            )}
            {mainCopyrightOwner && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.main_copyright_owner}</small>
                <span>{mainCopyrightOwner}</span>
              </div>
            )}
            {(organisation?.name || codiceIPALabel) && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.managing_organisation}</small>
                <span>{codiceIPALabel ?? organisation?.name}</span>
              </div>
            )}
            {codiceIPA && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.codice_ipa}</small>
                <span>{codiceIPA}</span>
              </div>
            )}
            {publiccodeYmlVersion && (
              <div className="col-6 col-md-3 mb-2">
                <small className="text-muted d-block">{labels.software.publiccode_version}</small>
                <span>{publiccodeYmlVersion}</span>
              </div>
            )}
          </div>

          {typeof detail.vitalityScore === 'number' && (
            <div className="mb-3">
              <small className="text-muted d-block">{labels.software.vitality}</small>
              <div className="progress" style={{ height: 8 }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${Math.min(detail.vitalityScore, 100)}%` }}
                />
              </div>
              <small>{detail.vitalityScore}%</small>
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-4">
              <h4>{labels.software.functionality}</h4>
              <ul>
                {features.map((f, i) => (
                  <li key={i}><Markdown components={{ p: ({ children }) => <>{children}</> }}>{f}</Markdown></li>
                ))}
              </ul>
            </div>
          )}

          {/* Long description */}
          {longDescription && (
            <div className="mb-4">
              <h4>{labels.software.extende_description}</h4>
              <Markdown>{longDescription}</Markdown>
            </div>
          )}

          {/* Contacts */}
          {contacts.length > 0 && (
            <div className="mb-4">
              <h4>
                {contacts.length === 1
                  ? labels.software.technical_contact
                  : labels.software.technical_contacts}
              </h4>
              {contacts.map((c, i) => (
                <div key={i} className="mb-2">
                  <span>{c.name}</span>
                  {c.affiliation && (
                    <span className="text-muted"> — {c.affiliation}</span>
                  )}
                  {c.email && (
                    <>
                      {' - '}
                      <a href={`mailto:${c.email}`}>{c.email}</a>
                    </>
                  )}
                  {c.phone && (
                    <>
                      {' - '}
                      <a href={`tel:${c.phone}`}>{c.phone}</a>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {availableLanguages && availableLanguages.length > 0 && (
            <div className="mb-4">
              <h4>{labels.software.supported_languages}</h4>
              <p>{availableLanguages.join(', ')}</p>
            </div>
          )}

          {/* Localisation ready */}
          {typeof localisationReady === 'boolean' && (
            <div className="mb-4">
              <h4>{labels.software.localisation_ready}</h4>
              <p>{localisationReady ? labels.software.localisation_ready_yes : labels.software.localisation_ready_no}</p>
            </div>
          )}

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="mb-4">
              <h4>{labels.software.categories}</h4>
              <div className="d-flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span key={cat} className="badge bg-secondary">
                    {categoryLabels[cat] ?? cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Intended audience */}
          {intendedAudience?.scope && intendedAudience.scope.length > 0 && (
            <div className="mb-4">
              <h4>{labels.software.intended_audience}</h4>
              <div className="d-flex flex-wrap gap-2">
                {intendedAudience.scope.map((s) => (
                  <span key={s} className="badge bg-secondary">
                    {scopeLabels[s] ?? s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Platforms */}
          {deployPlatforms && deployPlatforms.length > 0 && (
            <div className="mb-4">
              <h4>{labels.software.platforms}</h4>
              <div className="d-flex flex-wrap gap-2">
                {deployPlatforms.map((p) => (
                  <span key={p} className="badge bg-info text-dark">{p}</span>
                ))}
              </div>
            </div>
          )}

          {/* Enabling platforms */}
          {piattaforme && (
            <div className="mb-4">
              <h4>{labels.software.enabling_platforms}</h4>
              <div className="d-flex flex-wrap gap-2">
                {piattaforme.spid && <span className="badge bg-primary">SPID</span>}
                {piattaforme.cie && <span className="badge bg-primary">CIE</span>}
                {piattaforme.anpr && <span className="badge bg-primary">ANPR</span>}
                {piattaforme.pagopa && <span className="badge bg-primary">pagoPA</span>}
                {piattaforme.io && <span className="badge bg-primary">App IO</span>}
              </div>
            </div>
          )}

          {/* Compliance */}
          {conformita && (
            <div className="mb-4">
              <h4>{labels.software.compliance}</h4>
              <div className="d-flex flex-wrap gap-2">
                {conformita.lineeGuidaDesign && <span className="badge bg-success">Linee Guida Design</span>}
                {conformita.misureMinimeSicurezza && <span className="badge bg-success">Misure Minime Sicurezza</span>}
                {conformita.modelloInteroperabilita && <span className="badge bg-success">Modello Interoperabilità</span>}
                {conformita.gdpr && <span className="badge bg-success">GDPR</span>}
              </div>
            </div>
          )}

          {/* Dependencies */}
          {dependsOnOpen && dependsOnOpen.length > 0 && (
            <div className="mb-4">
              <h4>{labels.software.dependencies_open}</h4>
              <ul className="list-unstyled">
                {dependsOnOpen.map((dep, i) => (
                  <li key={i}>
                    <strong>{dep.name}</strong>
                    {dep.version && <span> {dep.version}</span>}
                    {!dep.version && dep.versionMin && <span> &ge; {dep.versionMin}</span>}
                    {dep.versionMax && <span> &le; {dep.versionMax}</span>}
                    {dep.optional && <span className="text-muted"> ({labels.software.optional})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {dependsOnProprietary && dependsOnProprietary.length > 0 && (
            <div className="mb-4">
              <h4>{labels.software.dependencies_proprietary}</h4>
              <ul className="list-unstyled">
                {dependsOnProprietary.map((dep, i) => (
                  <li key={i}>
                    <strong>{dep.name}</strong>
                    {dep.version && <span> {dep.version}</span>}
                    {!dep.version && dep.versionMin && <span> &ge; {dep.versionMin}</span>}
                    {dep.versionMax && <span> &le; {dep.versionMax}</span>}
                    {dep.optional && <span className="text-muted"> ({labels.software.optional})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contractors */}
          {contractors.length > 0 && (
            <div className="mb-4">
              <h4>{labels.software.contractors}</h4>
              {contractors.map((c, i) => (
                <div key={i} className="mb-1">
                  <span>{c.name}</span>
                  {c.until && <span className="text-muted"> (fino al {c.until})</span>}
                </div>
              ))}
            </div>
          )}

          {/* Used by */}
          {usedBy && usedBy.length > 0 && (
            <div className="mb-4">
              <h4>
                {labels.software.used_by}{' '}
                <span className="badge bg-secondary">{usedBy.length} {labels.software.used_by_count}</span>
              </h4>
              <details>
                <summary>{usedBy.slice(0, 3).join(', ')}{usedBy.length > 3 ? ` e altre ${usedBy.length - 3}` : ''}</summary>
                <ul className="mt-2">
                  {usedBy.map((org, i) => (
                    <li key={i}>{org}</li>
                  ))}
                </ul>
              </details>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

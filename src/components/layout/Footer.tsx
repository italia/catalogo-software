export default function () {
  return (<div>
    <footer className="it-footer">
      <div className="footer-brand it-footer-small-prints pt-5 pb-4 text-white">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center text-md-start">
              <div className="small mb-4"><p>Il Dipartimento per la trasformazione digitale coordina l'attuazione delle misure digitali del PNRR, finanziato dall'Unione europea (NextGenerationEU)</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ul className="logos list-unstyled d-flex flex-column flex-md-row flex-wrap align-items-center mb-0">
                <li className="mb-4 me-md-5">
                  <a href="https://commission.europa.eu/index_it" target="_blank" rel="noreferrer" className="d-block h6 fw-semibold text-decoration-none d-flex align-items-center">
                    <img src="/assets/logo/logo_finanziato_nextgeneu-05.svg" title="" alt="Apre in un nuovo tab" sizes="(max-width: 480px) 466px, (max-width: 1024px) 720px, 928px" loading="lazy" decoding="async" fetchPriority="auto" width="275" height="40" />
                  </a>
                </li><li className="mb-4 me-md-5">
                  <a href="https://innovazione.gov.it/dipartimento/" target="_blank" rel="noreferrer" className="d-block h6 fw-semibold text-decoration-none d-flex align-items-center">
                    <img src="/assets/logo/dtd.svg" title="" alt="Apre in un nuovo tab" sizes="(max-width: 480px) 466px, (max-width: 1024px) 720px, 928px" loading="lazy" decoding="async" fetchPriority="auto" width="275" height="40" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="it-footer-main" id="footer">
        <div className="container">
          <section className="px-0">
            <div className="row">
              <div className="col-12 py-4">  <ul className="it-footer-small-prints-list list-inline mb-0 d-flex flex-wrap flex-md-row">  </ul>
              </div>
            </div>
          </section>
          <section className="py-4 px-0">
            <div className="row">
              <div className="col-12 ">
                <p className="h4 pb-4">Community</p>
                <ul className="list-inline mb-0 d-flex flex-column flex-md-row">

                  <li className="list-inline-item me-4 mb-2">
                    <a href="https://forum.italia.it/" className="list-item left-icon d-inline-flex align-items-center" target="_blank" rel="noreferrer" aria-label="Apre in un nuovo tab">
                      <span>Forum Italia</span>
                      <svg className="ms-2 icon icon-sm icon-white" aria-hidden="true">
                        <use fill="#fff" href="/sprites.svg#it-external-link" xlinkHref="/sprites.svg#it-external-link"></use>
                      </svg>
                      <span className="visually-hidden">Apre in un nuovo tab</span>
                    </a>

                  </li>
                  <li className="list-inline-item me-4 mb-2">
                    <a href="https://slack.developers.italia.it/" className="list-item left-icon d-inline-flex align-items-center" target="_blank" rel="noreferrer" aria-label="Apre in un nuovo tab">
                      <span>Slack</span>
                      <svg className="ms-2 icon icon-sm icon-white" aria-hidden="true">
                        <use fill="#fff" href="/sprites.svg#it-external-link" xlinkHref="/sprites.svg#it-external-link"></use>
                      </svg>
                      <span className="visually-hidden">Apre in un nuovo tab</span>
                    </a>
                  </li><li className="list-inline-item me-4 mb-2">
                    <a href="https://github.com/italia" className="list-item left-icon d-inline-flex align-items-center" target="_blank" rel="noreferrer" aria-label="Apre in un nuovo tab">
                      <span>Github</span>
                      <svg className="ms-2 icon icon-sm icon-white" aria-hidden="true">
                        <use fill="#fff" href="/sprites.svg#it-external-link" xlinkHref="/sprites.svg#it-external-link"></use>
                      </svg>
                      <span className="visually-hidden">Apre in un nuovo tab</span>
                    </a>
                  </li>
                  <li className="d-none d-lg-block border-end border-white ms-2 me-4" style={{ height: "24px", alignSelf: "center" }}></li>
                  <li className="d-lg-none d-block border-bottom border-white mx-2 my-3 my-lg-0" style={{ width: "100%", alignSelf: "center" }}></li>
                  <li className="list-inline-item me-4 mb-2">
                    <a href="https://innovazione.gov.it" target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-2">
                      <span>innovazione.gov</span>
                      <svg className="icon icon-sm icon-white" aria-hidden="true">
                        <use fill="#fff" href="/sprites.svg#it-external-link" xlinkHref="/sprites.svg#it-external-link"></use>
                      </svg>
                      <span className="visually-hidden">Apre in un nuovo tab</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div >

      <div className="it-footer-small-prints clearfix">
        <div className="container">
          <p className="visually-hidden">Sezione link utili</p>
          <ul className="it-footer-small-prints-list list-inline mb-0 d-flex flex-column flex-md-row px-0">
            {/*
            <li className="list-inline-item d-flex align-items-center gap-2">
              <a href="/it/privacy-policy" target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-2">
                <span>Privacy policy</span>   </a>
            </li>
            <li className="list-inline-item d-flex align-items-center gap-2">
              <a href="/it/note-legali" target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-2">
                <span>Note legali</span>   </a>
            </li>
            <li className="list-inline-item d-flex align-items-center gap-2">
              <a href=" https://form.agid.gov.it/PCM/Risultati_PNRR/dichiarazione" target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-2">
                <span>Dichiarazione di accessibilità</span>  <svg className="icon icon-sm icon-white" aria-hidden="true">  <use href="/sprites.svg#it-external-link" xlink:href="/sprites.svg#it-external-link"></use>
                </svg>
                <span className="visually-hidden">Apre in un nuovo tab</span>   </a>
            </li> */}
          </ul>
        </div>
      </div>
    </footer>
  </div >)
}

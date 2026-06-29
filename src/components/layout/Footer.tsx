export default function () {
  return (<div>
    <footer className="it-footer">
      <div className="it-footer-main">
        <div className="container">
          <section className="pb-4">
            <div className="row clearfix">
              <div className="col-sm-12">
                <div className="it-brand-wrapper">
                  <a href="#" data-focus-mouse="false">
                    <svg className="icon"><use href="/sprites.svg#it-pa"></use></svg>
                    <div className="it-brand-text">
                      <h2>Nome Ente</h2>
                      <h3>Tagline</h3>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-4 border-white border-top">
            <div className="row">
              <div className="col-lg-8 col-md-8 mt-2">
                <h4>Contatti</h4>
                <p>
                  <strong>Nome Ente</strong>
                  Via Roma 0 - 00000 Città - Codice fiscale / P. IVA: 000000000
                </p>
                <div className="link-list-wrapper">
                  <ul className="footer-list link-list clearfix">
                    <li><a className="list-item" href="#">Posta Elettronica Certificata</a></li>
                    <li>
                      <a className="list-item" href="#">URP - Ufficio Relazioni con il Pubblico</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mt-2">
                <div className="pb-2">
                  <h4>Seguici su</h4>
                  <ul className="list-inline text-left social">
                    <li className="list-inline-item">
                      <a className="p-2 text-white" href="#"><svg className="icon icon-sm icon-inverse align-top"><use href="/sprites.svg#it-designers-italia"></use></svg><span className="visually-hidden">Designers Italia (link esterno)</span></a>
                    </li>
                    <li className="list-inline-item">
                      <a className="p-2 text-white" href="#"><svg className="icon icon-sm icon-inverse align-top"><use href="/sprites.svg#it-twitter"></use></svg><span className="visually-hidden">X (link esterno)</span></a>
                    </li>
                    <li className="list-inline-item">
                      <a className="p-2 text-white" href="#"><svg className="icon icon-sm icon-inverse align-top"><use href="/sprites.svg#it-medium"></use></svg><span className="visually-hidden">Medium (link esterno)</span></a>
                    </li>
                    <li className="list-inline-item">
                      <a className="p-2 text-white" href="#"><svg className="icon icon-sm icon-inverse align-top"><use href="/sprites.svg#it-behance"></use></svg><span className="visually-hidden">Behance (link esterno)</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="col-lg-4 col-md-4 mt-2">
                <h4>Newsletter</h4>
                <div className="form-group d-flex gap-1">
                  <input type="text" className="form-control form-control-sm" id="exampleFormGroup2" placeholder="Inserisci la tua email" aria-label="Inserisci la tua email" />
                  <button type="submit" className="btn btn-primary">Iscriviti</button>
                </div>
              </div> */}
            </div>
          </section>
        </div>
      </div>
      <div className="it-footer-small-prints clearfix">
        <div className="container">
          <h3 className="visually-hidden">Sezione Link Utili</h3>
          <ul className="it-footer-small-prints-list list-inline mb-0 d-flex flex-column flex-md-row">
            <li className="list-inline-item"><a href="#">Media policy</a></li>
            <li className="list-inline-item"><a href="#">Note legali</a></li>
            <li className="list-inline-item"><a href="#">Privacy policy</a></li>
            <li className="list-inline-item"><a href="#">Mappa del sito</a></li>
            <li className="list-inline-item"><a href="https://form.agid.gov.it/view/xyz">Dichiarazione di accessibilità <span className="visually-hidden">(link esterno su sito AgID)</span></a></li>
          </ul>
        </div>
      </div>
    </footer>

  </div>)
}

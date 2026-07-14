export default function () {
  return (<div>

    <header className="it-header-wrapper">
      <div className="it-header-slim-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="it-header-slim-wrapper-content">
                <div className="navbar-brand" >
                  <a className="navbar-brand" href="https://innovazione.gov.it/dipartimento/" target="_blank" rel="noopener">Dipartimento per la trasformazione digitale<span className="visually-hidden"> Apre in un nuovo tab</span></a>
                  <span className="mx-2" aria-hidden="true">+</span>
                  <a className="navbar-brand" href="https://www.agid.gov.it/it" target="_blank" rel="noopener"> Agenzia per l'Italia digitale <span className="visually-hidden"> Apre in un nuovo tab</span> </a>
                </div>

                <div className="it-header-slim-right-zone" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="it-nav-wrapper">
        <div className="it-header-center-wrapper">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="it-header-center-content-wrapper">
                  <div className="it-brand-wrapper">
                    <a href="/">
                      <img src="/logo-dtd-white.svg" alt="" className="it-brand-logo" height="50" />
                      <div className="it-brand-text">
                        <h1 className="it-brand-title">Catalogo del software</h1>
                      </div>
                    </a>
                  </div>
                  <div className="it-right-zone" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="it-header-navbar-wrapper">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">

                <nav className="navbar navbar-expand-lg has-megamenu" aria-label="Navigazione principale">
                  <button className="custom-navbar-toggler" type="button" aria-controls="navC1" aria-label="Mostra/Nascondi la navigazione" data-bs-toggle="navbarcollapsible" data-bs-target="#navC1">
                    <svg className="icon">
                      <use href="/sprites.svg#it-burger"></use>
                    </svg>
                  </button>
                  <div className="navbar-collapsable" id="navC1"  >
                    <div className="close-div">
                      <button className="btn close-menu" type="button">
                        <span className="visually-hidden">Nascondi la navigazione</span>
                        <svg className="icon">
                          <use href="/sprites.svg#it-close-big"></use>
                        </svg>
                      </button>
                    </div>
                    {/* <div className="menu-wrapper">
                      <ul className="navbar-nav">
                        <li className="nav-item active"><a className="nav-link active" href="#" aria-current="page"><span>Link 1 (attivo)</span></a></li>
                        <li className="nav-item"><a className="nav-link disabled" href="#" aria-disabled="true"><span>Link 2 (disabilitato)</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="#"><span>Link 3</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="#"><span>Link 4</span></a></li>
                      </ul>
                    </div> */}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>)
}

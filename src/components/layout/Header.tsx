export default function () {
  return (<div>
    <header className="it-header-wrapper">
      <div className="it-header-slim-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="it-header-slim-wrapper-content">
                <a className="d-none d-lg-block navbar-brand" href="#">Ente appartenenza</a>
                <div className="nav-mobile">
                  <nav aria-label="Navigazione secondaria">
                    <a className="it-opener d-lg-none" data-bs-toggle="collapse" href="#menuC1" role="button" aria-expanded="false" aria-controls="menuC1">
                      <span>Ente appartenenza</span>
                      <svg className="icon" aria-hidden="true"><use href="/sprites.svg#it-expand"></use></svg>
                    </a>
                    <div className="link-list-wrapper collapse" id="menuC1">
                      <ul className="link-list">
                        <li><a className="dropdown-item list-item" href="#">Link 1</a></li>
                        <li><a className="list-item active" href="#" aria-current="page">Link 2 (Attivo)</a></li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="it-header-slim-right-zone">
                  <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="visually-hidden">Selezione lingua: lingua selezionata</span>
                      <span>ITA</span>
                      <svg className="icon d-none d-lg-block"><use href="/sprites.svg#it-expand"></use></svg>
                    </a>
                    <div className="dropdown-menu">
                      <div className="row">
                        <div className="col-12">
                          <div className="link-list-wrapper">
                            <ul className="link-list">
                              <li><a className="dropdown-item list-item" href="#"><span>ITA <span className="visually-hidden">selezionata</span></span></a></li>
                              <li><a className="dropdown-item list-item" href="#"><span>ENG</span></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="it-access-top-wrapper">
                    <a className="btn btn-primary btn-sm" href="#">Accedi</a>
                  </div>
                </div>
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
                    <a href="#">
                      <svg className="icon" aria-hidden="true"><use href="/sprites.svg#it-pa"></use></svg>
                      <div className="it-brand-text">
                        <div className="it-brand-title">Nome dell'Istituzione</div>
                        <div className="it-brand-tagline d-none d-md-block">Tag line dell'Istituzione</div>
                      </div>
                    </a>
                  </div>
                  <div className="it-right-zone">
                    <div className="it-socials d-none d-md-flex">
                      <span>Seguici su</span>
                      <ul>
                        <li>
                          <a href="#" aria-label="Facebook" target="_blank">
                            <svg className="icon"><use href="/sprites.svg#it-facebook"></use></svg>
                          </a>
                        </li>
                        <li>
                          <a href="#" aria-label="Github" target="_blank">
                            <svg className="icon"><use href="/sprites.svg#it-github"></use></svg>
                          </a>
                        </li>
                        <li>
                          <a href="#" aria-label="Twitter" target="_blank">
                            <svg className="icon"><use href="/sprites.svg#it-twitter"></use></svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="it-search-wrapper">
                      <span className="d-none d-md-block">Cerca</span>
                      <a className="search-link rounded-icon" aria-label="Cerca nel sito" href="#">
                        <svg className="icon"><use href="/sprites.svg#it-search"></use></svg>
                      </a>
                    </div>
                  </div>
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
                  <div className="navbar-collapsable" id="navC1" tabindex="-1">
                    <div className="close-div">
                      <button className="btn close-menu" type="button">
                        <span className="visually-hidden">Nascondi la navigazione</span>
                        <svg className="icon">
                          <use href="/sprites.svg#it-close-big"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="menu-wrapper">
                      <ul className="navbar-nav">
                        <li className="nav-item active"><a className="nav-link active" href="#" aria-current="page"><span>Link 1 (attivo)</span></a></li>
                        <li className="nav-item"><a className="nav-link disabled" href="#" aria-disabled="true"><span>Link 2 (disabilitato)</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="#"><span>Link 3</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="#"><span>Link 4</span></a></li>
                      </ul>
                    </div>
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

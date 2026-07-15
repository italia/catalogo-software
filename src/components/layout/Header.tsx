export default function () {
  return (
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
                  <svg className="icon" aria-hidden="true"><use href="/dist/svg/sprites.svg#it-expand"></use></svg>
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
                  <svg className="icon d-none d-lg-block"><use href="/dist/svg/sprites.svg#it-expand"></use></svg>
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
                <a className="btn btn-primary btn-xs" href="#">Accedi</a>
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
                  <svg className="icon" aria-hidden="true"><use href="/dist/svg/sprites.svg#it-pa"></use></svg>
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
                        <svg className="icon"><use href="/dist/svg/sprites.svg#it-facebook"></use></svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="Github" target="_blank">
                        <svg className="icon"><use href="/dist/svg/sprites.svg#it-github"></use></svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" aria-label="Twitter" target="_blank">
                        <svg className="icon"><use href="/dist/svg/sprites.svg#it-twitter"></use></svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="it-search-wrapper">
                  <span className="d-none d-md-block">Cerca</span>
                  <a className="search-link rounded-icon" aria-label="Cerca nel sito" href="#">
                    <svg className="icon"><use href="/dist/svg/sprites.svg#it-search"></use></svg>
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
            <nav className="navbar navbar-expand-lg" aria-label="Navigazione principale">
              <button className="custom-navbar-toggler" type="button" aria-controls="navC1" aria-label="Mostra/Nascondi la navigazione" data-bs-toggle="navbarcollapsible" data-bs-target="#navC1">
                <svg className="icon">
                  <use href="/dist/svg/sprites.svg#it-burger"></use>
                </svg>
              </button>
              <div className="navbar-collapsable" id="navC1">
                <div className="close-div">
                  <button className="btn close-menu" type="button">
                    <span className="visually-hidden">Nascondi la navigazione</span>
                    <svg className="icon">
                      <use href="/dist/svg/sprites.svg#it-close-big"></use>
                    </svg>
                  </button>
                </div>
                <div className="menu-wrapper">
                  <ul className="navbar-nav">
                    <li className="nav-item active"><a className="nav-link active" href="#" aria-current="page"><span>Link attivo</span></a></li>
                    <li className="nav-item"><a className="nav-link disabled" href="#" aria-disabled="true"><span>Link disabilitato</span></a></li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="mainNavDropdownC1">
                        <span>Dropdown</span>
                        <svg className="icon icon-xs">
                          <use href="/dist/svg/sprites.svg#it-expand"></use>
                        </svg>
                      </a>
                      <div className="dropdown-menu" role="region" aria-labelledby="mainNavDropdownC1">
                        <div className="link-list-wrapper">
                          <ul className="link-list">
                            <li><a className="dropdown-item list-item" href="#"><span>Link lista 1</span></a></li>
                            <li><a className="dropdown-item list-item" href="#"><span>Link lista 2</span></a></li>
                            <li><a className="dropdown-item list-item" href="#"><span>Link lista 3</span></a></li>
                            <li><span className="divider"></span></li>
                            <li><a className="dropdown-item list-item" href="#"><span>Link lista 4</span></a></li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown megamenu">
                      <button type="button" className="nav-link dropdown-toggle px-lg-2 px-xl-3" data-bs-toggle="dropdown" aria-expanded="false" id="megamenu-5" data-focus-mouse="false">
                          <span>Megamenu</span><svg role="img" className="icon icon-xs"><use href="/dist/svg/sprites.svg#it-expand"></use></svg>
                      </button>
                      <div className="dropdown-menu shadow-lg" role="region" aria-labelledby="megamenu-5">
                        <div className="megamenu-content">
                          <div className="row">
                            <div className="col-xs-12 col-lg-4 px-0">
                              <div className="row">
                                <div className="col-12 it-vertical it-description pb-lg-3">
                                  <div className="description-content px-4 ps-sm-5 ms-3">
                                    <div className="ratio ratio-21x9 lightgrey-bg-a1 mb-4 rounded">
                                      <figure className="figure">
                                        <img src="https://placehold.co/560x240/ebebeb/808080/?text=Immagine" className="figure-img img-fluid rounded" alt="Segnaposto" />
                                      </figure>
                                    </div>
                                    <p>
                                      Testo utile a fornire una descrizione dei contenuti della sezione <strong>megamenu</strong>.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-8">
                              <div className="it-heading-link-wrapper">
                                <a className="it-heading-link" href="#"><svg role="img" className="icon icon-sm me-2 mb-1"><use href="/dist/svg/sprites.svg#it-arrow-right-triangle"></use></svg>
                                <span>Esplora la sezione megamenu</span>
                                </a>
                              </div>
                              <div className="row">
                                <div className="col-12 col-lg-6">
                                  <div className="link-list-wrapper">
                                    <ul className="link-list">
                                      <li>
                                        <a className="list-item dropdown-item" href="#">
                                          <svg role="img" className="icon icon-sm me-2"><use href="/dist/svg/sprites.svg#it-arrow-right-triangle"></use></svg>
                                          <span>Link lista 1</span>
                                        </a>
                                      </li>
                                      <li>
                                        <a className="list-item dropdown-item" href="#">
                                          <svg role="img" className="icon icon-sm me-2"><use href="/dist/svg/sprites.svg#it-arrow-right-triangle"></use></svg>
                                          <span>Link lista 2</span>
                                        </a>
                                      </li>
                                      <li>
                                        <a className="list-item dropdown-item " href="#">
                                          <svg role="img" className="icon icon-sm me-2"><use href="/dist/svg/sprites.svg#it-arrow-right-triangle"></use></svg>
                                          <span>Link lista 3</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                  <div className="link-list-wrapper">
                                    <ul className="link-list">
                                      <li>
                                        <a className="list-item dropdown-item" href="#">
                                          <svg role="img" className="icon icon-sm me-2"><use href="/dist/svg/sprites.svg#it-arrow-right-triangle"></use></svg>
                                          <span>Link lista 4</span>
                                        </a>
                                      </li>
                                      <li>
                                        <a className="list-item dropdown-item" href="#">
                                          <svg role="img" className="icon icon-sm me-2"><use href="/dist/svg/sprites.svg#it-arrow-right-triangle"></use></svg>
                                          <span>Link lista 5</span>
                                        </a>
                                      </li>
                                      <li>
                                        <a className="list-item dropdown-item " href="#">
                                          <svg role="img" className="icon icon-sm me-2"><use href="/dist/svg/sprites.svg#it-arrow-right-triangle"></use></svg>
                                          <span>Link lista 6</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
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
  )
}

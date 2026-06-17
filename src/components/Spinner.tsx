export function Spinner() {
  return (
    <div className="d-flex justify-content-center py-5">
      <div className="progress-spinner progress-spinner-active">
        <span className="visually-hidden">Caricamento...</span>
      </div>
    </div>
  );
}

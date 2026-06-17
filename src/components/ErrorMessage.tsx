import { labels } from '../utils/i18n';

interface Props {
  description?: string | null;
}

export function ErrorMessage({ description }: Props) {
  return (
    <div
      className="d-flex flex-column align-items-center h-100 justify-content-center"
      data-testid="error-something-went-wrong"
    >
      <h3 className="mt-4">{labels.errors.something_went_wrong}</h3>
      {description && <div style={{ opacity: 0.8 }}>{description}</div>}
    </div>
  );
}

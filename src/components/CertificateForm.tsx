import { CertificateData, CertificateStatus } from '../types/certificate';

interface Props {
  certificate: CertificateData;
  errors: Record<string, string>;
  suggestedCertificateNo: string;
  showMoreData: boolean;
  onToggleMoreData: () => void;
  onApplyNextCertificateNo: () => void;
  onChange: (field: keyof CertificateData, value: string) => void;
  onGenerate: () => void;
  onReset: () => void;
}

const statusOptions: CertificateStatus[] = ['VALID', 'EXPIRED', 'REVOKED', 'PENDING'];

export function CertificateForm({
  certificate,
  errors,
  suggestedCertificateNo,
  showMoreData,
  onToggleMoreData,
  onApplyNextCertificateNo,
  onChange,
  onGenerate,
  onReset,
}: Props) {
  return (
    <section className="form-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Certificate Details</p>
          <h1>QR Certificate Generator</h1>
        </div>
        <button type="button" className="ghost-button" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="field-grid">
        <label>
          <span>Certificate Number</span>
          <input
            value={certificate.certificateNo}
            onChange={(event) => onChange('certificateNo', event.target.value)}
            placeholder="CERT-00125"
          />
          {suggestedCertificateNo && certificate.certificateNo.trim() && (
            <button type="button" className="link-button" onClick={onApplyNextCertificateNo}>
              Use next number: {suggestedCertificateNo}
            </button>
          )}
          {errors.certificateNo && <p className="field-error">{errors.certificateNo}</p>}
        </label>

        <label>
          <span>Name</span>
          <input
            value={certificate.name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="Ahmed Mohammed"
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </label>

        <label>
          <span>Company</span>
          <input
            value={certificate.company}
            onChange={(event) => onChange('company', event.target.value)}
            placeholder="ABC Technical LLC"
          />
          {errors.company && <p className="field-error">{errors.company}</p>}
        </label>

        <label>
          <span>Location</span>
          <input
            value={certificate.location}
            onChange={(event) => onChange('location', event.target.value)}
            placeholder="Jeddah, Saudi Arabia"
          />
          {errors.location && <p className="field-error">{errors.location}</p>}
        </label>

        <label>
          <span>Certificate Type</span>
          <input
            value={certificate.certificateType}
            onChange={(event) => onChange('certificateType', event.target.value)}
            placeholder="Inspection Certificate"
          />
          {errors.certificateType && <p className="field-error">{errors.certificateType}</p>}
        </label>

        <label>
          <span>Issue Date</span>
          <input
            type="date"
            value={certificate.issueDate}
            onChange={(event) => onChange('issueDate', event.target.value)}
          />
          {errors.issueDate && <p className="field-error">{errors.issueDate}</p>}
        </label>

        <label>
          <span>Expiry Date</span>
          <input
            type="date"
            value={certificate.expiryDate}
            onChange={(event) => onChange('expiryDate', event.target.value)}
          />
          {errors.expiryDate && <p className="field-error">{errors.expiryDate}</p>}
        </label>

        <label>
          <span>Status</span>
          <select
            value={certificate.status}
            onChange={(event) => onChange('status', event.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="full-width">
          <span>
            Additional Details
            <button type="button" className="link-button small-button" onClick={onToggleMoreData}>
              {showMoreData ? 'Hide extra data' : 'Add more data'}
            </button>
          </span>
          <textarea
            value={certificate.additionalDetails}
            onChange={(event) => onChange('additionalDetails', event.target.value)}
            rows={showMoreData ? 5 : 2}
            placeholder="Equipment inspected and approved."
          />
        </label>
      </div>

      <button type="button" className="primary-button" onClick={onGenerate}>
        Generate Certificate
      </button>
    </section>
  );
}

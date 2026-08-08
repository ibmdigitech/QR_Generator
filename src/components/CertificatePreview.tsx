import { CertificateData } from '../types/certificate';
import { QRCodeDisplay } from './QRCodeDisplay';
import { formatPreviewDate } from '../utils/previewDate';

interface Props {
  certificate: CertificateData;
  qrImage: string;
  qrData: string;
  isGenerated: boolean;
  showQRDebug: boolean;
  onToggleDebug: () => void;
  onCopyQRData: () => void;
}

export function CertificatePreview({
  certificate,
  qrImage,
  qrData,
  isGenerated,
  showQRDebug,
  onToggleDebug,
  onCopyQRData,
}: Props) {
  return (
    <section className="preview-panel">
      <div className="preview-header">
        <p className="eyebrow">Certificate Preview</p>
        <button type="button" className="ghost-button small-button" onClick={onToggleDebug}>
          {showQRDebug ? 'Hide QR Data' : 'Show QR Data'}
        </button>
      </div>

      <article className="certificate-card" id="certificate-card">
        <header className="certificate-top">
          <p className="certificate-label">CERTIFICATE OF</p>
          <h2>{certificate.certificateType || 'INSPECTION CERTIFICATE'}</h2>
          <p className="status-pill">Status: {certificate.status}</p>
        </header>

        <div className="certificate-body">
          <dl>
            <div className="detail-item">
              <dt>Certificate No.</dt>
              <dd>{certificate.certificateNo || 'CERT-00000'}</dd>
            </div>
            <div className="detail-item">
              <dt>Certificate Holder</dt>
              <dd>{certificate.name || 'Full Name'}</dd>
            </div>
            <div className="detail-item">
              <dt>Company</dt>
              <dd>{certificate.company || 'Organization Name'}</dd>
            </div>
            <div className="detail-item">
              <dt>Issue Date</dt>
              <dd>{formatPreviewDate(certificate.issueDate)}</dd>
            </div>
            <div className="detail-item">
              <dt>Expiry Date</dt>
              <dd>{formatPreviewDate(certificate.expiryDate)}</dd>
            </div>
            <div className="detail-item full-width">
              <dt>Additional Details</dt>
              <dd>{certificate.additionalDetails || 'Certificate details and remarks appear here.'}</dd>
            </div>
          </dl>

          <div className="certificate-qr-section">
            {isGenerated ? (
              <QRCodeDisplay qrData={qrData} qrImage={qrImage} />
            ) : (
              <div className="qr-placeholder">Generate the certificate to show the QR code.</div>
            )}
          </div>
        </div>

        <footer className="certificate-footer">
          <p>Digitally generated certificate</p>
        </footer>
      </article>

      {showQRDebug && (
        <div className="qr-debug-panel">
          <h3>QR Data Preview</h3>
          <p>The exact data encoded inside this QR:</p>
          <textarea readOnly value={qrData} className="qr-debug-textarea" />
          <button type="button" className="ghost-button" onClick={onCopyQRData}>
            Copy QR Data
          </button>
        </div>
      )}
    </section>
  );
}

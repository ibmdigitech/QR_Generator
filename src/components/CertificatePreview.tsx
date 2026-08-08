import { CertificateData } from '../types/certificate';
import { QRCodeDisplay } from './QRCodeDisplay';
import { formatPreviewDate } from '../utils/previewDate';

interface Props {
  certificate: CertificateData;
  qrImage: string;
  qrData: string;
  isGenerated: boolean;
  qrPosition: 'top' | 'bottom' | 'left' | 'right';
  showQRDebug: boolean;
  onToggleDebug: () => void;
  onCopyQRPayload: () => void;
  onCopyQRCodeImage: () => void;
}

export function CertificatePreview({
  certificate,
  qrImage,
  qrData,
  isGenerated,
  qrPosition,
  showQRDebug,
  onToggleDebug,
  onCopyQRPayload,
  onCopyQRCodeImage,
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

        <div className={`certificate-body qr-${qrPosition}`}>
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

          <div className={`certificate-qr-section qr-${qrPosition}`}>
            {isGenerated ? (
              <>
                <QRCodeDisplay qrImage={qrImage} />
                <div className="qr-actions">
                  <button type="button" className="secondary-button" onClick={onCopyQRPayload}>
                    Copy QR Data
                  </button>
                  <button type="button" className="secondary-button" onClick={onCopyQRCodeImage}>
                    Copy QR Image
                  </button>
                </div>
                <div className="qr-print-text print-only">
                  <strong>QR Payload:</strong>
                  <pre>{qrData}</pre>
                </div>
              </>
            ) : (
              <div className="qr-placeholder">
                Click "Generate Certificate" first to display the QR code and copy controls.
              </div>
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
          <div className="qr-debug-actions">
            <button type="button" className="ghost-button" onClick={onCopyQRPayload}>
              Copy QR Data
            </button>
            <button type="button" className="ghost-button" onClick={onCopyQRCodeImage}>
              Copy QR Image
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

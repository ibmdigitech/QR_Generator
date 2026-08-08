import { useEffect, useMemo, useState } from 'react';
import { CertificateForm } from './components/CertificateForm';
import { CertificatePreview } from './components/CertificatePreview';
import { ActionButtons } from './components/ActionButtons';
import {
  buildCertificateQRData,
  defaultCertificate,
  hasCertificateDataUrl,
  incrementCertificateNumber,
  isCertificateDataValid,
} from './utils/certificate';
import { generateQRCode } from './utils/qr';
import { shareCertificate } from './utils/share';
import type { CertificateData } from './types/certificate';

const STORAGE_KEY = 'qr-certificate-generator-v2';

function App() {
  const [certificate, setCertificate] = useState<CertificateData>(defaultCertificate);
  const [qrImage, setQrImage] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shareStatus, setShareStatus] = useState('');
  const [showQRDebug, setShowQRDebug] = useState(false);
  const [showMoreData, setShowMoreData] = useState(false);
  const [qrPosition, setQrPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('right');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CertificateData;
        setCertificate(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certificate));
  }, [certificate]);

  useEffect(() => {
    document.title = certificate.certificateNo?.trim()
      ? `${certificate.certificateNo} - QR Certificate`
      : 'QR Certificate Generator V2';
  }, [certificate.certificateNo]);

  const qrData = useMemo(() => buildCertificateQRData(certificate), [certificate]);
  const suggestedCertificateNo = useMemo(
    () => incrementCertificateNumber(certificate.certificateNo),
    [certificate.certificateNo],
  );

  const renderQRCode = async () => {
    if (hasCertificateDataUrl(qrData)) {
      setErrorMessage('QR must contain certificate data only. URLs are not allowed.');
      setQrImage('');
      setIsGenerated(false);
      return false;
    }

    const image = await generateQRCode(qrData);
    setQrImage(image);
    setIsGenerated(true);
    return true;
  };

  const handleChange = (field: keyof CertificateData, value: string) => {
    setCertificate((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
    setIsGenerated(false);
    setQrImage('');
  };

  const applyNextCertificateNumber = () => {
    if (!certificate.certificateNo.trim()) return;
    setCertificate((current) => ({
      ...current,
      certificateNo: incrementCertificateNumber(current.certificateNo),
    }));
    setIsGenerated(false);
    setQrImage('');
  };

  const handleGenerate = async () => {
    const fieldErrors: Record<string, string> = {};

    if (!certificate.certificateNo.trim()) fieldErrors.certificateNo = 'Certificate number is required.';
    if (!certificate.name.trim()) fieldErrors.name = 'Name is required.';
    if (!certificate.company.trim()) fieldErrors.company = 'Company is required.';
    if (!certificate.certificateType.trim()) fieldErrors.certificateType = 'Certificate type is required.';
    if (!certificate.issueDate.trim()) fieldErrors.issueDate = 'Issue date is required.';
    if (!certificate.expiryDate.trim()) fieldErrors.expiryDate = 'Expiry date is required.';

    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setErrorMessage('Please complete the required fields before generating.');
      return;
    }

    if (!isCertificateDataValid(certificate)) {
      setErrorMessage('Please complete all required fields.');
      setIsGenerated(false);
      setQrImage('');
      return;
    }

    const success = await renderQRCode();
    if (!success) return;

    setErrorMessage('Certificate generated successfully.');
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleReset = () => {
    setCertificate(defaultCertificate);
    setQrImage('');
    setIsGenerated(false);
    setErrors({});
    setErrorMessage('');
    setShareStatus('');
    setShowMoreData(false);
    setQrPosition('right');
  };

  const handleShare = async () => {
    const result = await shareCertificate(certificate);
    if (result.success && result.fallback) {
      setShareStatus('Certificate data copied successfully.');
    } else if (result.success) {
      setShareStatus('Certificate ready to share.');
    } else if (result.cancelled) {
      setShareStatus('Share dialog closed.');
    } else {
      setShareStatus(result.message || 'Unable to share certificate.');
    }
    setTimeout(() => setShareStatus(''), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyQRPayload = async () => {
    try {
      await navigator.clipboard.writeText(qrData);
      setShareStatus('QR data copied to clipboard.');
    } catch {
      setShareStatus('Failed to copy QR data.');
    }
    setTimeout(() => setShareStatus(''), 3000);
  };

  const handleCopyQRCodeImage = async () => {
    if (!qrImage) return;

    try {
      const mimeMatch = qrImage.match(/^data:(.*?);base64,/);
      const mimeType = mimeMatch?.[1] ?? 'image/png';
      const base64Data = qrImage.split(',')[1] || '';
      const binary = atob(base64Data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: mimeType });
      const ClipboardItemConstructor = (window as any).ClipboardItem;

      if (navigator.clipboard && ClipboardItemConstructor) {
        await navigator.clipboard.write([new ClipboardItemConstructor({ [mimeType]: blob })]);
        setShareStatus('QR image copied to clipboard.');
        setTimeout(() => setShareStatus(''), 3000);
        return;
      }
    } catch {
      // Fallback to copying payload text if image copy is unavailable.
    }

    await navigator.clipboard.writeText(qrData);
    setShareStatus('QR payload copied to clipboard.');
    setTimeout(() => setShareStatus(''), 3000);
  };

  return (
    <div className="app-shell">
      <main className="page-layout">
        <CertificateForm
          certificate={certificate}
          errors={errors}
          suggestedCertificateNo={suggestedCertificateNo}
          showMoreData={showMoreData}
          qrPosition={qrPosition}
          onToggleMoreData={() => setShowMoreData((current) => !current)}
          onApplyNextCertificateNo={applyNextCertificateNumber}
          onChange={handleChange}
          onChangeQRPosition={(value) => setQrPosition(value)}
          onGenerate={handleGenerate}
          onReset={handleReset}
        />

        <CertificatePreview
          certificate={certificate}
          qrImage={qrImage}
          qrData={qrData}
          isGenerated={isGenerated}
          showQRDebug={showQRDebug}
          qrPosition={qrPosition}
          onToggleDebug={() => setShowQRDebug((current) => !current)}
          onCopyQRPayload={handleCopyQRPayload}
          onCopyQRCodeImage={handleCopyQRCodeImage}
        />
      </main>

      <ActionButtons onShare={handleShare} onPrint={handlePrint} shareStatus={shareStatus} />

      {errorMessage && <div className="message-bar">{errorMessage}</div>}
    </div>
  );
}

export default App;

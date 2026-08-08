import { CertificateData } from '../types/certificate';
import { buildCertificateQRData } from './certificate';

export const shareCertificate = async (certificate: CertificateData) => {
  const shareText = buildCertificateQRData(certificate);

  if (navigator.share) {
    try {
      await navigator.share({
        title: `Certificate ${certificate.certificateNo}`,
        text: shareText,
      });
      return { success: true };
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        return { success: false, cancelled: true };
      }
      return { success: false, message: 'Share cancelled or unavailable.' };
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    return { success: true, fallback: true };
  } catch {
    return { success: false, message: 'Clipboard copy failed.' };
  }
};

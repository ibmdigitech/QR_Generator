import { CertificateData } from '../types/certificate';

const buildShareText = (certificate: CertificateData) => {
  const lines = [
    'CERTIFICATE',
    `Certificate No: ${certificate.certificateNo}`,
    `Name: ${certificate.name}`,
    `Company: ${certificate.company}`,
    `Certificate Type: ${certificate.certificateType}`,
    `Issue Date: ${certificate.issueDate}`,
    `Expiry Date: ${certificate.expiryDate}`,
    `Status: ${certificate.status}`,
  ];

  if (certificate.additionalDetails.trim()) {
    lines.push(`Additional Details: ${certificate.additionalDetails.trim()}`);
  }

  return lines.join('\n');
};

export const shareCertificate = async (certificate: CertificateData) => {
  const shareText = buildShareText(certificate);
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Certificate ${certificate.certificateNo}`,
        text: shareText,
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Share cancelled or unavailable.' };
    }
  }

  await navigator.clipboard.writeText(shareText);
  return { success: true, fallback: true };
};

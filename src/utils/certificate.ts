import { CertificateData } from '../types/certificate';

const formatDate = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const buildCertificateQRData = (certificate: CertificateData) => {
  const lines = [
    'CERTIFICATE',
    `Certificate No: ${certificate.certificateNo || ''}`,
    `Name: ${certificate.name || ''}`,
    `Company: ${certificate.company || ''}`,
    `Location: ${certificate.location || ''}`,
    `Certificate Type: ${certificate.certificateType || ''}`,
    `Issue Date: ${formatDate(certificate.issueDate)}`,
    `Expiry Date: ${formatDate(certificate.expiryDate)}`,
    `Status: ${certificate.status}`,
  ];

  if (certificate.additionalDetails.trim()) {
    lines.push(`Additional Details: ${certificate.additionalDetails.trim()}`);
  }

  return lines.join('\n');
};

export const isCertificateDataValid = (certificate: CertificateData) => {
  return (
    Boolean(certificate.certificateNo.trim()) &&
    Boolean(certificate.name.trim()) &&
    Boolean(certificate.company.trim()) &&
    Boolean(certificate.location.trim()) &&
    Boolean(certificate.certificateType.trim()) &&
    Boolean(certificate.issueDate.trim()) &&
    Boolean(certificate.expiryDate.trim())
  );
};

export const hasCertificateDataUrl = (payload: string) => {
  const lowered = payload.toLowerCase();
  return lowered.includes('http://') || lowered.includes('https://') || lowered.includes('www.');
};

export const incrementCertificateNumber = (value: string) => {
  if (!value.trim()) return '';

  const match = value.match(/^(.*?)(\d+)(\D*)$/);
  if (!match) {
    return `${value.trim()}-0001`;
  }

  const prefix = match[1];
  const digits = match[2];
  const suffix = match[3] || '';
  const nextNumber = String(Number(digits) + 1).padStart(digits.length, '0');

  return `${prefix}${nextNumber}${suffix}`;
};

export const defaultCertificate: CertificateData = {
  certificateNo: '',
  name: '',
  company: '',
  location: '',
  certificateType: '',
  issueDate: '',
  expiryDate: '',
  status: 'VALID',
  additionalDetails: '',
};

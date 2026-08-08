export type CertificateStatus = 'VALID' | 'EXPIRED' | 'REVOKED' | 'PENDING';

export interface CertificateData {
  certificateNo: string;
  name: string;
  company: string;
  location: string;
  certificateType: string;
  issueDate: string;
  expiryDate: string;
  status: CertificateStatus;
  additionalDetails: string;
}

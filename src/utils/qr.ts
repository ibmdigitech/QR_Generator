import * as QRCode from 'qrcode';

export const generateQRCode = async (text: string) => {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: 'M',
    margin: 4,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    width: 200,
  });
};

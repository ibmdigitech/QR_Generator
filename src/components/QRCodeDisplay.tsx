interface Props {
  qrImage: string;
}

export function QRCodeDisplay({ qrImage }: Props) {
  return (
    <div className="qr-panel">
      <div className="qr-container">
        <img src={qrImage} alt="Certificate QR code" className="qr-image" />
      </div>
      <p className="qr-label">Scan to view data</p>
    </div>
  );
}

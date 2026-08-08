interface Props {
  onShare: () => Promise<void>;
  onPrint: () => void;
  shareStatus: string;
}

export function ActionButtons({ onShare, onPrint, shareStatus }: Props) {
  return (
    <div className="action-row">
      <button type="button" className="secondary-button" onClick={onShare}>
        Share Certificate
      </button>
      <button type="button" className="secondary-button" onClick={onPrint}>
        Print / Save PDF
      </button>
      {shareStatus && <p className="share-status">{shareStatus}</p>}
    </div>
  );
}

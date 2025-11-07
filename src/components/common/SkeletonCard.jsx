import '../../styles/SkeletonCard.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton-shimmer"></div>
      <div className="skeleton-text">
        <div className="skeleton-line skeleton-shimmer"></div>
        <div className="skeleton-line short skeleton-shimmer"></div>
      </div>
    </div>
  );
}
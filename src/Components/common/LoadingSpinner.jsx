import '../../styles/LoadingSpinner.css';

export default function LoadingSpinner({ size = 'large' }) {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className="pokeball-spinner">
        <div className="pokeball-top"></div>
        <div className="pokeball-middle"></div>
        <div className="pokeball-bottom"></div>
        <div className="pokeball-center">
          <div className="pokeball-inner"></div>
        </div>
      </div>
      <p className="loading-text">Loading Pokémon...</p>
    </div>
  );
}
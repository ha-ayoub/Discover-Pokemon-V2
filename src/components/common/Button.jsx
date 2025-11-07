export default function Button({ label, onClick, disabled = false, variant = 'primary' }) {
  return (
    <button 
      onClick={onClick} 
      className={`btn ${variant}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
import { TYPE_COLORS } from '../../constants';
import '../../styles/TypeBadge.css';

export default function TypeBadge({ type, size = 'medium' }) {
  return (
    <span 
      className={`type-badge ${size}`}
      style={{ backgroundColor: TYPE_COLORS[type] }}
    >
      {type}
    </span>
  );
}
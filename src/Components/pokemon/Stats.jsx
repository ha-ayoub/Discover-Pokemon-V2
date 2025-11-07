import Stat from './Stat';
import '../../styles/Stats.css';

export default function Stats({ stats }) {
  return (
    <div className="stats-grid">
      <Stat parameter="Height" value={stats.height} units="ft" />
      <Stat parameter="Weight" value={stats.weight} units="kg" />
      <Stat parameter="Base Exp" value={stats.exp} />
    </div>
  );
}
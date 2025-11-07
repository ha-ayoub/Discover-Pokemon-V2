import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { TYPE_COLORS } from '../../constants';

export default function StatsChart({ stats, primaryType }) {
  const chartData = [
    { stat: 'HP', value: stats.hp, fullMark: 150 },
    { stat: 'Attack', value: stats.attack, fullMark: 150 },
    { stat: 'Defense', value: stats.defence, fullMark: 150 },
    { stat: 'Sp. Atk', value: stats.splAttack, fullMark: 150 },
    { stat: 'Sp. Def', value: stats.splDefence, fullMark: 150 },
    { stat: 'Speed', value: stats.speed, fullMark: 150 },
  ];

  const color = TYPE_COLORS[primaryType] || '#8884d8';

  return (
    <div className="stats-chart">
      <h3>Base Stats</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis 
            dataKey="stat" 
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 150]}
            tick={{ fill: '#666' }}
          />
          <Radar 
            name="Stats" 
            dataKey="value" 
            stroke={color} 
            fill={color} 
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
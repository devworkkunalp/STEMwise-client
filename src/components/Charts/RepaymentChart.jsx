import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

/**
 * Premium Repayment Timeline Chart.
 * Visualizes cumulative financial milestones over OPT years.
 */
const RepaymentChart = ({ data = [] }) => {
  // Default sample data matching Milestone 11 schema
  const defaultData = data.length > 0 ? data : [
    { year: 'Year 1', amount: 15000, label: 'Initial Savings' },
    { year: 'Year 2', amount: 35000, label: 'Debt 50% Clear' },
    { year: 'Year 3', amount: 62000, label: 'Debt Free' },
    { year: 'Year 4', amount: 95000, label: 'Positive Net Worth' },
    { year: 'Year 5', amount: 140000, label: 'Career Growth' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel glass-card" style={{ padding: 'var(--space-4)', border: '1px solid var(--color-teal)' }}>
          <p className="text-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{payload[0].payload.year}</p>
          <p style={{ fontWeight: 700, color: 'var(--color-teal)', margin: 'var(--space-1) 0' }}>
            ${payload[0].value.toLocaleString()}
          </p>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{payload[0].payload.label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={defaultData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Bar 
            dataKey="amount" 
            radius={[4, 4, 0, 0]}
            barSize={40}
          >
            {defaultData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 2 ? 'var(--color-teal)' : 'rgba(45, 212, 191, 0.3)'}
                style={{ filter: index === 2 ? 'drop-shadow(0 0 8px var(--color-teal-glow))' : 'none' }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RepaymentChart;

import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import './ComparisonTable.css';

/**
 * Premium ComparisonTable for STEMwise.
 * Compares financial metrics and visa policies between countries.
 */
const ComparisonTable = ({ 
  data = [], 
  metrics = [
    { key: 'roi', label: 'Average ROI', unit: '%' },
    { key: 'cost', label: 'Total Cost', unit: '$', isCurrency: true },
    { key: 'payback', label: 'Payback Period', unit: ' Years' },
    { key: 'visaSuccess', label: 'Visa Success Rate', unit: '%' },
    { key: 'h1bChance', label: 'H-1B Lottery Prob.', unit: '%' },
  ] 
}) => {
  return (
    <div className="sw-comparison-container glass-panel">
      <table className="sw-comparison-table">
        <thead>
          <tr>
            <th className="sw-th-metric">Metric</th>
            {data.map((country) => (
              <th key={country.name} className="sw-th-country">
                <div className="sw-country-header">
                  <span className="sw-country-flag">{country.flag}</span>
                  <span className="sw-country-name">{country.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.key}>
              <td className="sw-td-metric">{metric.label}</td>
              {data.map((country) => {
                const value = country[metric.key];
                const isBest = country.isBest === metric.key;
                
                return (
                  <td 
                    key={`${country.name}-${metric.key}`} 
                    className={`sw-td-value ${isBest ? 'is-best' : ''}`}
                  >
                    <span className="text-mono">
                      {metric.isCurrency && value ? '$' : ''}
                      {value?.toLocaleString() || '-'}
                      {metric.unit && value ? metric.unit : ''}
                    </span>
                    {isBest && <Check size={14} className="sw-best-icon" />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;

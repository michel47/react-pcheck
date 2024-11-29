import React from 'react';

interface StrengthGaugeProps {
  value: number;
  maxValue: number;
  label: string;
}

export const StrengthGauge: React.FC<StrengthGaugeProps> = ({ value, maxValue, label }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const hue = (percentage * 120) / 100; // 0 to 120 (red to green)
  
  return (
    <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden relative mb-4">
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: `hsl(${hue}, 100%, 50%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {label}: {value.toFixed(2)}
      </div>
    </div>
  );
};
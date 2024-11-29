import React from 'react';
import { ZXCVBNResult, ZXCVBNScore } from 'zxcvbn';

interface PasswordFeedbackProps {
  result: ZXCVBNResult;
  isPwned: boolean;
}

const getScoreColor = (score: ZXCVBNScore) => {
  const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-emerald-500'];
  return colors[score];
};

export const PasswordFeedback: React.FC<PasswordFeedbackProps> = ({ result, isPwned }) => {
  return (
    <div className="mt-6 space-y-4">
      {isPwned && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          ⚠️ This password has been found in data breaches. Please choose a different password.
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Password Analysis</h3>
        
        <div className={`text-lg font-bold mb-2 ${getScoreColor(result.score)}`}>
          Score: {result.score}/4
        </div>
        
        <div className="space-y-2">
          <p>Estimated crack time: {result.crack_times_display.offline_slow_hashing_1e4_per_second}</p>
          <p>Warning: {result.feedback.warning || 'No specific warnings'}</p>
          
          {result.feedback.suggestions.length > 0 && (
            <div>
              <p className="font-medium">Suggestions:</p>
              <ul className="list-disc list-inside">
                {result.feedback.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
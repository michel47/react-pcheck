import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { PasswordInput } from './components/PasswordInput';
import { StrengthGauge } from './components/StrengthGauge';
import { PasswordFeedback } from './components/PasswordFeedback';
import {
  calculateEntropy,
  calculateShannonEntropy,
  checkPwnedPassword,
  getPasswordStrength,
} from './utils/passwordUtils';

function App() {
  const [password, setPassword] = useState('');
  const [isPwned, setIsPwned] = useState(false);
  const [strength, setStrength] = useState(getPasswordStrength(''));

  useEffect(() => {
    const analyzePassword = async () => {
      if (password) {
        setStrength(getPasswordStrength(password));
        setIsPwned(await checkPwnedPassword(password));
      } else {
        setStrength(getPasswordStrength(''));
        setIsPwned(false);
      }
    };

    const timeoutId = setTimeout(analyzePassword, 300);
    return () => clearTimeout(timeoutId);
  }, [password]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield className="w-10 h-10 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Password Strength Checker</h1>
          </div>

          <div className="space-y-6">
            <PasswordInput
              value={password}
              onChange={setPassword}
            />

            {password && (
              <>
                <div className="space-y-2">
                  <StrengthGauge
                    value={calculateEntropy(password)}
                    maxValue={128}
                    label="Entropy"
                  />
                  <StrengthGauge
                    value={calculateShannonEntropy(password)}
                    maxValue={128}
                    label="Shannon Entropy"
                  />
                  <StrengthGauge
                    value={Math.log10(strength.guesses)}
                    maxValue={15}
                    label="Log10(Guesses)"
                  />
                </div>

                <PasswordFeedback
                  result={strength}
                  isPwned={isPwned}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import zxcvbn from 'zxcvbn';

export const calculateEntropy = (password: string): number => {
  const charsetSize = getCharsetSize(password);
  return Math.log2(Math.pow(charsetSize, password.length));
};

const getCharsetSize = (password: string): number => {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/[0-9]/.test(password)) size += 10;
  if (/[^a-zA-Z0-9]/.test(password)) size += 32;
  return size;
};

export const calculateShannonEntropy = (password: string): number => {
  const charFrequency: { [key: string]: number } = {};
  for (const char of password) {
    charFrequency[char] = (charFrequency[char] || 0) + 1;
  }

  let entropy = 0;
  for (const char in charFrequency) {
    const probability = charFrequency[char] / password.length;
    entropy -= probability * Math.log2(probability);
  }

  return entropy * password.length;
};

export const checkPwnedPassword = async (password: string): Promise<boolean> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
  
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await response.text();
  const hashes = text.split('\n');

  return hashes.some(h => h.startsWith(suffix));
};

export const getPasswordStrength = (password: string) => {
  return zxcvbn(password);
};
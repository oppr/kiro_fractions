// Utility functions for fraction calculations

// Greatest Common Divisor
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Least Common Multiple
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

// Fraction class for calculations
export class Fraction {
  constructor(whole = 0, numerator = 0, denominator = 1) {
    this.whole = parseInt(whole) || 0;
    this.numerator = parseInt(numerator) || 0;
    this.denominator = parseInt(denominator) || 1;
    
    if (this.denominator === 0) {
      this.denominator = 1;
    }
    
    this.simplify();
  }

  // Convert to improper fraction
  toImproper() {
    const num = this.whole * this.denominator + this.numerator;
    return { numerator: num, denominator: this.denominator };
  }

  // Simplify fraction
  simplify() {
    // Convert to improper fraction first
    const totalNumerator = this.whole * this.denominator + this.numerator;
    
    if (totalNumerator === 0) {
      this.whole = 0;
      this.numerator = 0;
      this.denominator = 1;
      return this;
    }

    // Find GCD and simplify
    const divisor = gcd(Math.abs(totalNumerator), this.denominator);
    const simplifiedNum = totalNumerator / divisor;
    const simplifiedDen = this.denominator / divisor;

    // Convert back to mixed number
    this.whole = Math.floor(Math.abs(simplifiedNum) / simplifiedDen) * Math.sign(simplifiedNum);
    this.numerator = Math.abs(simplifiedNum) % simplifiedDen;
    this.denominator = simplifiedDen;

    return this;
  }

  // Add two fractions
  add(other) {
    const a = this.toImproper();
    const b = other.toImproper();
    
    const commonDenom = lcm(a.denominator, b.denominator);
    const newNum = (a.numerator * commonDenom / a.denominator) + 
                   (b.numerator * commonDenom / b.denominator);
    
    return new Fraction(0, newNum, commonDenom);
  }

  // Subtract two fractions
  subtract(other) {
    const a = this.toImproper();
    const b = other.toImproper();
    
    const commonDenom = lcm(a.denominator, b.denominator);
    const newNum = (a.numerator * commonDenom / a.denominator) - 
                   (b.numerator * commonDenom / b.denominator);
    
    return new Fraction(0, newNum, commonDenom);
  }

  // Convert to decimal
  toDecimal() {
    return this.whole + (this.numerator / this.denominator);
  }

  // Display as string
  toString() {
    if (this.numerator === 0) {
      return this.whole.toString();
    }
    if (this.whole === 0) {
      return `${this.numerator}/${this.denominator}`;
    }
    return `${this.whole} ${this.numerator}/${this.denominator}`;
  }
}

// Parse string input like "1 1/2" or "3/4" or "5"
export function parseFraction(input) {
  if (!input || input.trim() === '') {
    return new Fraction(0, 0, 1);
  }

  const trimmed = input.trim();
  
  // Check for mixed number (e.g., "1 1/2")
  const mixedMatch = trimmed.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    return new Fraction(
      parseInt(mixedMatch[1]),
      parseInt(mixedMatch[2]),
      parseInt(mixedMatch[3])
    );
  }

  // Check for fraction (e.g., "3/4")
  const fractionMatch = trimmed.match(/^(-?\d+)\/(\d+)$/);
  if (fractionMatch) {
    return new Fraction(
      0,
      parseInt(fractionMatch[1]),
      parseInt(fractionMatch[2])
    );
  }

  // Check for whole number (e.g., "5")
  const wholeMatch = trimmed.match(/^(-?\d+)$/);
  if (wholeMatch) {
    return new Fraction(parseInt(wholeMatch[1]), 0, 1);
  }

  // Default to 0 if parsing fails
  return new Fraction(0, 0, 1);
}
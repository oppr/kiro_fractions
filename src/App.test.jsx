import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.jsx';
import { parseFraction, Fraction } from './utils/fractionUtils';

// Test the fraction utilities
describe('Fraction utilities', () => {
  test('parses simple fractions correctly', () => {
    const frac = parseFraction('1/2');
    expect(frac.toString()).toBe('1/2');
  });

  test('parses mixed numbers correctly', () => {
    const frac = parseFraction('1 1/2');
    expect(frac.toString()).toBe('1 1/2');
  });

  test('adds fractions correctly', () => {
    const frac1 = new Fraction(1, 1, 2); // 1 1/2
    const frac2 = new Fraction(0, 1, 4); // 1/4
    const result = frac1.add(frac2);
    expect(result.toString()).toBe('1 3/4');
  });

  test('subtracts fractions correctly', () => {
    const frac1 = new Fraction(2, 0, 1); // 2
    const frac2 = new Fraction(0, 3, 4); // 3/4
    const result = frac1.subtract(frac2);
    expect(result.toString()).toBe('1 1/4');
  });
});

// Test the main app
test('renders woodworking calculator', () => {
  render(<App />);
  const linkElement = screen.getByText(/Woodworking Calculator/i);
  expect(linkElement).toBeInTheDocument();
});

test('has input fields for measurements', () => {
  render(<App />);
  const firstInput = screen.getByPlaceholderText(/e.g., 1 1\/2 or 3\/4 or 5/i);
  const secondInput = screen.getByPlaceholderText(/e.g., 2 3\/8 or 1\/4 or 3/i);
  expect(firstInput).toBeInTheDocument();
  expect(secondInput).toBeInTheDocument();
});

test('has calculate button', () => {
  render(<App />);
  const calculateButton = screen.getByText(/Calculate/i);
  expect(calculateButton).toBeInTheDocument();
});
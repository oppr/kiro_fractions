# Woodworking Calculator

A React Native application for adding and subtracting fractional length measurements, designed specifically for woodworking projects.

## Features

- **Fractional Math**: Add and subtract measurements with fractions (e.g., 1 1/2" + 3/4")
- **Multiple Input Formats**: 
  - Whole numbers: `5`, `12`, `24`
  - Fractions: `1/2`, `3/4`, `7/8`
  - Mixed numbers: `1 1/2`, `2 3/4`, `5 7/16`
- **Automatic Simplification**: Results are automatically reduced to simplest form
- **Calculation History**: Keep track of your recent calculations
- **Decimal Conversion**: See decimal equivalents for precise measurements
- **Native UI**: Clean, responsive interface using React Native components

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

## Usage

1. Enter your first measurement in the first input field
2. Select addition (+) or subtraction (-) operation
3. Enter your second measurement in the second input field
4. Click "Calculate" to see the result
5. View calculation history below the main calculator

## Input Examples

- `1 1/2` - One and one-half inches
- `3/4` - Three-quarters inch
- `5` - Five inches
- `2 3/8` - Two and three-eighths inches

## Common Woodworking Fractions

The app handles all standard woodworking fractions:
- Sixteenths: 1/16, 3/16, 5/16, 7/16, 9/16, 11/16, 13/16, 15/16
- Eighths: 1/8, 3/8, 5/8, 7/8
- Quarters: 1/4, 3/4
- Halves: 1/2

## Technology Stack

- React Native with Expo
- Native React Native components with custom styling
- Custom fraction calculation utilities

Perfect for carpenters, woodworkers, and DIY enthusiasts who need quick and accurate fractional calculations!
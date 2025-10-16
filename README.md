# Woodworking Calculator

A React web application for adding and subtracting fractional length measurements, designed specifically for woodworking projects.

## Features

- **Fractional Math**: Add and subtract measurements with fractions (e.g., 1 1/2" + 3/4")
- **Multiple Input Formats**: 
  - Whole numbers: `5`, `12`, `24`
  - Fractions: `1/2`, `3/4`, `7/8`
  - Mixed numbers: `1 1/2`, `2 3/4`, `5 7/16`
- **Automatic Simplification**: Results are automatically reduced to simplest form

- **Calculation History**: Keep track of your recent calculations with timestamps
- **Decimal Conversion**: See decimal equivalents for precise measurements
- **Bootstrap UI**: Clean, responsive interface using React Bootstrap
- **Web-Only**: Optimized for desktop and mobile browsers

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Usage

1. Enter your first measurement in the first input field
2. Click the **+** or **−** buttons to select your operation (+ is default)
3. Enter your second measurement in the second input field
4. Click "Calculate" or press **Enter** to see the result
5. Use **"Use Result"** button to move the result to the first field for chaining calculations
6. View calculation history below the main calculator

### Keyboard Shortcuts
- **Enter**: Calculate the result (when both fields have values)
- **Tab**: Navigate between input fields

### Chaining Calculations
After getting a result, click "Use Result as First Measurement" to:
- Move the result to the first input field
- Clear the second input field
- Set focus to the second field for the next calculation

Perfect for complex calculations like: `12 1/4" - 3 7/8" + 2 1/2" - 1/4"`

## Input Examples

- `1 1/2` - One and one-half inches
- `3/4` - Three-quarters inch
- `5` - Five inches
- `2 3/8` - Two and three-eighths inches

## Common Woodworking Fractions

The app supports all standard woodworking fractions:
- Sixteenths: 1/16, 3/16, 5/16, 7/16, 9/16, 11/16, 13/16, 15/16
- Eighths: 1/8, 3/8, 5/8, 7/8
- Quarters: 1/4, 3/4
- Halves: 1/2
- Mixed numbers: 1 1/2, 2 3/4, 5 7/16, etc.

## Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder. The build is minified and optimized for best performance.

## Technology Stack

- React 18
- Vite (fast build tool)
- React Bootstrap 5
- Bootstrap 5.3
- Custom fraction calculation utilities
- Vitest for testing

## Project Structure

```
src/
├── components/
│   └── FractionInput.jsx   # Custom input component with unit display
├── utils/
│   └── fractionUtils.js    # Fraction calculation engine
├── App.jsx                 # Main application component
└── main.jsx               # React entry point
```

## Security & Performance

This application uses Vite instead of Create React App for:
- **Faster development**: Lightning-fast hot module replacement
- **Better security**: Significantly fewer dependencies and vulnerabilities
- **Modern tooling**: Latest build tools and optimizations
- **Smaller bundle size**: More efficient production builds

## Available Scripts

- `npm start` or `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests with Vitest

Perfect for carpenters, woodworkers, and DIY enthusiasts who need quick and accurate fractional calculations in their web browser!
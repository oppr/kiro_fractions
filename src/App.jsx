import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ButtonGroup } from 'react-bootstrap';
import { parseFraction } from './utils/fractionUtils';
import FractionInput from './components/FractionInput.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState('add');
  const [history, setHistory] = useState([]);


  const calculate = () => {
    try {
      const frac1 = parseFraction(value1);
      const frac2 = parseFraction(value2);
      
      let resultFraction;
      let operationSymbol;
      
      if (operation === 'add') {
        resultFraction = frac1.add(frac2);
        operationSymbol = '+';
      } else {
        resultFraction = frac1.subtract(frac2);
        operationSymbol = '-';
      }
      
      setResult(resultFraction);
      
      // Add to history
      const calculation = {
        expression: `${frac1.toString()} ${operationSymbol} ${frac2.toString()}`,
        result: resultFraction.toString(),
        decimal: resultFraction.toDecimal().toFixed(4),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setHistory(prev => [calculation, ...prev.slice(0, 9)]); // Keep last 10 calculations
      
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const clear = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };



  const useResult = () => {
    if (result) {
      setValue1(result.toString());
      setValue2('');
      setResult(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && value1 && value2) {
      e.preventDefault();
      calculate();
    }
  };

  return (
    <Container fluid className="py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center">
              <h3 className="mb-0">🔨 Woodworking Calculator</h3>
              <small>Add & Subtract Fractional Measurements</small>
            </Card.Header>
            
            <Card.Body>
              <Form onSubmit={(e) => { e.preventDefault(); if (value1 && value2) calculate(); }}>
                <Row>
                  <Col xs={12} md={5}>
                    <FractionInput
                      label="First Measurement"
                      value={value1}
                      onChange={setValue1}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., 1 1/2 or 3/4 or 5"
                    />
                  </Col>
                  
                  <Col xs={12} md={2} className="d-flex align-items-center justify-content-center mb-3">
                    <div className="d-flex flex-column align-items-center">
                      <Form.Label className="mb-2 small text-muted">Operation</Form.Label>
                      <ButtonGroup>
                        <Button
                          variant={operation === 'add' ? 'primary' : 'outline-primary'}
                          onClick={() => setOperation('add')}
                          style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '50px' }}
                        >
                          +
                        </Button>
                        <Button
                          variant={operation === 'subtract' ? 'primary' : 'outline-primary'}
                          onClick={() => setOperation('subtract')}
                          style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '50px' }}
                        >
                          −
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Col>
                  
                  <Col xs={12} md={5}>
                    <FractionInput
                      label="Second Measurement"
                      value={value2}
                      onChange={setValue2}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., 2 3/8 or 1/4 or 3"
                    />
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <Button 
                        variant="success" 
                        size="lg" 
                        type="submit"
                        disabled={!value1 || !value2}
                      >
                        Calculate (Enter)
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        size="lg" 
                        type="button"
                        onClick={clear}
                      >
                        Clear
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
              

              {result && (
                <Alert variant="success" className="text-center">
                  <h4 className="mb-2">Result</h4>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {result.toString()}"
                  </div>
                  <small className="text-muted">
                    ({result.toDecimal().toFixed(4)}" decimal)
                  </small>
                  <div className="mt-3">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={useResult}
                    >
                      ↑ Use Result as First Measurement
                    </Button>
                  </div>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {history.length > 0 && (
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">📋 Calculation History</h5>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={clearHistory}
                >
                  Clear History
                </Button>
              </Card.Header>
              <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {history.map((calc, index) => (
                  <div key={index} className="border-bottom py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{calc.expression} = {calc.result}"</strong>
                        <br />
                        <small className="text-muted">({calc.decimal}" decimal)</small>
                      </div>
                      <small className="text-muted">{calc.timestamp}</small>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h6 className="mb-0">💡 Quick Reference</h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} md={6}>
                  <strong>Input Examples:</strong>
                  <ul className="small mb-0">
                    <li>Whole numbers: 5, 12, 24</li>
                    <li>Fractions: 1/2, 3/4, 7/8</li>
                    <li>Mixed: 1 1/2, 2 3/4, 5 7/16</li>
                  </ul>
                  <strong className="mt-2 d-block">Shortcuts:</strong>
                  <ul className="small mb-0">
                    <li>Press Enter to calculate</li>
                    <li>Click + or − to switch operations</li>
                    <li>Use "Use Result" to chain calculations</li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <strong>Common Fractions:</strong>
                  <ul className="small mb-0">
                    <li>1/16, 1/8, 3/16, 1/4</li>
                    <li>5/16, 3/8, 7/16, 1/2</li>
                    <li>9/16, 5/8, 11/16, 3/4</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
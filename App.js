import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { parseFraction } from './utils/fractionUtils';
import FractionInput from './components/FractionInput';
import QuickFractions from './components/QuickFractions';

export default function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState('add');
  const [history, setHistory] = useState([]);
  const [activeInput, setActiveInput] = useState(1);

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

  const handleQuickFraction = (fraction) => {
    if (activeInput === 1) {
      setValue1(fraction);
    } else {
      setValue2(fraction);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>🔨 Woodworking Calculator</Text>
        <Text style={styles.subtitle}>Add & Subtract Fractional Measurements</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <FractionInput
              label="First Measurement"
              value={value1}
              onChange={(val) => {
                setValue1(val);
                setActiveInput(1);
              }}
              placeholder="e.g., 1 1/2 or 3/4"
            />
          </View>

          <View style={styles.operationContainer}>
            <TouchableOpacity
              style={[styles.operationButton, operation === 'add' && styles.operationButtonActive]}
              onPress={() => setOperation('add')}
            >
              <Text style={[styles.operationText, operation === 'add' && styles.operationTextActive]}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.operationButton, operation === 'subtract' && styles.operationButtonActive]}
              onPress={() => setOperation('subtract')}
            >
              <Text style={[styles.operationText, operation === 'subtract' && styles.operationTextActive]}>-</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <FractionInput
              label="Second Measurement"
              value={value2}
              onChange={(val) => {
                setValue2(val);
                setActiveInput(2);
              }}
              placeholder="e.g., 2 3/8 or 1/4"
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.calculateButton, (!value1 || !value2) && styles.buttonDisabled]}
            onPress={calculate}
            disabled={!value1 || !value2}
          >
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clear}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <QuickFractions
          onSelect={handleQuickFraction}
          title={`Quick Fractions (will fill ${activeInput === 1 ? 'first' : 'second'} measurement)`}
        />

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Result</Text>
            <Text style={styles.resultValue}>{result.toString()}"</Text>
            <Text style={styles.resultDecimal}>({result.toDecimal().toFixed(4)}" decimal)</Text>
          </View>
        )}
      </View>

      {history.length > 0 && (
        <View style={styles.card}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>📋 Calculation History</Text>
            <TouchableOpacity style={styles.clearHistoryButton} onPress={clearHistory}>
              <Text style={styles.clearHistoryText}>Clear History</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.historyContainer}>
            {history.map((calc, index) => (
              <View key={index} style={styles.historyItem}>
                <View>
                  <Text style={styles.historyExpression}>{calc.expression} = {calc.result}"</Text>
                  <Text style={styles.historyDecimal}>({calc.decimal}" decimal)</Text>
                </View>
                <Text style={styles.historyTime}>{calc.timestamp}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.referenceTitle}>💡 Quick Reference</Text>
        <View style={styles.referenceRow}>
          <View style={styles.referenceColumn}>
            <Text style={styles.referenceHeader}>Input Examples:</Text>
            <Text style={styles.referenceText}>• Whole numbers: 5, 12, 24</Text>
            <Text style={styles.referenceText}>• Fractions: 1/2, 3/4, 7/8</Text>
            <Text style={styles.referenceText}>• Mixed: 1 1/2, 2 3/4, 5 7/16</Text>
          </View>
          <View style={styles.referenceColumn}>
            <Text style={styles.referenceHeader}>Common Fractions:</Text>
            <Text style={styles.referenceText}>• 1/16, 1/8, 3/16, 1/4</Text>
            <Text style={styles.referenceText}>• 5/16, 3/8, 7/16, 1/2</Text>
            <Text style={styles.referenceText}>• 9/16, 5/8, 11/16, 3/4</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputRow: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  operationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  operationButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  operationButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  operationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  operationTextActive: {
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  calculateButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    flex: 0.45,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    flex: 0.45,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    opacity: 0.5,
  },
  resultContainer: {
    backgroundColor: '#d4edda',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 5,
  },
  resultDecimal: {
    fontSize: 14,
    color: '#6c757d',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearHistoryButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  clearHistoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  historyContainer: {
    maxHeight: 300,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  historyExpression: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyDecimal: {
    fontSize: 12,
    color: '#6c757d',
  },
  historyTime: {
    fontSize: 12,
    color: '#6c757d',
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  referenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  referenceColumn: {
    flex: 1,
    marginRight: 10,
  },
  referenceHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  referenceText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
});
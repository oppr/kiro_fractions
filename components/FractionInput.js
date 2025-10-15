import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FractionInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "e.g., 1 1/2 or 3/4", 
  disabled = false 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, disabled && styles.inputDisabled]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          editable={!disabled}
        />
        <Text style={styles.unit}>"</Text>
      </View>
      <Text style={styles.helpText}>
        Enter as: whole number, fraction, or mixed number
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#495057',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
  },
  unit: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#e9ecef',
    borderLeftWidth: 1,
    borderLeftColor: '#ced4da',
    fontSize: 16,
    color: '#495057',
  },
  helpText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5,
  },
});

export default FractionInput;
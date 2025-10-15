import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuickFractions = ({ onSelect, title = "Quick Fractions" }) => {
  const commonFractions = [
    '1/16', '1/8', '3/16', '1/4',
    '5/16', '3/8', '7/16', '1/2',
    '9/16', '5/8', '11/16', '3/4',
    '13/16', '7/8', '15/16', '1'
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {commonFractions.map((fraction) => (
          <TouchableOpacity
            key={fraction}
            style={styles.fractionButton}
            onPress={() => onSelect(fraction)}
          >
            <Text style={styles.fractionText}>{fraction}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  fractionButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 50,
    alignItems: 'center',
    margin: 4,
  },
  fractionText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default QuickFractions;
import { colors } from '@/src/styles/themes';
import { SelectProps } from '@/types/atoms';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const Select: React.FC<SelectProps> = ({ options, selectedValue, onValueChange }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={styles.text}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: colors.backgroundLight,
    borderColor: colors.borderLight,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 1.7,
    overflow: 'visible',
  },
  text: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
});

export default Select;

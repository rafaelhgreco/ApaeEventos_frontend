import React from "react";
import { ScrollView, Text, View } from "react-native";
import {
  ButtonProps,
  DateFieldProps,
  InputProps,
  SelectProps,
} from "../../../types/atoms";
import { FormField, GenericFormProps } from "../../../types/molecules";
import Button from "../atoms/button";
import DateTimeField from "../atoms/data_time_field";
import Input from "../atoms/input";
import Select from "../atoms/select";
import { styles } from "./form.style";

/**
 * GenericForm is a reusable form generator. It renders a list of fields
 * based on the configuration passed in via the `fields` prop. To
 * improve keyboard handling, the internal ScrollView now specifies
 * contentContainerStyle, keyboardShouldPersistTaps and keyboardDismissMode.
 */
const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  containerStyle,
  title,
  titleStyle,
  showDatePicker = {},
  toggleDatePicker = () => {},
  ...viewProps
}) => {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "input":
        return <Input key={field.key} {...(field.props as InputProps)} />;
      case "button":
        return <Button key={field.key} {...(field.props as ButtonProps)} />;
      case "select":
        return <Select key={field.key} {...(field.props as SelectProps)} />;
      case "date":
      case "time":
        return (
          <DateTimeField
            key={field.key}
            {...(field.props as DateFieldProps)}
            isVisible={!!showDatePicker[field.key]}
            onToggle={(visible) => toggleDatePicker(field.key, visible)}
          />
        );
      case "number":
        return (
          <Input
            key={field.key}
            {...(field.props as InputProps)}
            keyboardType="numeric"
          />
        );
      case "custom":
        return (
          <View key={field.key} style={{ marginBottom: 16 }}>
            {field.props.render()}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, containerStyle]} {...viewProps}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <ScrollView
        showsVerticalScrollIndicator={false}
        // Ensures the content stretches to at least fill the ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        // Allows taps on children (e.g., buttons) to register when the keyboard is open
        keyboardShouldPersistTaps="handled"
        // Dismisses the keyboard when the user scrolls
        keyboardDismissMode="on-drag"
      >
        {fields.map(renderField)}
      </ScrollView>
    </View>
  );
};

export default GenericForm;
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { DateFieldProps, InputProps } from '../../../types/atoms';

import { FieldGroup, FormField, GenericFormProps } from '../../../types/molecules';
import Button from '../atoms/button';
import DateTimeField from '../atoms/data_time_field';
import Input from '../atoms/input';
import Select from '../atoms/select';
import { styles } from './form.style';

const COMPONENT_MAP: Record<string, any> = {
  input: Input,
  number: Input,
  select: Select,
  button: Button,
  date: DateTimeField,
  time: DateTimeField,
  custom: null,
};

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  containerStyle,
  title,
  titleStyle,
  showDatePicker = {},
  toggleDatePicker = () => {},
  spacing = 20,
  ...viewProps
}) => {
  /* -----------------------
       RENDERIZA FIELD GRUPO
    ------------------------ */
  const renderGroup = (group: FieldGroup) => {
    return (
      <View key={group.key} style={{ marginBottom: spacing * 1.5 }}>
        {group.title && <Text style={styles.groupTitle}>{group.title}</Text>}

        {group.description && <Text style={styles.groupDescription}>{group.description}</Text>}

        <View style={{ gap: spacing }}>{group.children.map(renderField)}</View>
      </View>
    );
  };

  const renderField = (field: FormField) => {
    if (field.type === 'group') {
      return renderGroup(field);
    }

    const Component = COMPONENT_MAP[field.type];

    // width em porcentagem convertida para ANY para satisfazer o TS
    const colWidth = ((field.span || 12) / 12) * 100 + '%';

    if (field.type === 'custom') {
      return (
        <View key={field.key} style={{ width: colWidth as any, marginBottom: spacing }}>
          {field.props.render()}
        </View>
      );
    }

    const baseProps: any = field.props;

    if (field.type === 'date' || field.type === 'time') {
      return (
        <View key={field.key} style={{ width: colWidth as any }}>
          <DateTimeField
            {...(baseProps as DateFieldProps)}
            isVisible={!!showDatePicker[field.key]}
            onToggle={(visible) => toggleDatePicker(field.key, visible)}
          />
        </View>
      );
    }

    if (field.type === 'number') {
      return (
        <View key={field.key} style={{ width: colWidth as any }}>
          <Input {...(baseProps as InputProps)} keyboardType="numeric" />
        </View>
      );
    }

    if (!Component) return null;

    return (
      <View key={field.key} style={{ width: colWidth as any }}>
        <Component {...baseProps} />
        {'description' in field && field.description && (
          <Text style={styles.descriptionText}>{field.description}</Text>
        )}
      </View>
    );
  };

  /* -----------------------
       LAYOUT DO FORM
    ------------------------ */
  return (
    <View style={[styles.container, containerStyle]} {...viewProps}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* GRID (linha dinâmica) */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: spacing,
            rowGap: spacing,
          }}
        >
          {fields.map(renderField)}
        </View>
      </ScrollView>
    </View>
  );
};

export default GenericForm;

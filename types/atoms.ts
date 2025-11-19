import { ReactElement } from 'react';
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

/* --------------------------------------------
   ICON
--------------------------------------------- */
export interface IconProps extends Omit<TouchableOpacityProps, 'style'> {
  name: string; // Futuro: restringir para o set de ícones da app
  size?: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

/* --------------------------------------------
   INPUT
--------------------------------------------- */
export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;

  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;

  leftIcon?: ReactElement;
  rightIcon?: ReactElement;

  isPassword?: boolean;

  /** Texto auxiliar abaixo do input */
  description?: string;

  /** Densidade (compacto, normal, amplo) */
  density?: 'compact' | 'regular' | 'comfortable';
}

/* --------------------------------------------
   SELECT
--------------------------------------------- */
export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  options: SelectOption[];

  selectedValue?: string;
  onValueChange: (value: string) => void;

  placeholder?: string;

  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/* --------------------------------------------
   BUTTON
--------------------------------------------- */
export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label: string;

  /** Visual do botão */
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'ghost';

  /** Tamanho físico */
  size?: 'small' | 'medium' | 'large';

  loading?: boolean;

  /** Ícones opcionais */
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;

  /** Estilos externos */
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  fullWidth?: boolean;
}

/* --------------------------------------------
   DATE FIELD
--------------------------------------------- */
export interface DateFieldProps {
  value: Date;
  mode: 'date' | 'time'; // seu app não usa "datetime"
  onChange: (event: any, date?: Date) => void;
  label?: string;
}

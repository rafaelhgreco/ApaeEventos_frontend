import React, { useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export interface QuickActionCardProps {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
}

export function QuickActionCard({
  label,
  icon: Icon,
  onPress,
  color = '#333',
}: QuickActionCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () =>
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();

  const animateOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 80,
      useNativeDriver: true,
    }).start();

  return (
    <TouchableWithoutFeedback onPress={onPress} onPressIn={animateIn} onPressOut={animateOut}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={[styles.iconWrapper, { backgroundColor: color + '20' }]}>
          <Icon size={26} color={color} />
        </View>

        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '46%',
    height: 110,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
});

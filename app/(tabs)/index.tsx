import GenericForm from '@/components/ATOMIC/molecules/form';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/src/styles/index.style';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useHome } from '../../hooks/use-home';

export default function HomeScreen() {
  const { formFields, error } = useHome();

  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        speed: 1.5,
        bounciness: 6,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animações de foco no input
  const fieldsWithFocusHandlers = formFields.map((field) => {
    if (field.type === 'input') {
      return {
        ...field,
        props: {
          ...field.props,
          onFocus: () => {
            Animated.spring(translateY, {
              toValue: -20,
              useNativeDriver: true,
            }).start();
          },
          onBlur: () => {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        },
      };
    }
    return field;
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: 40,
          flexGrow: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.screen}>
          {/* BANNER FULL WIDTH */}
          <View style={styles.bannerContainer}>
            <Image source={require('@/assets/images/logo_apae.png')} style={styles.bannerImage} />
          </View>

          {/* FORM ANIMADO COMO CARD */}
          <Animated.View
            style={[
              styles.formCard,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            <Text style={styles.title}>Login</Text>

            <GenericForm title="" fields={fieldsWithFocusHandlers} />

            {error && (
              <Text
                style={{
                  color: 'red',
                  marginTop: 12,
                  textAlign: 'center',
                  fontSize: 14,
                }}
              >
                {error}
              </Text>
            )}
          </Animated.View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// components/chatbot/ChatbotButton.tsx
import { MessageCircle } from 'lucide-react-native';
import React from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useChatbot } from '@/hooks/useChatbot';
import ChatbotModal from './ChatbotModal';

export default function ChatbotButton() {
  const chat = useChatbot();

  const scale = new Animated.Value(0);

  function animateOpen() {
    Animated.timing(scale, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }

  function handlePress() {
    chat.openChat();
    animateOpen();
  }

  return (
    <>
      {/* Botão flutuante */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
          <MessageCircle color="#fff" size={26} strokeWidth={2.4} />
        </TouchableOpacity>
      </View>

      {/* Modal animado */}
      {chat.visible && (
        <Animated.View style={{ transform: [{ scale }] }}>
          <ChatbotModal
            visible={chat.visible}
            onClose={chat.closeChat}
            messages={chat.messages}
            input={chat.input}
            setInput={chat.setInput}
            sendMessage={chat.sendMessage}
            loading={chat.loading}
            flatListRef={chat.flatListRef}
          />
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    zIndex: 999,
    elevation: 20,
  },
  button: {
    backgroundColor: '#2C3E50',
    width: 62,
    height: 62,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
});

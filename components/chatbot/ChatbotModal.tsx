// components/chatbot/ChatbotModal.tsx
import type { ChatMessage } from '@/types/chatbot';
import { SendHorizontal, X } from 'lucide-react-native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

type Props = {
  visible: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  input: string;
  setInput: (text: string) => void;
  sendMessage: () => void;
  loading: boolean;
  flatListRef: React.MutableRefObject<FlatList<ChatMessage> | null>;
};

export default function ChatbotModal({
  visible,
  onClose,
  messages,
  input,
  setInput,
  sendMessage,
  loading,
  flatListRef,
}: Props) {
  function renderMessage({ item }: { item: ChatMessage }) {
    const isUser = item.sender === 'user';

    return (
      <View style={[styles.messageWrapper, isUser ? styles.userAlign : styles.botAlign]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
          <Markdown style={(isUser ? markdownUser : markdownBot) as any}>{item.text}</Markdown>
        </View>
      </View>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Assistente APAE</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={28} color="#444" />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ paddingVertical: 12 }}
          />

          {loading && (
            <View style={styles.typingWrapper}>
              <ActivityIndicator size="small" color="#2C3E50" />
              <Text style={{ marginLeft: 6, color: '#555' }}>Assistente digitando...</Text>
            </View>
          )}

          <View style={styles.inputWrapper}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Digite sua pergunta..."
              style={styles.input}
            />

            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <SendHorizontal size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/* --------------------------------------------------------
   MARKDOWN FIX — anticorte
-------------------------------------------------------- */
const markdownBot = {
  body: {
    color: '#2C3E50',
    fontSize: 15,
    lineHeight: 21,
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '100%',
  },
  bullet_list: {
    marginLeft: 12,
    width: '100%',
  },
  list_item: {
    width: '100%',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  strong: { fontWeight: 700 },
};

const markdownUser = {
  body: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 21,
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '100%',
  },
  bullet_list: {
    marginLeft: 12,
    width: '100%',
  },
  list_item: {
    width: '100%',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  strong: { fontWeight: 700 },
};

/* --------------------------------------------------------
   LAYOUT FIX — anticorte
-------------------------------------------------------- */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modal: {
    height: '85%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
  },

  messageWrapper: {
    paddingHorizontal: 8,
    marginVertical: 4,
    width: '100%',
  },

  userAlign: { alignItems: 'flex-end' },
  botAlign: { alignItems: 'flex-start' },

  bubble: {
    maxWidth: '92%',
    padding: 12,
    paddingBottom: 14,
    borderRadius: 16,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  userBubble: {
    backgroundColor: '#2C3E50',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#ECF0F1',
    borderBottomLeftRadius: 4,
  },

  typingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  input: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },

  sendBtn: {
    backgroundColor: '#2C3E50',
    marginLeft: 10,
    padding: 12,
    borderRadius: 12,
  },
});

// lib/authEvents.ts

export type AuthListener = () => void;

class AuthEvents {
  private listeners = new Set<AuthListener>();

  addListener(listener: AuthListener) {
    this.listeners.add(listener);
    return {
      remove: () => {
        this.listeners.delete(listener);
      },
    };
  }

  emitAuthChanged() {
    this.listeners.forEach((listener) => listener());
  }
}

export const authEvents = new AuthEvents();

export const emitAuthChanged = () => {
  authEvents.emitAuthChanged();
};

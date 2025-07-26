import { create } from 'zustand'

const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { email: 'user@example.com', password: 'user123', role: 'user', name: 'Regular User' },
];

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  login: ({ email, password }) =>
    set((state) => {
      const found = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (found) {
        return {
          user: { name: found.name, email: found.email },
          isAuthenticated: true,
          role: found.role,
        };
      }
      return { ...state, isAuthenticated: false };
    }),
  register: ({ name, email, password }) => {
    const exists = mockUsers.some((u) => u.email === email);
    if (!exists) {
      mockUsers.push({ name, email, password, role: 'user' });
      set({ user: null, isAuthenticated: false, role: null });
      return true;
    }
    set((state) => ({ ...state, isAuthenticated: false }));
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false, role: null }),
}));

import { create } from 'zustand'

const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { email: 'user@example.com', password: 'user123', role: 'user', name: 'Regular User' },
];

export const useAuthStore = create((set, get) => ({
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

  // Update profile (name/email) for the current user
  updateProfile: ({ name, email }) => {
    const currentUser = get().user;
    if (!currentUser) return false;

    // Find and update in mockUsers by previous email
    const idx = mockUsers.findIndex((u) => u.email === currentUser.email);
    if (idx === -1) return false;

    // If email is changing, ensure it doesn't collide with an existing user
    if (email !== currentUser.email) {
      const emailExists = mockUsers.some((u, i) => i !== idx && u.email === email);
      if (emailExists) return false;
    }

    mockUsers[idx] = { ...mockUsers[idx], name, email };

    // Update store user, keep auth and role unchanged
    set((state) => ({ ...state, user: { name, email } }));
    return true;
  },

  // Change password for the current user by verifying currentPassword
  changePassword: ({ currentPassword, newPassword }) => {
    const currentUser = get().user;
    if (!currentUser) return false;

    const idx = mockUsers.findIndex((u) => u.email === currentUser.email);
    if (idx === -1) return false;

    if (mockUsers[idx].password !== currentPassword) {
      return false;
    }

    mockUsers[idx].password = newPassword;
    return true;
  },
}));

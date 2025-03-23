import { defineStore } from 'pinia';
import { AuthState } from '../interfaces/auth.interface';
import { UserRole } from '../enums/enums/role.enum';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    authenticated: false,
    role: UserRole.ANONYMOUS,
    _userCredentials: {
      username: 'admin',
      password: '123456',
    },
  }),

  getters: {
    isStandardUser: (state) => state.role === UserRole.STANDARD_USER,
    isAnonymous: (state) => state.role === UserRole.ANONYMOUS,
  },

  actions: {
    authenticate(status: boolean, role: UserRole) {
      this.authenticated = status;
      this.updateUser(role);
    },

    logout() {
      this.authenticated = false;
      this.updateUser(UserRole.ANONYMOUS);
    },

    updateUser(role: UserRole) {
      this.role = role;
    },

    validateUser(username: string, password: string): boolean {
      return (
        username === this._userCredentials.username &&
        password === this._userCredentials.password
      );
    },
  },
});

import { UserRole } from '../enums/enums/role.enum';

export interface AuthState {
  authenticated: boolean;
  role: UserRole;

  _userCredentials: {
    username: string;
    password: string;
  };
}

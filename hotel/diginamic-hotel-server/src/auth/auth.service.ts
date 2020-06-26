import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  async validateUser(username: string, password: string): Promise<AuthenticatedUser> {
    if (username === 'admin' && password === 'admin') {
      return {username};
    }
    return null;
  }

}

export interface AuthenticatedUser {
  username: string;
}

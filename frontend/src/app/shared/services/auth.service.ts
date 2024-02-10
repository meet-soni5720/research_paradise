import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { backendUrl } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';
import { UserID } from '../models/userdata.model';
import { DataService } from './data.service';

export interface IUser {
  email: string;
  avatarUrl?: string;
}

const defaultPath = '/';
// const defaultUser = {
//   email: 'sandra@example.com',
//   avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
// };

const defaultUser = null;

@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;
  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient, private dataService : DataService) { 
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(userData : UserID) {
    try {
      // Send request
      let isOk = false;
      this.http.post(`${backendUrl}/users/signup`, userData).subscribe((data) => {
        this.router.navigate(['/login-form']);
      });
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async logIn(email: string, password: string) {

    try {
      // Send request
      const loginData = {
        email : email,
        password : password
      }

      this._user = {email};
      this.dataService.loginEndPoint(loginData).subscribe(
        (res) => {
          console.log(res);
          sessionStorage["userId"] = res.id;
          sessionStorage["isProfessor"] = res.isProfessor;
          this.router.navigate([this._lastAuthenticatedPath]);
          return {
            isOk: true,
            data: this._user
          };
        },
        (err) => {
          console.log("error while logging" + err);
        }
        
      );
    
      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}

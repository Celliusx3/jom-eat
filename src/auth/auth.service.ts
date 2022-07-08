import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  
  private FIREBASE_AUTH_URL: string;
  private FIREBASE_AUTH_API_KEY: string;

  constructor(
    private readonly httpService: HttpService, 
    private readonly configService: ConfigService
  ) {
    this.FIREBASE_AUTH_URL = this.configService.get("FIREBASE_AUTH_URL");
    this.FIREBASE_AUTH_API_KEY = this.configService.get("FIREBASE_AUTH_API_KEY");
  }

  async signUp(email: string, password: string) {
    const params = {
      email,
      password,
      returnSecureToken: true
    }

    const response = await firstValueFrom(this.httpService.post(`${this.FIREBASE_AUTH_URL}/v1/accounts:signUp`, params, {
      params: {key: this.FIREBASE_AUTH_API_KEY}
    }).pipe(
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    ));
  
    const { data: {idToken, refreshToken, expiresIn, localId} } = response;
    return { idToken, refreshToken, expiresIn, localId };
  }

  async signIn(email: string, password: string) {
    const params = {
      email,
      password,
      returnSecureToken: true
    }
    const response = await firstValueFrom(this.httpService.post(`${this.FIREBASE_AUTH_URL}/v1/accounts:signInWithPassword`, params, {
      params: {key: this.FIREBASE_AUTH_API_KEY}
    }).pipe(
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    ));

    const { data: {idToken, refreshToken, expiresIn, localId} } = response;
    return { idToken, refreshToken, expiresIn, localId };
  }

  async update(token: string, name: string) {
    const params = {
      displayName: name,
      idToken: token,
      returnSecureToken: true
    }

    const response = await firstValueFrom(this.httpService.post(`${this.FIREBASE_AUTH_URL}/v1/accounts:update`, params, {
      params: {key: this.FIREBASE_AUTH_API_KEY}
    }).pipe(
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    ));
  }

  async refreshToken(token: string) {
    const params = {
      grant_type: 'refresh_token',
      refresh_token: token
    }

    const response = await firstValueFrom(this.httpService.post(`${this.FIREBASE_AUTH_URL}/v1/token`, params, {
      params: {key: this.FIREBASE_AUTH_API_KEY}
    }).pipe(
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    ));

    const { data: { id_token, refresh_token, expires_in } } = response;
    return { idToken: id_token, refreshToken: refresh_token, expiresIn: expires_in };
  }
}
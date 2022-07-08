import {Injectable} from "@nestjs/common";
import * as firebase from "firebase-admin";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseApp {
  private firebaseApp: firebase.app.App;

  constructor(private readonly configService: ConfigService) {
    const firebaseConfig = {
      type: this.configService.get("FIREBASE_CONFIG_TYPE"),
      project_id: this.configService.get("FIREBASE_CONFIG_PROJECT_ID"),
      private_key_id:this.configService.get("FIREBASE_CONFIG_PRIVATE_KEY_ID"),
      private_key: this.configService.get("FIREBASE_CONFIG_PRIVATE_KEY").replace(/\\n/g, '\n'),
      client_email: this.configService.get("FIREBASE_CONFIG_CLIENT_EMAIL"),
      client_id: this.configService.get("FIREBASE_CONFIG_CLIENT_ID"),
      auth_uri: this.configService.get("FIREBASE_CONFIG_AUTH_URI"),
      token_uri: this.configService.get("FIREBASE_CONFIG_TOKEN_URI"),
      auth_provider_x509_cert_url: this.configService.get("FIREBASE_CONFIG_AUTH_PROVIDER_X509_CERT_URL"),
      client_x509_cert_url: this.configService.get("FIREBASE_CONFIG_CLIENT_X509_CERT_URL")
    }

    this.firebaseApp = firebase.initializeApp({
      // @ts-ignore
      credential: firebase.credential.cert(firebaseConfig),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  }
}
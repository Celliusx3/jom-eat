import { FirebaseApp } from './firebase/firebase-app';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthStrategy } from './strategies/firebase-jwt.strategy';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [
    FirebaseApp,
    FirebaseAuthStrategy,
    AuthService,
  ]
})
export class AuthModule {}

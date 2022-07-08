import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class SignupDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password too weak.' }
  )
  password: string

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string
}
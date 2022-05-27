import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'

export abstract class TokenService {
  static async sign({ id } = { id: v4() }, jwtSettings: jwt.SignOptions = { expiresIn: '4 hours' }): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign({ id }, process.env.JWT_SECRET, jwtSettings, async (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      })
    })
  }

  static async decode(token: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded as unknown as jwt.JwtPayload)
        }
      })
    })
  }
}

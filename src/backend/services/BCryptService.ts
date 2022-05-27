import bcryptjs from 'bcryptjs'

export abstract class BCryptService {
  static async encrypt(value: string): Promise<string> {
    if (!value) {
      return undefined
    }

    return bcryptjs.hash(value, 12)
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(value, hash)
  }
}

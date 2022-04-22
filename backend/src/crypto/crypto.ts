import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const hash = (password: string): string => {
      return bcrypt.hashSync(password, 10);
}

export const compare = (password: string, hash: string): boolean => {
      return bcrypt.compareSync(password, hash);
}

export const randomHex = (size: number): string => {
      return crypto.randomBytes(size).toString('hex');
}
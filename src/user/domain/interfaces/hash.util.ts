export interface IHashUtil {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class Encryptor {
  static async hash(text: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await asyncScrypt(text, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }

  static async isValid(
    storedText: string,
    receivedText: string
  ): Promise<boolean> {
    const [hashedText, salt] = storedText.split(".");
    const buffer = (await asyncScrypt(receivedText, salt, 64)) as Buffer;

    return buffer.toString("hex") === hashedText;
  }
}

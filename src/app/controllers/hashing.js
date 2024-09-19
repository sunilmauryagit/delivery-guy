import "server-only";
import { createHmac } from "node:crypto";

export function encryptValue(password, randomKey) {
  const hashedPassword = createHmac("sha256", randomKey)
    .update(password)
    .digest("hex");

  return hashedPassword;
}

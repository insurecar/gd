import jwt, { SignOptions } from "jsonwebtoken";

export const signToken = (id: string): Promise<string> => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT_SECRET or JWT_EXPIRES_IN not defined");
  }

  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

  return new Promise((resolve, reject) => {
    const signOptions: SignOptions = { expiresIn };

    jwt.sign({ id }, secret, signOptions, (err, token) => {
      if (err || !token) {
        return reject(new Error("Error signing token"));
      }
      resolve(token);
    });
  });
};

import jwt, { SignOptions } from "jsonwebtoken";

type StringValue = `${number}${"ms" | "s" | "m" | "h" | "d" | "y"}`;

export const signToken = (id: string): Promise<string> => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT_SECRET or JWT_EXPIRES_IN not defined");
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as StringValue;

  return new Promise((resolve, reject) => {
    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRES_IN,
    };

    jwt.sign({ id }, JWT_SECRET, signOptions, (err, token) => {
      if (err || !token) {
        return reject(new Error("Error signing token"));
      }
      resolve(token);
    });
  });
};

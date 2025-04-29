import { Document, Types } from "mongoose";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm: string | undefined;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserDocument>({
  name: {
    type: String,
    required: [true, "Please, tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please, provide your email"],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, "Please, provide a valid name"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please, provide a password"],
    minLength: 8,
    maxLength: 25,
    select: false,
  },
  passwordConfirm: {
    type: String,
    select: false,
    required: [true, "Please provide a confirm password"],
    validate: {
      validator: function (this: any, el: string) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model<IUserDocument>("User", userSchema);

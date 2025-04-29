import { Document, Types } from "mongoose";
import mongoose from "mongoose";
import validator from "validator";

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm: string;
}

const userSchema = new mongoose.Schema({
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
    required: [true, "Please provide a confirm password"],
    validate: {
      validator: function (this: any, el: string) {
        console.log("THIS_____PASSWORD", this.password);
        console.log("CURRENT______PASS", el);
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

export const User = mongoose.model<IUserDocument>("User", userSchema);

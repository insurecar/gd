import { kMaxLength } from 'buffer'
import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, tell us your name']
    },
    email: {
        type: String,
        required: [true, "Please, provide your email"],
        unique: true,
        lowerCase: true,
        validate: [validator.isEmail, 'Please, provide a valid name']
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please, provide a password'],
        minLength: 8,
        maxLength: 25,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please provide a confirm password'],
        validate: {

            validator: function (this: any, el: string) {
                return el === this.password
            },
            message: 'Passwords are not the same!'
        }
    }
})

export const User = mongoose.model('User', userSchema)
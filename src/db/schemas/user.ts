import {Schema, Document, model} from "mongoose";
import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

export const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        first: String,
        last: String
    }
});

UserSchema.pre('save', function(next) {
    let user : any = this;

    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10).then(salt => {
            bcrypt.hash(user.password, salt).then(hash => {
                user.password = hash;
                next();
            }).catch(error => {
                return next(error);
            })
        }).catch(error => {
            return next(error);
        })
    }
    else {
        next();
    }
});

UserSchema.methods.comparePassword = function(_password: String) {
    return bcrypt.compare(_password, this.password);
};

const User = model<IUser>('User', UserSchema);

export default User;
import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  name: string;
  email?: string;
  phone?: string;
  username: string;
  password?: string;
  status: number;
  removedAt?: Date;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
      index: true,
    },
    username: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    status: {
      type: Number,
      default: 1,
      index: true,
    },
    removedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "User",
  }
);

UserSchema.pre<UserDocument>("save", function (next) {
  // Hash the password
  if (this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;

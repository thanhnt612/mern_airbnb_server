import mongoose from "mongoose";
const { Schema } = mongoose;
const DOCUMENT_NAME = 'user'
const COLLECTION_NAME = 'users'
const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    avatar: String,
    access_token: {
      type: String,
      unique: true,
    },
    refresh_token: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verify: {
      type: Boolean,
      default:false
    },
    resetLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);
export const User = mongoose.model(DOCUMENT_NAME, userSchema);
import mongoose from "mongoose";
const { Schema } = mongoose;
const avatarSchema = new Schema(
    {
        profile: String,
        avatar: String,
    },
    {
        timestamps: true,
    }
);
export const Avatar = mongoose.model("Avatar", avatarSchema);
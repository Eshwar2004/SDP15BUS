import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw0vYt2DOFw4WgNpI_NfhU-S&ust=1707455034684000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOi6uOn7moQDFQAAAAAdAAAAABAE",
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Assuming only "user" and "admin" roles are allowed
        default: "user",
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

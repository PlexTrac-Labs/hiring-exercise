import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    username: { type: String, required: true },
    admin: { type: Boolean, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthYear: { type: Date, required: true },
    favoriteColor: { type: String, required: true }
});

// Thinking that birthyear and favorite color might want to be set to required: false, but just setting to true to move on to the next thing and maintain consistency

const UserModel = Mongoose.model("User", UserSchema);

export default UserModel;

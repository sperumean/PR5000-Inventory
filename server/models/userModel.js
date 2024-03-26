import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.statics.signup = async function (email, password, role = "user") {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is in the wrong format");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is too weak.");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email is already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, role });

  console.log(user);

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Fill all the fields to login");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Something is wrong. Try again.");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw Error("Something is wrong. Try again.");
  }

  return { user, role: user.role };
};

export default mongoose.model("User", userSchema);

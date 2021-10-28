import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("salt"));
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(password, user.password).catch((e) => false);
};

const User = mongoose.model("User", userSchema);
export default User;

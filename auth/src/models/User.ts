import mongoose, { Model, Schema, Document } from "mongoose";
import { Encryptor } from "../services/Encryptor";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
    versionKey: false, // to remove __v from response
  }
);

/**
 * Hash password before saving. For this we are using pre-save hook
 */
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Encryptor.hash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

const mongoose = require("mongoose");
const { Schema } = mongoose;

const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", UserSchema);

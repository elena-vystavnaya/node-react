const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: "String",
        required: true,
    },
    email: {
        type: "String",
        required: true,
        unique: true,
    },
    password: {
        type: "String",
        required: true,
        trim: true,
    },
    isOnline: {
        type: "Boolean",
        required: true
    },
});


userSchema.pre("save", async function (error, doc, next) {
    try {
        if (error.name === "MongoError" && error.code === 11000) {
            next(new Error("This user is already registered"));
        } else {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            next();
        }
    } catch (error) {
        console.log(error);
    }
});

//check password on login
userSchema.methods.comparePasswords = async function (userPassword) {
    return bcrypt.compare(this.password, userPassword);
};

module.exports = mongoose.model("User", userSchema);

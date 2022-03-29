const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema( {
    firstName: { type: String, required: true },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.pre('save', async function(next) {
    const user = this;

    if(!user.isModified('password')) next();

    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
})

UserSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);
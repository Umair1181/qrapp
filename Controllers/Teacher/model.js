const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String
    },
    
    createdAt: {
        type: Date,
        default : Date.now()
    }
})


TeacherSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
})
module.exports = mongoose.model("tbladmins", TeacherSchema);
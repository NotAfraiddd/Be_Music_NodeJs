const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true },
    email: { type: String, unique: true },
    password: { type: String,required: true },
    role: { type: String, default: 'Admin' }
  },
  {
    timestamps: true
  }
)

userSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'user_id_counter' });
userSchema.plugin(mongooseDelete, { overrideMethods: 'all' }) // only show data without deletedAt

module.exports = mongoose.model('User', userSchema)

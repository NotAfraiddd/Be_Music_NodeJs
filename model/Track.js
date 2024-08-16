const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const trackSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true },
    title: { type: String, required: true },
    singer: { type: String, required: true },
    album: { type: String, default: "" },
    cover_image: { type: String, default: "" },
    mp3_file: { type: String, required: true },
    category: { type: String, default: "" },
    release_year: { type: Date, default: "" },
    duration: { type: Number,default: "" },
  },
  {
    timestamps: true
  }
)
trackSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'track_id_counter' });
trackSchema.plugin(mongooseDelete, { overrideMethods: 'all' }) // only show data without deletedAt

module.exports = mongoose.model('Track', trackSchema)

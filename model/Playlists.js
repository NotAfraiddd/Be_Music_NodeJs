const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const playlistSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true },
    name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.Number, ref: 'User', required: true },
  },
  {
    timestamps: true
  }
)

playlistSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'playlist_id_counter' });
playlistSchema.plugin(mongooseDelete, { overrideMethods: 'all' }) // only show data without deletedAt

module.exports = mongoose.model('Playlist', playlistSchema);

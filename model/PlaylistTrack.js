const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const playlistTrackSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true },
    playlist_id: { type: mongoose.Schema.Types.Number, ref: 'Playlist', required: true },
    track_id: { type: mongoose.Schema.Types.Number, ref: 'Track', required: true },
  },
  {
    timestamps: true
  }
)

playlistTrackSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'playlist_track_id_counter' });
playlistTrackSchema.plugin(mongooseDelete, { overrideMethods: 'all' }) // only show data without deletedAt

module.exports = mongoose.model('PlaylistTrack', playlistTrackSchema)

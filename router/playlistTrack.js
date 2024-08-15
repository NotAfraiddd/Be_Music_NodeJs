const express = require('express')
const router = express.Router()
const playlistTrack = require('../controller/PLaylistTrackController')

router.get('/list', playlistTrack.getAllListPLaylistTracks)
router.post('/add', playlistTrack.addPlaylistTrack)
router.post('/:id/update', playlistTrack.udpatePlaylistTrack)
router.delete('/:id/delete', playlistTrack.removePlaylistTrack)
router.delete('/:playlist_id/track/:track_id', playlistTrack.deleteTrackFromPlaylist)

module.exports = router

const express = require('express')
const router = express.Router()
const playlist = require('../controller/PLaylistController')

router.get('/list', playlist.getAllListPlaylists)
router.post('/add', playlist.addPlaylist)
router.post('/:id/update', playlist.udpatePlaylist)
router.delete('/:id/delete', playlist.removePlaylist)
router.get('/user/:user_id/playlists', playlist.getAllPlaylistsByUser)
router.get('/:playlist_id/tracks', playlist.getListTracksByPlaylistID)

module.exports = router

const express = require('express')
const router = express.Router()
const track = require('../controller/TrackController')

router.get('/list', track.getAllListTracks)
router.post('/add', track.addTrack)
router.post('/:id/update', track.udpateTrack)
router.delete('/:id/delete', track.removeTrack)

module.exports = router

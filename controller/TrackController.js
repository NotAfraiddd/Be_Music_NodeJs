const Track = require('../model/Track')

module.exports = {
  getAllListTracks: async (req, res) => {
    try {
      const track = await Track.find()
      res.send(track)
    } catch (error) {}
  },
  addTrack: async (req, res) => {
    try {
      const { title, singer, mp3_file } = req.body

      // Validate required fields
      if (!title || !singer || !mp3_file) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        })
      }

      // Create a new track instance
      const track = new Track(req.body)

      // Save the track to the database
      const savedTrack = await track.save()

      res.status(201).json({
        success: true,
        message: 'Track created successfully',
        track: savedTrack
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create track',
        error: error.message
      })
    }
  },
  udpateTrack: async (req, res) => {
    try {
      const trackID = req.params.id
      const track = await Track.findOneAndUpdate({ id: trackID }, { $set: req.body }, { new: true })
      if (!track) {
        return res.status(404).json({
          success: false,
          message: 'Track not found'
        })
      }
      res.status(200).json({
        success: true,
        message: 'Track updated successfully',
        track
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update track',
        error: error.message
      })
    }
  },
  removeTrack: async (req, res) => {
    try {
      const trackID = req.params.id
      const deletedTrack = await Track.delete({ id: trackID })
      if (!deletedTrack) {
        return res.status(404).json({
          success: false,
          message: 'Track not found'
        })
      }
      res.status(200).json({
        success: true,
        message: 'Track deleted successfully',
        deletedTrack
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete track',
        error: error.message
      })
    }
  }
}
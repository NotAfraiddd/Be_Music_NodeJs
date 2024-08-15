const PLaylistTrack = require('../model/PlaylistTrack');

module.exports = {
  getAllListPLaylistTracks: async (req, res) => {
    try {
      const playlistTrack = await PLaylistTrack.find();
      res.send(playlistTrack);
    } catch (error) {}
  },
  addPlaylistTrack: async (req, res) => {
    try {
      // Create a new playlistTrack instance
      const playlistTrack = new PLaylistTrack(req.body);

      // Save the playlistTrack to the database
      const savedPlaylistTrack = await playlistTrack.save();

      res.status(201).json({
        success: true,
        message: 'PLaylistTrack created successfully',
        playlistTrack: savedPlaylistTrack,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create playlistTrack',
        error: error.message,
      });
    }
  },
  udpatePlaylistTrack: async (req, res) => {
    try {
      const playlistTrackID = req.params.id;
      const playlistTrack = await PLaylistTrack.findOneAndUpdate(
        { id: playlistTrackID },
        { $set: req.body },
        { new: true },
      );
      if (!playlistTrack) {
        return res.status(404).json({
          success: false,
          message: 'PLaylistTrack not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'PLaylistTrack updated successfully',
        playlistTrack,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update playlistTrack',
        error: error.message,
      });
    }
  },
  removePlaylistTrack: async (req, res) => {
    try {
      const playlistTrackID = req.params.id;
      const deletedPlaylist = await PLaylistTrack.delete({ id: playlistTrackID });
      if (!deletedPlaylist) {
        return res.status(404).json({
          success: false,
          message: 'PLaylistTrack not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'PLaylistTrack deleted successfully',
        deletedPlaylist,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete playlistTrack',
        error: error.message,
      });
    }
  },
  deleteTrackFromPlaylist: async (req, res) => {
    try {
      const { playlist_id, track_id } = req.params;
      const result = await PLaylistTrack.delete({  playlist_id: parseInt(playlist_id), track_id: parseInt(track_id) });

      res.status(200).json({
        success: true,
        message: 'Track successfully soft deleted from playlist.',
        result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete playlistTrack',
        error: error.message,
      });
    }
  },
};

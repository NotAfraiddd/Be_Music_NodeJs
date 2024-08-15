const Playlist = require('../model/Playlists');
const PlaylistTrack = require('../model/PlaylistTrack');
const Track = require('../model/Track');

module.exports = {
  getAllListPlaylists: async (req, res) => {
    try {
      const playlist = await Playlist.find();
      res.send(playlist);
    } catch (error) {}
  },
  addPlaylist: async (req, res) => {
    try {
      const { name } = req.body;

      // Validate required fields
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }

      // Create a new playlist instance
      const playlist = new Playlist(req.body);

      // Save the playlist to the database
      const savedPlaylist = await playlist.save();

      res.status(201).json({
        success: true,
        message: 'Playlist created successfully',
        playlist: savedPlaylist,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create playlist',
        error: error.message,
      });
    }
  },
  udpatePlaylist: async (req, res) => {
    try {
      const playlistID = req.params.id;
      const playlist = await Playlist.findOneAndUpdate({ id: playlistID }, { $set: req.body }, { new: true });
      if (!playlist) {
        return res.status(404).json({
          success: false,
          message: 'Playlist not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Playlist updated successfully',
        playlist,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update playlist',
        error: error.message,
      });
    }
  },
  removePlaylist: async (req, res) => {
    try {
      const playlistID = req.params.id;
      const deletedPlaylist = await Playlist.delete({ id: playlistID });
      if (!deletedPlaylist) {
        return res.status(404).json({
          success: false,
          message: 'Playlist not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Playlist deleted successfully',
        deletedPlaylist,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete playlist',
        error: error.message,
      });
    }
  },
  getListTracksByPlaylistID: async (req, res) => { 
    try {
      const playlistId = parseInt(req.params.playlist_id);
  
      const playlistTracks = await PlaylistTrack.find({ playlist_id: playlistId });
  
      const trackIds = playlistTracks.map(pt => pt.track_id);
  
      const tracks = await Track.find({ id: { $in: trackIds } }).exec();

      res.status(200).json({
        success: true,
        message: 'Tracks retrieved successfully.',
        tracks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve tracks.',
        error: error.message
      });
    }
  },
  getAllPlaylistsByUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.user_id);

      const playlists = await Playlist.aggregate([
        { $match: { user_id: userId } },
        {
          $lookup: {
            from: 'playlisttracks', 
            localField: 'id',
            foreignField: 'playlist_id',
            as: 'playlist_tracks',
          },
        },
        { $unwind: { path: '$playlist_tracks', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'tracks', 
            localField: 'playlist_tracks.track_id',
            foreignField: 'id',
            as: 'track_info',
          },
        },
        { $unwind: { path: '$track_info', preserveNullAndEmptyArrays: true } },
        {
          $match: {
            'playlist_tracks.deleted': false
          }
        },
        {
          $group: {
            _id: '$id',
            name: { $first: '$name' },
            user_id: { $first: '$user_id' },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
            playlist_tracks: {
              $push: {
                _id: '$playlist_tracks.id',
                track_id: '$playlist_tracks.track_id',
                deleted: '$playlist_tracks.deleted',
                createdAt: '$playlist_tracks.createdAt',
                updatedAt: '$playlist_tracks.updatedAt',
                track: {
                  _id: '$track_info.id',
                  title: '$track_info.title',
                  singer: '$track_info.singer',
                  album: '$track_info.album',
                  cover_image: '$track_info.cover_image',
                  mp3_file: '$track_info.mp3_file',
                  category: '$track_info.category',
                  release_year: '$track_info.release_year',
                  duration: '$track_info.duration'
                }
              }
            }
          }
        },
        { $sort: { _id: 1 } }
      ]);
      res.status(200).json({
        success: true,
        message: 'Playlists retrieved successfully',
        playlists,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve playlists',
        error: error.message,
      });
    }
  },
};

require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 4000

const authRouter = require('./router/auth')
const trackRouter = require('./router/track')
const playlistRouter = require('./router/playlist')
const playlistTrackRouter = require('./router/playlistTrack')
const imageUploadRouter = require('./upload/imageUpload')
const audioUploadRouter = require('./upload/audioUpload')

const link_mongoose = process.env.LINK_MONGOOSE
// Database connect mongoDB
mongoose.connect(link_mongoose)

app.use(express.json())
app.use(cors())

// routes
app.use('/api/auth', authRouter)
app.use('/api/track', trackRouter)
app.use('/api/playlist', playlistRouter)
app.use('/api/playlist-track', playlistTrackRouter)
app.use('/api/image', imageUploadRouter)
app.use('/api/audio', audioUploadRouter)
app.use('/images', express.static('upload/images'))
app.use('/audios', express.static('upload/audios'))

// connect server
app.listen(port, (error) => {
  if (error) {
    console.log('Server has error', error)
  } else {
    console.log('Server running successly !!!!', port)
  }
})

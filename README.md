## 

### Create file .env
```
cp .env.example .env
```

### Step 1
```
npm i
```
### Step 2
```
npm start
```


### Complete
+ Auth: login, sign (No tokens - Due to many influencing factors, this method should be used temporarily.).
+ Track: get list, add, update, delete.
+ Playlist: get list, add, update, delete, get all playlist by userID, get all playlist_tracks by playlistID.
+ PlaylistTrack: et list, add, update, delete, delete track from playlist.
+ upload image/mp3: Saved directly to the drive and the user can also directly access the files through the route returned by the api. Initially planning to use AWS(S3) to store images. But due to many influencing factors, this method should be used temporarily.

### Incomplete
+ No token.
+ No middleware.
+ Do not check permissions.

### How to fix it
+ I need more time because I'm working at the current company.
+ I need try to improve performance, logic and how to set structure of project.
+ Laravel is my strong point, knowing I am willing to learn Nodejs to meet the company's requirements.

## NOTE: 
Runs parallel to the frontend.

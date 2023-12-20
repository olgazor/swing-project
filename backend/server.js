const express = require('express');
const app = express();
const Config = require('./config');
const Playlist = require('./playlist');

const config = new Config();
const port = config.getPort();


app.get('/playlist', async(req, res) => {
    try {
        const playlist_id = req.query.id;
        if (!playlist_id) {
            res.status(400).json({error: 'id parameters is missing'});
        }
        const playlist = new Playlist(playlist_id);
        var response = await playlist.getPlaylistInfo();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while calling the API'});
    }
});

app.get('/playlist/items', async(req, res) => {
    try {
        const playlist_id = req.query.id
        console.log(`Playlist ID ${playlist_id} received`);
        if (!playlist_id) {
            res.status(400).json({error: 'id parameter is missing'});
        }

        const playlist = new Playlist(playlist_id);
        const playlist_items = await playlist.getPlaylistItems();

        const playlist_response = playlist_items.map((item) => {
            return {
                id : item.snippet.resourceId.videoId,
                title: item.snippet.title
            };
        });

        res.json(playlist_response);
    } catch(error) {
        console.error(error);
        res.status(500).json({error : 'An error occurred while calling the API'});
    }
});

app.get('/sr', async(req, res) => {
    try {
        const playlist_id = req.query.id;
        if(!playlist_id) {
            res.status(400).json({error: 'Id parameter is missing'});
        }

        const playlist = new Playlist(playlist_id);
        const playlist_items = await playlist.getPlaylistItems();
        
        const sr_response = playlist_items.map((item) => {
            return `!sr ${item.snippet.resourceId.videoId}`;
        });
        res.json(sr_response);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while calling the API'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const express = require('express');
const axios = require('axios');
const app = express();
const Config = require('./config');

const config = new Config();
const port = config.getPort();
const api_key = config.getYTApiKey();
const api_base_url = config.getYTBaseApiUrl();


// Define a route to call the Python API
app.get('/playlist', async(req, res) => {
    try {
        // Make a request
        const playlist_id = req.query.id
        console.log(`Playlist ID ${playlist_id} received`);

        if (!playlist_id)
            res.status(400).json({error: 'id parameter is missing'});

        console.log(`Base URL: ${api_base_url}`);
        const playlist_url = `${api_base_url}/playlistItems?part=snippet&maxResults=50&playlistId=${playlist_id}&key=${api_key}`;
        console.log(`URL called: ${playlist_url}`);

        const response = await axios.get(playlist_url);
        const playlist_items = response.data.items;

        playlist_items.forEach((item, index) => {
            console.log(`Video ${index+1}: ${item.snippet.tittle}`);
        });

        res.json(playlist_items);
    } catch(error) {
        console.error(error);
        res.status(500).json({error : 'An error occurred while calling the API'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
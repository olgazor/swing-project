const express = require('express')
const cors = require('cors')
const app = express()
const Config = require('./config')
const Playlist = require('./playlist')

const config = new Config()
const port = config.getPort()

const apiRouter = express.Router()

apiRouter.get('/playlist', async(req, res) => {
    try {
        const playlist_id = req.query.id;
        if (!playlist_id) {
            return res.status(400).json({error: 'id parameters is missing'});
        }
        const playlist = new Playlist(playlist_id);
        var response = await playlist.getPlaylistInfo();
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while calling the API'});
    }
})

apiRouter.get('/playlist/items', async(req, res) => {
    try {
        const playlist_id = req.query.id
        console.log(`Playlist ID ${playlist_id} received`);
        if (!playlist_id) {
            return res.status(400).json({error: 'id parameter is missing'});
        }

        const playlist = new Playlist(playlist_id);
        const playlist_items = await playlist.getPlaylistItems();

        const playlist_response = playlist_items.map((item) => {
            return {
                videoId : item.snippet.resourceId.videoId,
                title: item.snippet.title,
                thumbnailUrl: item.snippet.thumbnails.default?.url ?? ''
            };
        });

        res.json(playlist_response);
        // res.json(playlist_items);
    } catch(error) {
        console.error(error);
        res.status(500).json({error : 'An error occurred while calling the API'});
    }
});

apiRouter.get('/sr', async(req, res) => {
    try {
        const playlist_id = req.query.id;
        if(!playlist_id) {
            return res.status(400).json({error: 'Id parameter is missing'});
        }

        let include_all = req.query.all;
        if(!include_all) {
            include_all = false;
        }

        const playlist = new Playlist(playlist_id);
        const playlist_items = await playlist.getPlaylistItems(include_all);
        
        const sr_response = playlist_items.map((item) => {
            return `!sr ${item.snippet.resourceId.videoId}`;
        });
        res.json(sr_response);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while calling the API'});
    }
})

apiRouter.post('/sr', async(req, res) => {
    try {
        const videoIds = req.body.ids;
        if(!videoIds) {
            return res.status(400).json({error: 'ids is missing'})
        }
        
        const sr_response = videoIds.map((item) => {
            return `!sr ${item}`
        })

        res.json(sr_response)
        // res.sendStatus(202)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'An error occurred while calling the API'})
    }
})

app.use(cors())

app.use(express.json())

app.use('/api', apiRouter)

app.get('/', (req, res) => {
    res.send('Welcome to song requester API')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
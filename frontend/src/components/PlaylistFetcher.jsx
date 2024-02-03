import './PlaylistFetcher.css'
import { useState } from 'react'
import VideoList from './VideoList'
import { apiUrl } from '../config'


function PlaylistFetcher() {

    const [playlistId, setPlaylistId] = useState('')
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFetchVideos = () => {
        setIsLoading(true)
        const itemsUrl = apiUrl + `/api/playlist/items?id=${playlistId}`
        fetch(itemsUrl)
            .then((response) => response.json())
            .then((data) => {
                setVideos(data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching video data: ', error)
                setIsLoading(false)
            })
    }

    return (
        <div>
            <h2>Playlist</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter Playlist ID"
                    value={playlistId}
                    onChange={(e) => setPlaylistId(e.target.value)}
                />
                <button onClick={handleFetchVideos}>Fetch Videos</button>
            </div>

            {isLoading? (
                <p>Loading...</p>
            ) : (
                <VideoList videos={videos} />
            )}
        </div>
    );
}

export default PlaylistFetcher
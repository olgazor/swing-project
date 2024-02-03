import './VideoList.css'
import React, { useState } from 'react'
import Video from './Video'


function VideoList({ videos }) {
    const [selectedVideos, setSelectedVideos] = useState({});

    const handleVideoSelect = (videoId, isSelected) => {
        setSelectedVideos((prevSelectedVideos) => ({
            ...prevSelectedVideos,
            [videoId]: isSelected,
        }));
    };

    const generateList = () => {
        const selectedVideoIds = Object.keys(selectedVideos).filter(
            (videoId) => selectedVideos[videoId]
        );
        console.log('Selected video IDs: ', selectedVideoIds);
    }

    return (
        <div>
            <h2>Video List</h2>
            <div className='video-list'>
                {videos.map((video) => (
                    <Video
                        key={video.videoId}
                        videoData={video}
                        onVideoSelect={handleVideoSelect}
                    />
                ))}
            </div>
            <button onClick={generateList}>Generate List</button>
        </div>
    );
}

export default VideoList;
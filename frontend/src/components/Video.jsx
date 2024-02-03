import React, { useState } from 'react'


function Video({ videoData, onVideoSelect }) {

    const { videoId, title, thumbnailUrl } = videoData;
    const { isChecked, setIsChecked } = useState(false);

    const handleCheckboxChange= () => {
        setIsChecked(!isChecked);
        onVideoSelect(videoId, !isChecked);
    }

    return (
        <div className='video-container'>
            <img src={thumbnailUrl} alt={title} className='video-thumbnail'/>
            <label>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </label>
        </div>
    );

}

export default Video;
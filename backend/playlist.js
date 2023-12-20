const axios = require('axios');
const Config = require('./config');


class Playlist {

    constructor(id) {
        this.id = id;

        const config = new Config();

        this.port = config.getPort();
        this.api_key = config.getYTApiKey();
        this.api_base_url = config.getYTBaseApiUrl();
    }

    async getPlaylistInfo() {
        const url_info = `${this.api_base_url}/playlists?part=contentDetails&id=${this.id}&key=${this.api_key}`;
        const response = await axios.get(url_info);
        return response.data;
    }

    async getPlaylistItems(include_all) {
        let max_items = 50;
        if (include_all) {
            max_items = await this.getTotalItems();
        }
        const utl_playlist = `${this.api_base_url}/playlistItems?part=snippet&maxResults=${max_items}&playlistId=${this.id}&key=${this.api_key}`;
        const response = await axios.get(utl_playlist);
        const playlist_items = response.data.items;
        return playlist_items;
    }

    getSongRequest() {
        return {};
    }

    async getTotalItems() {
        const playlist_info = await this.getPlaylistInfo();
        return playlist_info.contentDetails.itemCount;
    }
}

module.exports = Playlist;
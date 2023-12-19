const dotenv = require("dotenv");

class Config {
    constructor() {
        dotenv.config();
    }

    getPort() {
        return process.env.PORT || 5000;
    }

    getYTApiKey() {
        return process.env.YT_API_KEY || '';
    }

    getYTBaseApiUrl() {
        return process.env.YT_BASE_URL || '';
    }
}

module.exports = Config;
const CLIENT_ID = "3b64fb26212d4a1f903494036aa0cf94";
const REDIRECT_URI = "http://localhost:3000/";
let accessToken = "";
let expiresIn = "";

const Spotify = {
  getAccessToken() {
    const uri = window.location.href;
    if (uri.includes("access_token")) {
      accessToken = uri.match(/access_token=([^&]*)/)[1];
      expiresIn = uri.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    }
  },

  search(term) {
    accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.tracks.items) {
          return responseData.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            };
          });
        } else {
          return [];
        }
      });
  }
};

export default Spotify;

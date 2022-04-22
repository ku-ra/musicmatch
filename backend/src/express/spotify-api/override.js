import Spotify from 'passport-spotify';
import axios from 'axios';

Spotify.Strategy.prototype.userProfile = function(accessToken, done) {
    var authorization = 'Bearer ' + accessToken;
    var headers = {
      Authorization: authorization
    };

    axios.get(this._userProfileURL, { headers: headers }).then((response) => {
        if (response) {
            var json = response.data;
            var profile = {
                provider: 'spotify',
                id: json.id,
                username: json.id,
                displayName: json.display_name,
                profileUrl: json.external_urls ? json.external_urls.spotify : null,
                photos: json.images
                ? json.images.map(function(image) {
                    return {value: image.url};
                    })
                : null,
                country: json.country || null,
                followers: json.followers ? json.followers.total : null,
                product: json.product || null,
                _raw: JSON.stringify(json),
                _json: json
            };
            console.log(profile);
            if (json.email) {
                profile.emails = [
                {
                    value: json.email,
                    type: null
                }
                ];
            }

            done(null, profile);
        }
        else {
            done("Error", null);
        }
    })
    .catch((error) => { done(error) });
}

export default Spotify;
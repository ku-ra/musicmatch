import { Sequelize } from 'sequelize';

import { Users } from './models/user.model';
import { SpotifyData } from './models/spotifyData.model';
import { Matches } from './models/match.model';
import { Discords } from './models/discord.model';
import { Tracks } from './models/track.model'
import { MatchTracks } from './models/matchTrack.model';
import { MatchArtists } from './models/matchArtist.model';
import { Artists } from './models/artist.model';

const sequelize = new Sequelize('postgres://jan:root@localhost:5432/dev', { logging: false });

const models = [
      Users,
      SpotifyData,
      Matches,
      Discords,
      Tracks,
      MatchTracks,
      Artists,
      MatchArtists,
];

models.forEach((model) => model(sequelize));

(async () => {
      await sequelize.sync({alter: true});
      //await sequelize.sync({force: true});
})();


sequelize.models.SpotifyData.belongsTo(sequelize.models.Users, { foreignKey: 'userId' });
sequelize.models.Users.hasOne(sequelize.models.SpotifyData, { foreignKey: 'userId' });

sequelize.models.Users.hasMany(sequelize.models.Matches, { foreignKey: 'firstUserId'});
sequelize.models.Users.hasMany(sequelize.models.Matches, { foreignKey: 'secondUserId'});

sequelize.models.Matches.belongsTo(sequelize.models.Users, { foreignKey: 'firstUserId' });
sequelize.models.Matches.belongsTo(sequelize.models.Users, { foreignKey: 'secondUserId' });

sequelize.models.Users.hasOne(sequelize.models.Discords, { foreignKey: 'userId'});
sequelize.models.Discords.belongsTo(sequelize.models.Users, { foreignKey: 'userId' });

sequelize.models.MatchTracks.belongsTo(sequelize.models.Matches, { foreignKey: 'matchId' });
sequelize.models.MatchTracks.belongsTo(sequelize.models.Tracks, { foreignKey: 'trackId' });

sequelize.models.Tracks.hasMany(sequelize.models.MatchTracks, { foreignKey: 'trackId' });
sequelize.models.Matches.hasMany(sequelize.models.MatchTracks, { foreignKey: 'matchId' });

sequelize.models.MatchArtists.belongsTo(sequelize.models.Matches, { foreignKey: 'matchId' });
sequelize.models.MatchArtists.belongsTo(sequelize.models.Artists, { foreignKey: 'artistId' });

sequelize.models.Artists.hasMany(sequelize.models.MatchArtists, { foreignKey: 'artistId' });
sequelize.models.Matches.hasMany(sequelize.models.MatchArtists, { foreignKey: 'matchId' });

/*
 * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 * User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 * User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/

export default sequelize;

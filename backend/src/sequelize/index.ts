import { Sequelize } from 'sequelize';

import { Users } from './models/user.model';
import { SpotifyData } from './models/spotifyData.model';
import { Matches } from './models/match.model';
import { Discords } from './models/discord.model';

const sequelize = new Sequelize('postgres://jan:root@localhost:5432/dev', { logging: false });

const models = [
      Users,
      SpotifyData,
      Matches,
      Discords
];

models.forEach((model) => model(sequelize));

(async () => {
      await sequelize.sync();
      //await sequelize.sync({force: true});
})();


sequelize.models.SpotifyData.belongsTo(sequelize.models.Users, { foreignKey: 'userId' });
sequelize.models.Users.hasOne(sequelize.models.SpotifyData, { foreignKey: 'userId' });

sequelize.models.Users.hasMany(sequelize.models.Matches, { foreignKey: 'firstUserId'});
sequelize.models.Users.hasMany(sequelize.models.Matches, { foreignKey: 'secondUserId'});

sequelize.models.Matches.belongsTo(sequelize.models.Users, { foreignKey: 'firstUserId' });
sequelize.models.Matches.belongsTo(sequelize.models.Users, { foreignKey: 'secondUserId' });

sequelize.models.Discords.belongsTo(sequelize.models.Users, { foreignKey: 'userId' });
/*
 * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 * User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 * User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/

export default sequelize;

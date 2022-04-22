import { Sequelize } from 'sequelize';

import { Users } from './models/user.model';


const sequelize = new Sequelize('postgres://jan:root@localhost:5432/dev', { logging: false });

const models = [
      Users,
];

models.forEach((model) => model(sequelize));

(async () => {
      await sequelize.sync({force: true});
})();


//sequelize.models.Users.hasMany(sequelize.models.UserBadges, { foreignKey: 'userId' });
//sequelize.models.Users.hasOne(sequelize.models.ActiveBadges, { foreignKey: 'userId' });

/*
 * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 * User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 * User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/

export default sequelize;

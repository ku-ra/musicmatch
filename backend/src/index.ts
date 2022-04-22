import App from './express/app'
import Database from './sequelize'

const PORT = 8001

const assertDatabaseConnection = async () => {
	try {
		await Database.authenticate();
	} catch (error: any) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

const init = async () => {
      assertDatabaseConnection()
      .then(() => {
            App.listen(PORT, () => {
                  console.log(`Express server started on port ${PORT}`);
            })
      });
}

/*
const init = async () => {
	const server = Server.createServer(App);
      assertDatabaseConnection()
      .then(() => {
            server.listen(PORT, () => {
                  console.log(server.address());
            })
      });
}
*/


init();
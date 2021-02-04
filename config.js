/**
 * URL connection format
 * mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
 *
 * In below connection URL format
 * localhost:27017 = server:port, default port is 27017, port value is optional
 * test = our database name
 *
 * See more: https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
 */
var config = {
	database: {
		// url: 'mongodb://root:test123@ds115263.mlab.com:15263/heroku'
        url: 'mongodb://127.0.0.1:27017/customer_620821136_TEST'
	},
	server: {
		host: '127.0.0.1',
		port: '3100'
	}
}

module.exports = config

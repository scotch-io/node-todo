module.exports = {
    remoteUrl : process.env.MONGO_URI || 'mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu',
    localUrl: process.env.MONGO_URI || 'mongodb://localhost/meanstacktutorials'
};

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/NetworkApi';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;




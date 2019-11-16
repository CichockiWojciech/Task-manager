const server = require('./server');
const db = require('./db/mongoose');

const port = process.env.PORT || 3000;
server.listen(port, async () => {
  try {
    console.log(`listen on port ${port}`);
    await db.connect();
    console.log('db connection success');
  } catch (e) {
    console.log(e);
  }
});

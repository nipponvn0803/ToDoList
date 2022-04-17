const server = require("./server");
require('dotenv').config()
const port = process.env.BACKEND_PORT || 3001;

server.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

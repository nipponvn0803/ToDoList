const server = require("./server");
const port = 3001;

server.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

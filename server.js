const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// Configuration CORS pour Firebase
server.use(cors({
  origin: '*', // En production, remplace par ton URL Firebase
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Logger les requêtes
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on port ${PORT}`);
});
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// ✅ CORS AMÉLIORÉ
server.use(cors({
  origin: '*',  // Accepte toutes les origines (pour le test)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// ✅ Gérer les requêtes OPTIONS (preflight)
server.options('*', cors());

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Logger les requêtes
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  next();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on port ${PORT}`);
});
import * as express from 'express';
import { pokemon } from './assets/pokemon';
import * as cors from 'cors';

const app = express();
app.use(cors());
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.get('/api/pokemon', (req, res) => {
  res.json(pokemon);
});

app.get('/api/pokemon/:id', (req, res) => {
  res.json(pokemon.find(({ id }) => id === +req.params.id ?? ''));
});

app.get('/api/pokemon/search', (req, res) => {
  res.json(
    pokemon.filter(({ name: { english } }) =>
      english
        .toLowerCase()
        .includes((req.query.q as string).toLowerCase() ?? '')
    )
  );
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

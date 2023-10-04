import express, {Express, Request, Response, Application} from 'express';
import dotenv from 'dotenv'
import { recipeSeedDatabase } from './seeders/recipeSeed';

//For env file
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
recipeSeedDatabase();

app.get('/', (req: Request, res: Response) => {
    res.send('Home Page');
  });

  app.listen(port, () => {
    console.log(`Listening to port ${port}`)
  })
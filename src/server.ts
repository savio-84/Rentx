import express from 'express';
import './database';
const app = express();


app.use(express.json());

app.get('/', (request, response) => {
    return response.json('funcionou');
})

app.listen('3333', () => console.log('Server is running 🚀'));
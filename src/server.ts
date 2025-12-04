import express, { Request, Response } from 'express';

const app = express();
const PORT = 5000;
const html = '<h1>I am a H1 Title</h1>';

// basic get returning string
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// get with route returning html
app.get('/name', (req: Request, res: Response) => {
    res.send(html)
})

// get returning json
app.get('/json', (req: Request, res: Response) => {
  res.json({
    message: 'Hello JSON',
    items: [1, 2, 3]
  });
});

// get using route param and returning route param in string
app.get('/user/:id', (req: Request, res: Response) => {
    const name = req.params.id
    res.send(`Hello ${name}`)
})

// initialisation of server
app.listen(3000, () => {
    console.log('Server Listening on port http://Localhost:3000')
})


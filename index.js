const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Hello World!!!!');
});

app.get('/sandhya/skills', (request, response) => {
    response.send(['React', 'Redux', 'JavaScript', 'HTML5', 'CSS3/SASS/SCSS/LESS', 'Node.js', 'Unit Testing', 'MongoDB']);
});

app.get('sandhya/skills/:id', (request, response) => {
    response.send(request.params.id);
})

const port = process.env.PORT || 3001;
app.listen(3001, () => console.log(`Listening to Port ${port}`));


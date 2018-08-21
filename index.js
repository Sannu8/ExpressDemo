const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const skills = [
    { id: 1, name: 'React' },
    { id: 2, name: 'Redux' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'HTML5' },
    { id: 5, name: 'CSS3/SASS/SCSS/LESS' },
    { id: 6, name: 'Node.js' },
    { id: 7, name: 'Unit Testing' },
    { id: 8, name: 'Styled Components' }

];
app.get('/', (request, response) => {
    response.send('Hello Worlds!!!!!!');
});

app.get('/sandhya/skills', (request, response) => {
    response.send(skills);
});

app.post('/sandhya/skills', (request, response) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(request.body, schema);

    if (result.error) {
        // 400 Bad Request
        response.status(400).send(result.error.details[0].message);
        return;
    }

    const skill = {
        id: skills.length + 1,
        name: request.body.name
    }
    skills.push(skill);
    response.send(skill);
});

app.get('/sandhya/skills/:id', (request, response) => {
    const skill = skills.find(skill => skill.id === parseInt(request.params.id));
    if (!skill) response.status(404).send('The skill with the given ID was not found.');
    response.send(skill);
});

const port = process.env.PORT || 3001;
app.listen(3001, () => console.log(`Listening to Port ${port}...`));


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

//Retrieve skills
app.get('/sandhya/skills', (request, response) => {
    response.send(skills);
});

//Create new skill
app.post('/sandhya/skills', (request, response) => {

    const { error } = validateSkill(request.body); //Object destructuring. Same as result.error
    //If invalid, return 400 Bad Request
    if (error) {
        // 400 Bad Request
        response.status(400).send(error.details[0].message);
        return;
    }

    const skill = {
        id: skills.length + 1,
        name: request.body.name
    }
    skills.push(skill);
    response.send(skill);
});

//Update a skill
app.put('/sandhya/skills/:id', (req, res) => {

    //Look for the course
    const skill = skills.find(skill => skill.id === parseInt(req.params.id));

    //If not exist, return 404 Resource not found
    if (!skill) res.status(404).send('The skill with the given ID was not found.');

    //If exists, validate
    const { error } = validateSkill(req.body); //Object destructuring. Same as result.error
    //If invalid, return 400 Bad Request
    if (error) {
        // 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    // Else Update the Skill
    skill.name = req.body.name;

    //Return the updated course
    res.send(skill);
})



app.get('/sandhya/skills/:id', (request, response) => {

    //Look for the skill
    const skill = skills.find(skill => skill.id === parseInt(request.params.id));

    //If not exist, return 404 Resource not found
    if (!skill) response.status(404).send('The skill with the given ID was not found.');

    // Else Return the skill
    response.send(skill);
});

function validateSkill(skill) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(skill, schema);
}

const port = process.env.PORT || 3001;
app.listen(3001, () => console.log(`Listening to Port ${port}...`));


const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        req.content,
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)

    ].join(' ')
}));

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 100000);
};

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get("/info", (request, response) => {
    response.send(`<div><p>Phonebook has info for 2 people</p><p>${Date().toString()}</p></div>`);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);
    if (person) {
        response.json(person);
    }
    response.status(404).end();
}
);

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const newPersons = persons.filter((p) => p.id !== id)
    response.json(newPersons);
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            errror: 'The name or number is missing'
        })
    }

    if (persons.find((p) => p.name === body.name)) {
        return response.status(400).json({
            errror: 'The name already exists in the phonebook'
        })
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    };
    response.json(person);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

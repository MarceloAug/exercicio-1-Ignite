const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

// const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
	const { username } = request.headers;
	const user = user.find(user.username === username);
	if (!user) {
		return response.status(404).json({ error: 'User Not found' });
	}
	request.user = user;
	return next()
}

app.post('/users', (request, response) => {
	const { name, username } = request.body;
	//verifica se o usuário existe
	if (userExists) {
		return response.status(400).json({ error: 'Username Already exists' });
	}
	const user = {
		id: uuidv4(),
		name,
		username,
		todos: []
	}
	users.push(user);
	return response.status(201).send();
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
	const { user } = request;
	return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
	const { user } = request;
	const { title, deadline } = request.body;

	const todo =
	{
		id: uuidv4(), // precisa ser um uuid
		title,
		done: false,
		deadline: new Date(deadline),
		created_at: new Date()
	};

	user.todo.push(todo);
	return response.status(201).send(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
	const { user } = request;
	const { title, deadline } = request.body;
	const { id } = request.params;

	const todo = user.todos.find(todo => todo.id === id);

	if (!todo) {
		return response.status(404).json({ error: 'Todo Not Found' });
	}
	todo.title = title;
	todo.deadline = new Date(deadline);
	return response.send(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
	const { user } = request;
	const { id } = request.params;
	const todo = user.todos.find(todo => todo.id === id);
	if (!todo) {
		return response.status(404).json({ error: 'Todo Not Found' });
	}
	todo.done = true;
	return response.json(todo);

});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
	const { user } = request;
	const { id } = request.params;

	const todoIndex = user.todos.findIndex(todo => todo.id === id);

	if (todoIndex === -1) {
		return response.status(404).json({ error: 'Todo Not Found' });
	}
	//remove o index do array q eu removi
	user.todos.splice(todoIndex, 1);
	return response.status(204).send();

});

module.exports = app;
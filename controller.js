const shortid = require('shortid')
const todos = [];

exports.create = (req, res) => {
    const {
        text
    } = req.body;
    const todo = {
        id: shortid(),
        text,
        isCompleted: false,
        created: new Date(),
    }
    todos.push(todo);
    res.status(201).json({
        message: 'todos created successfully',
        ...todo
    });
};

exports.findAll = (req, res) => {
    {
        const result = todos.map((todos) => ({
            id: todos.id,
            text: todos.text
        }));
        return res.status(200).json(result);
    };
};


exports.findById = (req, res) => {
    const {
        todosId
    } = req.params;
    const todo = todos.find((todo) => todo.id === todosId);
    return res.status(201).json(todo);
};


exports.putUpdate = (req, res) => {
    const {
        todosId
    } = req.params;
    const {
        text,
        isCompleted
    } = req.body;
    const todo = todos.find((todo) => todo.id === todosId);

    if (!todo) {
        const todo = {
            id: shortid(),
            text,
            isCompleted: false,
            created: new Date(),
        }
        todos.push(todo);
        res.status(201).json({
            message: 'todos created successfully',
            ...todo
        });
    } else {
        todo.text = text || todo.text;
        todo.isCompleted = isCompleted || todo.isCompleted;

        const index = todos.findIndex((todo) => todo.id === todosId);
        todos[index] = todo;
        res.status(204).send();
    }

};

exports.patchUpdate = (req, res) => {
    const {
        todosId
    } = req.params;
    const {
        text,
        isCompleted
    } = req.body;

    const index = todos.findIndex((todo) => todo.id === todosId);
    if (index === -1) {
        return res.status(404).json({
            message: 'todos not found'
        });
    }

    todos[index].text = text || todos[index].text;
    todos[index].isCompleted = isCompleted || todos[index].isCompleted;

    return res.status(201).json({
        message: 'todos updated successfully',
        ...todos[index]
    });

};

exports.deletById = (req, res) => {
    const {
        todosId
    } = req.params;
    const index = todos.findIndex((todo) => todo.id === todosId);

    todos.splice(index, 1);
    return res.status(204).send();

};
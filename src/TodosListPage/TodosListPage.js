import React, { Component } from 'react'
import { getTodos, addTodo, completeTodo } from '../api-utils.js';
export default class TodosListPage extends Component {
    state = {
        todos: [],
        todo: ''
    }

    componentDidMount = async () => {
        await this.fetchTodos();
    console.log(this.state.todos);
    }

    fetchTodos = async () => {
        const todos = await getTodos(this.props.user.token);

        this.setState({ todos });
    }

    handleSubmit = async e => {
        e.preventDefault();

        await addTodo(this.state.todo, this.props.user.token);

        await this.fetchTodos();

        this.setState({ todo: '' })
    }

    handleTodoChange = e => this.setState({ todo: e.target.value })

    handleComplete = async(todoId) => {
        await completeTodo(todoId, this.props.user.token);

        this.fetchTodos();
    }

    render() {        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.todo} onChange={this.handleTodoChange} />
                    <button>Add todo</button>
                </form>
                {!this.state.todos.length && <p>You're done, nice!</p>}
                {this.state.todos.map(todo => 
                    <p 
                        key={`${todo.task}-${todo.id}`} 
                        onClick={() => this.handleComplete(todo.id)}
                        className={`
                            todo ${todo.completed 
                                ? 'completed' 
                                : ''}`
                            }>    
                        {todo.task}
                    </p>)}
            </div>
        )
    }
}

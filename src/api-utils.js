import request from 'superagent';

// API url -- different from the front end URL
const URL = 'https://calm-hollows-28107.herokuapp.com';

export async function signUpUser(email, password) {
    const response = await request
        .post(`${URL}/auth/signup`)
    
        .send({ email, password })

    return response.body;
}

export async function loginUser(email, password) {
    const response = await request
        .post(`${URL}/auth/signin`)
        // .send({
        //     email: email,
        //     password: password
        // })
        .send({ email, password })

    return response.body;
}

export async function getTodos(token) {
    const response = await request
        .get(`${URL}/api/todos`)
        .set('Authorization', token)

    return response.body;
}

export async function addTodo(todo, token) {
    const response = await request
        .post(`${URL}/api/todos`)
        .set('Authorization', token)
        .send({ task: todo })

    return response.body;
}


export async function completeTodo(todoId, todo, token) {
    const response = await request
        .put(`${URL}/api/todos/${todoId}`)
        .set('Authorization', token)
        .send({ task: todo })
    return response.body;
}
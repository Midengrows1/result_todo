import { TodosApi } from "../api/requests/todos";
import { startLoadingActionCreator, stopLoadingActionCreator } from "./loaderReducer";

const initialState = {
    todos: [],
    currentTodo: {},
};
const SET_NEW_TODO = "SET_NEW_TODO";
const DELETE_TODO = "DELETE_TODO";
const SET_CURRENT_TODO = "SET_CURRENT_TODO";
const GET_TODOS = "GET_TODOS";

export const addNewTodoActionCreator = (todo) => ({
    type: SET_NEW_TODO,
    todo
})
export const deleteTodoActionCreator = (todoId) => ({
    type: DELETE_TODO,
    todoId
})
export const setCurrentTodoActionCreator = (todo) => ({
    type: SET_CURRENT_TODO,
    todo
})
export const setTodosActionCreator = (todos) => ({
    type: GET_TODOS,
    todos
})

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NEW_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.todoId)
            };
        case SET_CURRENT_TODO:
            return {
                ...state,
                currentTodo: action.todo
            };
        case GET_TODOS:
            return {
                ...state,
                todos: action.todos
            };
        default:
            return state;
    }
}

const getTodos = () => async dispatch => {
    try {
        dispatch(startLoadingActionCreator());
        const response = await TodosApi.getTodos();
        if (response.status === 200) {
            dispatch(setTodosActionCreator(response.data));
        }
    } catch (error) {
        console.log(error)
    }
    finally {
        dispatch(stopLoadingActionCreator());
    }
}
const createTodo = (todo) => async dispatch => {
    try {
        const response = await TodosApi.createTodo(todo);
        if (response.status === 201) {
            dispatch(addNewTodoActionCreator(response.data));
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteTodo = (todoId) => async dispatch => {
    try {
        const response = await TodosApi.deleteTodo(todoId);
        if (response.status === 200) {
            console.log(response);
            dispatch(deleteTodoActionCreator(todoId));
        }
    } catch (error) {
        console.log(error)
    }
}
const getTodo = (todoId) => async dispatch => {
    try {
        dispatch(startLoadingActionCreator());
        const response = await TodosApi.getTodo(todoId);
        if (response.status === 200) {
            dispatch(setCurrentTodoActionCreator(response.data));
        }
    } catch (error) {
        console.log(error)
    }
    finally {
        dispatch(stopLoadingActionCreator());
    }
}
const updateTodo = (todo) => async dispatch => {
    try {
        const response = await TodosApi.updateTodo(todo);
        console.log(response);
        if (response.status === 200) {
            dispatch(setCurrentTodoActionCreator(response.data));
            return response;
        }
    } catch (error) {
        console.log(error)
    }
}
const searchTodos = (queryParam) => async dispatch => {
    try {
        const response = await TodosApi.searchTodos(queryParam);
        if (response.status === 200) {
            dispatch(setTodosActionCreator(response.data));
        }
    } catch (error) {
        console.log(error)
    }
}
const sortTodosByAlpabet = () => async dispatch => {
    try {
        const response = await TodosApi.sortTodos();
        if (response.status === 200) {
            dispatch(setTodosActionCreator(response.data));
        }
    } catch (error) {
        console.log(error)
    }
}

export { todoReducer, getTodos, createTodo, deleteTodo, getTodo, updateTodo, searchTodos, sortTodosByAlpabet }
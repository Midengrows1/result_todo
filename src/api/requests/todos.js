import instance from "../axios/instance";


export const TodosApi = {
    url: '/todos',
    getTodo(id) {
        return instance.get(`${this.url}/${id}`)
    },
    createTodo(todo) {
        return instance.post(`${this.url}`, todo)
    },
    updateTodo(todo) {
        return instance.patch(`${this.url}/${todo.id}`, todo)
    },
    deleteTodo(id) {
        return instance.delete(`${this.url}/${id}`)
    },
    getTodos() {
        return instance.get(`${this.url}`)
    },
    searchTodos(queryParam) {
        return instance.get(`${this.url}?q=${queryParam}`)
    },
    sortTodos() {
        return instance.get(`${this.url}?_sort=lowerTitle&_order=asc`)
    }
}
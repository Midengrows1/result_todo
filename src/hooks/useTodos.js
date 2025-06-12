import { useState } from "react";
import {
    ref,
    onValue,
    push,
    set,
    remove,
    orderByChild,
    query,
    startAt,
    endAt,
    orderByKey,
    get,
} from 'firebase/database';
import { db } from '../firebase'
export function useTodos() {
    const [todos, setTodos] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({
        id: todos?.length + 1,
        title: '',
        completed: false,
    });

    const [debounceQuery, setDebounceQuery] = useState('');
    const todosDbRef = ref(db, 'todos');
    const getTodos = () => {
        setIsLoading(true);
        return onValue(todosDbRef, snapshot => {
            setIsLoading(true);
            const loadedTodos = snapshot.val() || {};
            setTodos(loadedTodos);
            setIsLoading(false);
        });
    };
    const handleDeleteTodo = async id => {
        const singleTodoRef = ref(db, `todos/${id}`);
        remove(singleTodoRef);
    };
    const handleCreateTodo = () => {
        if (!currentTodo.title.trim()) return;
        const newTodo = {
            title: currentTodo.title,
            completed: false,
        };
        push(todosDbRef, newTodo);
        setCurrentTodo(prevState => ({ ...prevState, title: '' }));
    };

    const handleUpdateTodo = (id, title, completed) => {
        const updatedTodo = { id, title, completed };
        const singleTodoRef = ref(db, `todos/${id}`);
        set(singleTodoRef, updatedTodo);
    };
    const onSearch = () => {
        const searchRef = query(
            ref(db, 'todos'),
            orderByChild('title'),
            startAt(debounceQuery),
            endAt(debounceQuery + '\uf8ff'),
        );
        return onValue(
            searchRef,
            snapshot => {
                let results = {};
                snapshot.forEach(childSnapshot => {
                    results[childSnapshot.key] = { ...childSnapshot.val() };
                });
                console.log('Search results:', results);
                setTodos(results);
            },
            error => {
                console.error('Search failed:', error);
            },
        );
    };
    const sortTodos = () => {
        const sortedQuery = query(todosDbRef, orderByChild("title"));
        setIsSorted(!isSorted);
        if (!isSorted) {
            onValue(sortedQuery, snapshot => {
                const sortedData = {};
                snapshot.forEach(childSnapshot => {
                    sortedData[childSnapshot.key] = childSnapshot.val();
                });
                setTodos(sortedData);
            });
        } else {
            getTodos();
        }
    };
    return { todos, isLoading, currentTodo, setCurrentTodo, getTodos, handleDeleteTodo, handleUpdateTodo, handleCreateTodo, onSearch, sortTodos, debounceQuery, setDebounceQuery }
}
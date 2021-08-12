export interface Todo {
    id: number;
    post: string;
    completed?: boolean;
}

export interface TodoStore {
    todos: Todo[]
}
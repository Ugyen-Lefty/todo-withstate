import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store/dist/observable-store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoStore } from './todo/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoStateService extends ObservableStore< TodoStore >{

  constructor() {
    super({logStateChanges: false, trackStateHistory: true});
    this.initialState();
  }

  initialState(): void{
    this.setState({
      todos: []
    });
  }

  addTodo(todo: Todo){
    this.setState({
      todos: [todo, ...this.getState().todos]
    }, 'ADD_POST');
  }

  deleteTodo(deletedTodoId: number){
    this.setState({
      todos: this.getState().todos.filter(todo => todo.id !== +deletedTodoId)
    }, 'DELETE_POST');
  }

  updateTodo(updatedTodo: Todo){
    const todos = this.getState().todos;
    todos.some((todo) => {
      const isUpdatedTodo = todo.id === updatedTodo.id
      if (isUpdatedTodo) {
        todo.post = updatedTodo.post;
        todo.completed = updatedTodo.completed;
      }
      return isUpdatedTodo;
    });
    console.log(todos)
    this.setState({
      todos
    });
  }

  setTodos(todos: Todo[]): void {
    this.setState({
      todos:[...todos]
    });
  }

  listenToTodosStateChange(): Observable<Todo[]> {
    return this.stateChanged.pipe(map(state => state.todos));
  }
}

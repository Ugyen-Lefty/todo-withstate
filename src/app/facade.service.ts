import { Injectable } from '@angular/core';
import { TodoService } from './todo.service'; //API
import { TodoStateService } from './todo-state.service';
import { BusinessLogicService } from './business-logic.service';
import { Todo } from './todo/todo';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  // todoList: any=<Todo>{};s

  constructor(
    private todoService: TodoService,
    private todoStateService: TodoStateService) { }

  initializeState(): void {
    return this.todoStateService.initialState();
  }

  viewAllPosts(): Observable<Todo[]>{
    return this.todoService.viewAllPosts().pipe(tap(posts => this.setTodosToStore(posts)));
  }

  createPost(newPost: any): Observable<any> {
    return this.todoService.createPost(newPost).pipe(tap(newPost => this.addTodoToStore(newPost)));
  }

  deleteTodo(id: number){
    return this.todoService.deletePost(id).pipe(tap(() => this.deleteTodoFromStore(id)));
  }

  updateTodo(id: number, updatePost: Todo){
    return this.todoService.updateTodo(id, updatePost)
    .pipe(tap((todo) => this.updateTodoToStore(todo)));
  }

  addTodoToStore(post: Todo) {
    this.todoStateService.addTodo(post);
  }

  updateTodoToStore(todo: Todo){
    console.log('state update todo', todo)
    this.todoStateService.updateTodo(todo);
  }

  deleteTodoFromStore(deletedPostId: number) {
    this.todoStateService.deleteTodo(deletedPostId);
  }

  setTodosToStore(posts: Todo[]): void {
    this.todoStateService.setTodos(posts);
  }
  
  listenToTodosStateChange(){
    return this.todoStateService.listenToTodosStateChange().pipe(tap(console.log));
  }

  searchTodos(term: string){
    return this.todoService.searchTodos(term).pipe(tap((todos) => this.setTodosToStore(todos)));
  }

}
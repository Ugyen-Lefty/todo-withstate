import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from './todo/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

    constructor(private httpClient:HttpClient, private http: HttpClient) { }

  viewAllPosts(): Observable<Todo[]>{
    const baseUrl = "http://localhost:3000/todos";
    return this.httpClient.get<Todo[]>(baseUrl);
  }

  createPost(body: any):Observable<Todo>{
    const baseUrl = "http://localhost:3000/todos";
    return this.httpClient.post<Todo>(baseUrl, body);
  }

  deletePost(id: any):Observable<Todo>{
    const baseUrl = "http://localhost:3000/todos/" + id;
    return this.httpClient.delete<Todo>(baseUrl);
  }

  updateTodo(id: number, updatedPost: Todo):Observable<Todo>{
    const baseUrl = "http://localhost:3000/todos/" + id;
    return this.httpClient.put<Todo>(baseUrl, updatedPost);
  }

  searchTodos(term: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`http://localhost:3000/todos/?q=${term}`);
  }
  
}

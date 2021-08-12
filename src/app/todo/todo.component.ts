import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { FacadeService } from '../facade.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  saveCompleted: boolean = false;

  todoId = 0;
  
  todoList$: Observable<Todo[]>;
  
  todoList: any = <Todo>{};
  
  private searchTerms = new Subject<string>();
  
  constructor(private facade :FacadeService) { 
    this.todoList$ = this.facade.listenToTodosStateChange();
  }

  ngOnInit(): void {
    this.listenToTodos();
  }

  listenToTodos() {
    this.facade.viewAllPosts().subscribe();
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.facade.searchTodos(term)),
    ).subscribe();
  }

  addTodo(form: any){
    let newPost = {
      // id: Math.random(),
      post: form.value.posts as string,
      completed: false
    };
    this.facade.createPost(newPost).subscribe();
  }

  deleteTodo(id: number){
    this.facade.deleteTodo(id).subscribe();
  }

  updateTodo(id:number,updatedPost:string){
    let updatePost = {
      id: id,
      post: updatedPost,
      // completed: completed
    };
    this.facade.updateTodo(updatePost.id, updatePost).subscribe(data => {
      // this.todoId = data.id;
      console.log("Update Works" + updatePost.id + updatePost.post);
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onCompleted(value: boolean){
    this.saveCompleted = value;
    alert(this.saveCompleted);
  }

  todoComplete(id: number, event: any, updatedPost: string){
    if(event.target.checked){
      let updatePost = {
          id:id,
          post: updatedPost,
          completed: true
        };
        this.facade.updateTodo(updatePost.id,updatePost).subscribe(data => {
          console.log("it is true: ", updatePost);
        })
    }
    else{
      let updatePost = {
        id:id,
        post: updatedPost,
        completed: false
      };
      this.facade.updateTodo(updatePost.id,updatePost).subscribe(data => {
        console.log("it is False: ", updatePost);
      })
    }
    // let updatePost = {
    //   id:id,
    //   post: updatedPost,
    //   completed: true
    // };
    // this.facade.updateTodo(updatePost.id,updatePost).subscribe(data => {
    //   console.log("In component: ", updatePost);
    // })

  }

}
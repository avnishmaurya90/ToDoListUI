import { Component, OnInit } from '@angular/core';
import { ToDoItemService } from './services/todoitem.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
interface Todolist {
  id: number;
  item_name: string;
  due_date: string;
  is_completed:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ToDoListUI';
  todoFG: FormGroup;
  submitted: boolean = false;
  isEditMode: boolean = false;
  message: string = '';
  todo: Todolist[] = [];

  constructor(
    private todoService: ToDoItemService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.todoFG = this.fb.group({
      item_name: ['', [Validators.required]],
      due_date: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoFG.valid) {
      const todoData = this.todoFG.value;
      const api = this.todoService.addToDoItem(todoData);
      api.subscribe(
        (response) => {
          this.todoFG.reset();
          this.fetchData();
        },
        (error) => {
          if (error.status === 400) {
            this.message = 'This is already exists.';
          } else {
            this.message = 'Something went wrong';
          }
        }
      );
    }
  }

  fetchData() {
    this.todoService.getToDoItems().subscribe(
      (response: any) => {
        this.todo = response.data;
      },
      (error) => {
        console.error('Error fetching menu:', error);
      }
    );
  }

  changeCompleteCheck(event: any,data:any) {
    // if (event.target.checked) {
      data.is_completed=event.target.checked;
      data.due_date=data.due_date.split('T')[0];
      const api = this.todoService.updateToDoItem(data);
      api.subscribe(
        (response) => {
          console.log('todo operation successful:', response);
          this.fetchData();
        },
        (error) => {
          if (error.status === 400) {
            this.message = 'This is already exists.';
          } else {
            this.message = 'Something went wrong';
          }
        }
      );
    // }
  }
  

  deleteToDoItem(data:any) {
    let api=this.todoService.deleteToDoItem(data.id);
    api.subscribe(
      (response) => {
        console.log('todo operation successful:', response);
        this.fetchData();
      },
      (error) => {
        if (error.status === 400) {
          this.message = 'This is already exists.';
        } else {
          this.message = 'Something went wrong';
        }
      }
    );
  }
}

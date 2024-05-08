import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToDoItemService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getToDoItems() {
    return this.http.get(`${this.apiUrl}/todoitem`).pipe(res => res);
  }

  getToDoItem(id: Number) {
    return this.http.get(`${this.apiUrl}/todoitem/${id}`).pipe(res => res);
  }

  addToDoItem(toDoItemData: any) {
    return this.http.post(`${this.apiUrl}/todoitem`, toDoItemData).pipe(res => res);
  }

  updateToDoItem(updatedToDoItemData: any) {
    return this.http.put(`${this.apiUrl}/todoitem/`, updatedToDoItemData).pipe(res => res);
  }

  deleteToDoItem(id: number) {
    return this.http.delete(`${this.apiUrl}/todoitem/${id}`).pipe(res => res);
  }


}


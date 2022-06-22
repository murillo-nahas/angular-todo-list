import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  taskList: Array<TaskList> = JSON.parse(localStorage.getItem('list') || '[]');

  constructor() {}

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  deleteAllTaskList() {
    this.taskList = [];
  }

  setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false });
  }

  setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked)
      );
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm('Task vazia, deseja deletar?');

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }
}

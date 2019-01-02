import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtEditarId') txtEditarId: ElementRef;

  chkCompletado: FormControl;
  txtEditar: FormControl;

  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.todo);

    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtEditar = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(chkCompletadoValue => {
      const accion = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });

  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtEditarId.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {

    if (this.txtEditar.valid && this.txtEditar.value !== this.todo.texto) {
      const accion = new EditarTodoAction({id: this.todo.id, texto: this.txtEditar.value});
      this.store.dispatch(accion);
    }

    this.txtEditar.setValue(this.todo.texto);
    this.editando = false;
  }

  borrarTodo() {
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }

}

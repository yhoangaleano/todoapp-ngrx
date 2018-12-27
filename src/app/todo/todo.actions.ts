import { Action } from '@ngrx/store';

export enum TodoActionEnums {
  AGREGAR_TODO = '[TODO] Agregar Todo',
  TOGGLE_TODO = '[TODO] Toggle Todo',
}

export class AgregarTodoAction implements Action {
  readonly type = TodoActionEnums.AGREGAR_TODO;

  constructor(public texto: string ) {}
}

export class ToggleTodoAction implements Action {
  readonly type = TodoActionEnums.TOGGLE_TODO;

  constructor(public id: number ) {}
}

export type TodoTypes = AgregarTodoAction | ToggleTodoAction;

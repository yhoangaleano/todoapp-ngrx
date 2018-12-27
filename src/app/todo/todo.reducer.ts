import { Todo } from './model/todo.model';
import { TodoTypes, TodoActionEnums } from './todo.actions';

const todo1 = new Todo('Comer');
const todo2 = new Todo('Cepillar los dientes');
todo1.completado = true;

const initialState: Todo[] = [todo1, todo2];

export function todoReducer(state = initialState, action: TodoTypes): Todo[] {
  switch (action.type) {

    case TodoActionEnums.AGREGAR_TODO:
        const todo = new Todo(action.texto);
        return [ ...state, todo ];

    case TodoActionEnums.TOGGLE_TODO:
        return state.map( todoEdit => {
          if (todoEdit.id === action.id) {
            return {
              ...todoEdit,
              completado: !todoEdit.completado
            };
          } else {
            return todoEdit;
          }
        });

    default: {
      return state;
    }
  }
}

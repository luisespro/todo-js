import { Todo } from './todo.class';

export class TodoList {

    constructor() {

        // this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {

        this.todos = this.todos.filter(todo => todo.id != id) // esto va a sobreeescribir el array this.todos, eliminando el todo que coincida con el id que recibo
        this.guardarLocalStorage();
    }

    marcarCompletado(id) { // se hace un ciclo for para barrer los valores del arreglo de this.todos

        for (const todo of this.todos) { // se evalua el todo que tengo para ver si es igual al id de marcarCompletado

            if (todo.id == id) { // se usa '==' porque obtendremos strings y valores numericos. 

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }

        }


    }

    eliminarCompletados() {

        this.todos = this.todos.filter(todo => !todo.completado) // se hace para obtener los todos no completados
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify(this.todos)); // esto convierte el arreglo de todos en un JSON

    }

    cargarLocalStorage() { // SI EXISTE INICIALIZA EL OBJETO con el valor que tenga el LocalStorage, Si no existe inicializa un nuevo arreglo vacio.

            // if (localStorage.getItem('todo')) {
            //     this.todos = JSON.parse(localStorage.getItem('todo')); // ESTO CONVIERTE EL JSON A OBJETO (ARRAY) es decir el estado original
            // } else {
            //     this.todos = [];
            // }


            this.todos = (localStorage.getItem('todo')) ?
                JSON.parse(localStorage.getItem('todo')) : [];

            this.todos = this.todos.map(Todo.fromJson); // .map es un metodo de los arrays
        } // this.todos = this.todos.map(obj => Todo.fromJson(obj)) es lo mismo que arriba

}
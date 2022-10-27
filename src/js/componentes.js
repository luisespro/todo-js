import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${  (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${  (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;


    divTodoList.append(div.firstElementChild); // esto hace que agregue el primer li del html porque no es buena practica agregar un div como si fuera un li

    return div.firstElementChild;

}


// Eventos
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) { // sea hace > 0 para que no se creen todo vacios (al darle enter sin escribir nada)

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo); // para crear el nuevo todo en el HTML usando la funcion que ya creamos
        txtInput.value = ''; // esto se hace para borrar el texto luego de darle enter
    }

});

// OTRO EVENTO

divTodoList.addEventListener('click', (event) => {


    const nombreElemento = event.target.localName; //  input, label, button en el html (es para saber a que le dan click, usando la informacion que nos da el event)
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id'); // para recuperar el id del li unicamente 


    if (nombreElemento.includes('input')) { //  click en el check, es la lógica para marcar como completados los todo
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); // para ver la clase que pone el tachado, el classList hace referencia a todas las clases, para agregar o cambiar una clase es toggle, que es completed

    } else if (nombreElemento.includes('button')) { // hay que borrar el todo

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }


});

// OTRO EVENTO

btnBorrar.addEventListener('click', () => { // Esto hara que al hacer click en el boton borrar completados, efectivamente se borren del arreglo

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) { // este ciclo for inverso es para barrer el array y buscar los completados, lo peculiar es que se hace desde el final al principion para que cuando el ciclo haga el barrido no salte alguna posicion al cambiar los indices del array.

        const elemento = divTodoList.children[i]; // SE TRABAJA CON EL HTML y no con la clase para perderse con los indices

        if (elemento.classList.contains('completed')) { // con esto podemos saber cual esta marcado como completado, al evaluar la clase "completed" del li 
            divTodoList.removeChild(elemento);
        }

    }

});


// OTRO EVENTO 

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;

        }


    }



});
export class Todo {

    static fromJson({ id, tarea, completado, creado }) { // Se crea un metodo estatico, se usa la destructuracion de argumentos ({})

        const tempTodo = new Todo(tarea); // Nueva instancia y luego se hace referencia a las propiedades

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea) {

        this.tarea = tarea;

        this.id = new Date().getTime(); // // 12312312312321 el getTime dara un valor numerico de la hora actual que podremos usar como un ID
        this.completado = false;
        this.creado = new Date();

    }

    imprimirClase() {
        console.log(`${ this.tarea } - ${ this.id }`);
    }

}
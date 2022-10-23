//Clase constructora de Maestros
class Maestros {
    constructor(id, name, apellido, materia, mail, contraseña) {
        this.id = id;
        this.name = name;
        this.apellido = apellido;
        this.materia = materia;
        this.mail = mail;
        this.contraseña = contraseña;
    }
}
//Array Maestros
const maestros = [
    new Maestros(1, "Carlos", "Blanco", "Embebidos", "carlosblanco@alejandrovolta.edu.ar", "123456"),

]
//Clase constructora de Materias
class Materias {
    constructor(nomMateria) {
        this.nomMateria = nomMateria;
    }
}
//Clase constructora de Alumnos
class Alumno {
    constructor(id, name, apellido, mail, contraseña, ip) {
        this.id = id;
        this.name = name;
        this.apellido = apellido;
        this.mail = mail;
        this.contraseña = contraseña;
        this.ip = ip;
        this.materias = [
            new Materias("Pin Caja"),
        ];
    }
}
//Array con nombre de las materias
const materiasName = ["Pin Caja"];
//Array de alumnos
const alumnos = [
    new Alumno(001, "Alexander", "Vasquez", "44914525@alejandrovolta.edu.ar",  "44914525", "187.111.140.204"),
    new Alumno(002, "Daniel", "Barrientos", "45069069@alejandrovolta.edu.ar", "45069069", "157.111.140.205"),
    new Alumno(003, "Leandro", "Gutierrez", "45323718@alejandrovolta.edu.ar", "45323718","167.111.150.204"),
    new Alumno(004, "Diego", "Salazar", "95970213@alejandrovolta.edu.ar", "95970213", "181.111.140.214"),
]

//Llama al elemento contain
const contain = document.getElementById("contain");
//Evento de carga para llamar a la funcion logear
window.onload = logear();
//Funcion logear para recopilar datos del select
function logear() {
    const btnLog = document.getElementById("btnIngresar");
    btnLog.onclick = () => {
        const selection = document.getElementById("typePerson");
        let option = selection.options[selection.selectedIndex].value;
        switch (option) {
            case "maestro":
                console.log("entro a maestro")
                logGeneral(maestros, showDateMaster);
                break;
            case "alumno":
                console.log("entro a alumno")
                logGeneral(alumnos, showDateAlumno);
                break;
            default:
                alert("La contraseña o El Mail o el cargo son incorrectos");
                console.log("no funco")
        }
    }
}
//Funcion logearPara pedir datos y en base al select verificar en los dos arrays y enviar a una funcion.
//busca el elemento y si todo coincide llama a la funcion en caso contrario muestra un mensaje
function logGeneral(lista, funcion) {
    let mail = document.getElementById("addres").value;
    let password = document.getElementById("password").value;
    let datos = lista.find((element) => element.mail === mail)
    if (datos != undefined) {
        if (datos.contraseña === password) {
            outAlert();
            funcion(datos);
        } else {
            alert("La contraseña o El Mail o el cargo son incorrectos");
        }
    } else {
        alert("La contraseña o El Mail o el cargo son incorrectos");
    }
}
//funcion personal de alert para mostrar un mensaje de error en un elemento de id alert
function alert(msg) {
    const alerta = document.getElementById("alert");
    alerta.innerText = msg;
}
//Funcion para limpiar el alert
function outAlert() {
    const alerta = document.getElementById("alert");
    alerta.innerText = ""
}
//Funcion para mostrar interfaz de los profesores
function showDateMaster(persona) {
    let alumnos = getAlumnos();
    contain.innerHTML = `
    <div>
        <img src="./img/logo.png" alt="logoColegio"
    </div>
    <h1>Bienvenido Maestro ${persona.name} ${persona.apellido}</h1>
        <h3>Pin actual 1904</h3>
            <div class="mb-3">
                <div class="row">
                    ${alumnos}
                </div>
            </div>
            <div class="mb-3">
            <button type="button" class="btn btn-primary" id="btnReturn">Log out</button>
            </div>
            `
    const btnReturn = document.getElementById("btnReturn");
    btnReturn.onclick = () => {
        showLogear();
    }
    getBtnVerAlu(persona);
}
//Funcion para mostrar interfaz de logear
function showLogear() {
    contain.innerHTML = `
    <img src="./img/logo.png" alt="logoColegio">
    <h1>Alejandro Volta</h1>
    <div class="mb-3">
        <label for="addres" class="form-label">Email</label>
        <input type="email" class="form-control" id="addres" placeholder="name@example.com">
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Contraseña">
    </div>
    <select class="form-select mb-3" aria-label="Default select example" id="typePerson">
        <option selected>Eliga su puesto</option>
        <option value="maestro">Maestro</option>
        <option value="alumno">Alumno</option>
    </select>
    <p id="alert"></p>
    <button type="button" class="btn btn-primary" id="btnIngresar">Ingresar</button>
    `
    logear();
}
//Funcion para recibir todos los alumnos disponibles y crearles una card y devolver ese string
function getAlumnos() {
    let string = "";
    for (const alumno of alumnos) {
        string += `
        <div class="col-md-6 col-xl-4 my-2" >
                        <div class="card m-auto" >
                            <div class="card-body">
                                <h5 class="card-title">${alumno.name} ${alumno.apellido}</h5>
                                <button type="button" class="btn btn-primary btnDatos ${alumno.id}" >Datos</button>
                            </div>
                        </div>
                    </div>
        `
    }
    return string;
}
//Funcion para darle un evento a todos los botones de la interfaz del profesor
//Un boton para editar notas y otro boton para verlas directamente
function getBtnVerAlu(maestro) {
    const btnDatos = document.querySelectorAll(".btnDatos");
    btnDatos.forEach((btn, index) => {
        btn.onclick = () => {
            let arrayClasname = btn.className.split(" ");
            let index = parseInt(arrayClasname[3]);
            const alumnoFind = alumnos.find((alumno) => alumno.id === index)
            editAlum(alumnoFind, maestro);
        }
    })
    btnVernota.forEach(btn => {
        btn.onclick = () => {
            let arrayClasname = btn.className.split(" ");
            let index = parseInt(arrayClasname[3]);
            const alumnoFind = alumnos.find((alumno) => alumno.id === index)
            showNotesAlumno(alumnoFind, maestro.materia, showDateMaster, maestro);
        }
    })
}
//funcion para mostrar interfaz para editar notas, con eventos para editar las notas
function editAlum(alumno, maestro) {
    contain.innerHTML = `
    <h1>Datos de ${alumno.name} ${alumno.apellido}</h1>
            <div class="mb-3">
                <th> IP alumno ${alumno.ip}</th>
                <div>
                <th> ${alumno.mail}</th>
                </div>
            </div>
            <p id="alert"></p>
            <button type="button" class="btn btn-primary" id="btnReturn">Volver</button>
    `
    //evento para volver a la interfaz anterior
    const btnReturn = document.getElementById("btnReturn");
    btnReturn.onclick = () => {
        showDateMaster(maestro)
    }
}
//Funcion para mostrar la interfaz al ingresar como alumno
function showDateAlumno(alumno) {
    let rowMaterias = getRowAlumno();
    contain.innerHTML = `
    <div>
        <img src="./img/logo.png" alt="logoColegio"
    </div>
    <h1> Bienvenido ${alumno.name}</h1>
            <div class="row">
                ${rowMaterias}
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-primary" id="btnReturn">Log out</button>
            </div>
    `
    //evento para return a logear
    const btnReturn = document.getElementById("btnReturn")
    btnReturn.onclick = () => {
        showLogear();
    }
    btnVerNotaMateria(alumno)
}
//funcion para crear las cards de las materias con sus botones
function getRowAlumno() {
    let string = "";
    for (const nameMat of materiasName) {
        string += `<div class="col-md-6 col-xl-4 my-2">
                    <div class="card m-auto " >
                        <div class="card-body">
                            <h5 class="card-title">${nameMat}</h5>
                            <th> Pin del dia actual 1904 </th>
                        </div>
                    </div>
                </div>`
    }
    return string;
}
//Funcion para darles eventos a los botones
function btnVerNotasMateria(alumno) {
    const btnMaterias = document.querySelectorAll(".btnMaterias");
    btnMaterias.forEach((btn) => {
        btn.onclick = () => {
            const materia = alumno.materias.find((materia) => materia.nomMateria === btn.id);
            showNotesAlumno(alumno, materia.nomMateria, showDateAlumno, alumno);
        }
    })
}
const ingresaCalificacion = document.getElementById("ingresaCalificacion");
const ingresaNombre = document.getElementById("ingresaNombre");
const ingresaApellidoPat = document.getElementById("ingresaApellidoPat");
const ingresaApellidoMat = document.getElementById("ingresaApellidoMat");
const botonVisualizar = document.getElementById("botonVisualizar");
const botonGuardar = document.getElementById("botonGuardar");
const formularioAlumno = document.getElementById("formularioAlumno");
const nombreA = document.getElementById("nombreA");
const apellidoPA = document.getElementById("apellidoPA");
const apellidoMA = document.getElementById("apellidoMA");
const calificacionA = document.getElementById("calificacionA");
const tarjeta = document.getElementById("tarjeta");
const promedioResultado = document.getElementById("promedioResultado");
const aprobadosResultado = document.getElementById("aprobadosResultado");
const reprobadosResultado = document.getElementById("reprobadosResultado");
const botonLimpiar = document.getElementById("botonLimpiar");
const arregloCal = new Map();
let alumnos = [];
let totalAlumnos = alumnos.length;

/*-----------------validaciones-----------------*/
function validaCadenas (cadena){
    const patron = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;
    return patron.test(cadena.trim());
}

function validaCalificación (){
    const calificacionString = ingresaCalificacion.value;
    if(calificacionString === ""){
         Swal.fire({
            title:"Ingresa una calificación válida",
            width: 400,
            icon:"error",
            padding: "3em",
            color: "#85193C"
            }).then(() => {
                ingresaCalificacion.value = "";
                console.log("Nombre limpiado");
                console.log("Valor actual:", ingresaNombre.value);
            });
        return;
    }
    const calificacionIngresada = Number(calificacionString);
    if (Number.isNaN(calificacionIngresada) || calificacionIngresada <1 || calificacionIngresada >10 ){
        Swal.fire({
            title:"Ingresa una calificación válida",
            width: 400,
            icon:"error",
            padding: "3em",
            color: "#85193C"
            }).then(() => {
                ingresaCalificacion.value = "";
            });
        return;
    }
    return calificacionIngresada;
}
/*---------------funciones formulario--------------*/
function limpiaCampos(){
    ingresaNombre.value = "";
    ingresaApellidoPat.value = "";
    ingresaApellidoMat.value = "";
    ingresaCalificacion.value = "";
}

function llenaArreglo(calificacionIngresada){
    const nombreCompleto = `${ingresaNombre.value} ${ingresaApellidoPat.value} ${ingresaApellidoMat.value}`;
    if(!validaCadenas(ingresaNombre.value)){
        Swal.fire({
        title:"Ingresa un nombre válido, no puedes ingresar números o caracteres especiales",
        width: 400,
        icon:"error",
        padding: "3em",
        color: "#A6361E"
        }).then(() => {
            ingresaNombre.value = "";
        });
        return;
    }
    if(!validaCadenas(ingresaApellidoPat.value)){
        Swal.fire({
        title:"Ingresa un apellido valido, no puedes ingresar números o caracteres especiales",
        width: 400,
        icon:"error",
        padding: "3em",
        color: "#85193C"
        }).then(() => {
            ingresaApellidoPat.value = "";
        });
        return;
    }
    if(!validaCadenas(ingresaApellidoMat.value)){
        Swal.fire({
        title:"Ingresa un apellido valido, no puedes ingresar números o caracteres especiales",
        width: 400,
        icon:"error",
        padding: "3em",
        color: "#85193C"
        }).then(() => {
            ingresaApellidoMat.value = "";
         });
        return;
    }
    alumnos.push({
    nombre: ingresaNombre.value,
    apellidoP: ingresaApellidoPat.value,
    apellidoM: ingresaApellidoMat.value,
    calificacion: calificacionIngresada
    });
    arregloCal.set(nombreCompleto,calificacionIngresada);
    console.log(alumnos[0].nombre,
                alumnos[0].apellidoP,
                alumnos[0].apellidoM,
                alumnos[0].calificacion);
    console.log(alumnos);
    limpiaCampos();
    return true;
}

function tarjetaDatos(){
    nombreA.textContent = "Nombre: " + ingresaNombre.value;
    apellidoPA.textContent = "Apellido Paterno: " + ingresaApellidoPat.value;
    apellidoMA.textContent = "Apellido Materno: " + ingresaApellidoMat.value;
    calificacionA.textContent = "Calificación: " + ingresaCalificacion.value;
}

formularioAlumno.addEventListener("submit", function(event){
    event.preventDefault();
    const calificacionIngresada = validaCalificación();
    if(calificacionIngresada === undefined){
        return;
    }
    const alumnoGuardado = llenaArreglo(calificacionIngresada);
    if(!alumnoGuardado){
        return;
    }
    mostrarLista();
    promedio();
    aprobados();
    tarjeta.style.display = "none";
});

botonVisualizar.addEventListener("click",() => {
    if (
        ingresaNombre.value === "" ||
        ingresaApellidoPat.value === "" ||
        ingresaApellidoMat.value === "" ||
        ingresaCalificacion.value === ""
    ) {
        Swal.fire({
            title: "No hay datos para mostrar",
            width: 400,
            icon: "warning",
            padding: "3em",
            color: "#85193C"
        });

        return;
    }
    tarjetaDatos();
    tarjeta.style.display = 'block';
});

botonLimpiar.addEventListener("click", limpiaCampos);
/*--------------------LISTA---------------------*/
const tbody = document.querySelector("#tablaAlumnos tbody");
function mostrarLista() {
    tbody.innerHTML = "";
    alumnos.forEach(alumno =>{
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${alumno.nombre} ${alumno.apellidoP} ${alumno.apellidoM}</td>
            <td>${alumno.calificacion}</td>
            `;
        tbody.appendChild(fila);
    });
}

function promedio() {
    if(alumnos.length === 0) {
        promedioResultado.textContent = "Promedio: ";
        return;
    }
    let sumaCalificacion = 0;
    alumnos.forEach(alumno =>{
        sumaCalificacion += alumno.calificacion;
    });
    let promedio = sumaCalificacion / alumnos.length;
    let unDecimal = promedio.toFixed(1);
    promedioResultado.textContent = "Promedio: " + unDecimal;
    //console.log("promedio: ", promedio);
    //console.log("Alumnos:", alumnos);
}

function aprobados() {
    let aprobados = 0;
    let reprobados = 0;
    alumnos.forEach(alumno => {
        if(alumno.calificacion >= 6){
            aprobados +=1;
        }else{
            reprobados+=1;
        }
    });
    aprobadosResultado.textContent = "Aprobados: " + aprobados;
    reprobadosResultado.textContent = "Reprobados: " + reprobados;
    //console.log("Aprobados: ",aprobados);
    //console.log("Reprobados: ",reprobados);
}

//crear los selectores 
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
let editar;

class citas{

    constructor(){
        this.citas = []
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita];
        console.log(this.citas);//para ir viendo como se van agregando las citas
    }

    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !== id);
    }

    editarCita(citaAct){
        this.citas = this.citas.map(citas=>citas.id === citaAct.id ? citaAct : citas);
    }

    /*sintaxis
     condicion ? true : false

     estatus>30 ? console.log('la temperatura esta elevada') : console.log('temperatura esta fresca')
    
    let estatus;
    if(estatus>30){

        console.log('la temperatura esta elevada')

    }else{
        console.log('temperatura esta fresca')
    }
     */ 

}

//clase para todo el contenido de la interfas
class ui{ 
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;
        //el . significa que se esta contantatenando de css
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'))

        setTimeout(()=>{
            divMensaje.remove()
        },3000);
       
    }

    imprimirCitas({citas}){
        //console.log('imprimir citas')
        this.limpiarHTML();

        citas.forEach(citas => {
            const {mascota, propietario, telefono, hora, fecha, sintomas, id} = citas;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            //estamos creando un atributo personalizado
            divCita.dataset.id = id;

            //generar los textos para las fichas de las citas
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent = mascota;
            divCita.appendChild(mascotaParrafo);
            

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: ${propietario}</span>
            `;
            divCita.appendChild(propietarioParrafo)
            
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: ${telefono}</span>
            `;
            divCita.appendChild(telefonoParrafo)
            
            const fechaParrafo = document.createElement('p');
           fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: ${fecha}</span>
            `;
            divCita.appendChild(fechaParrafo)
            
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: ${hora}</span>
            `;
            divCita.appendChild(horaParrafo)
            
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: ${sintomas}</span>
            `;
            
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 1412-2m0 012-2m-2 21-2-2m2 212 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = ()=> eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = ()=> cargarEdicion(citas);

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        });

    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const administrarCitas = new citas();
const useri = new ui();

eventListener();
function eventListener(){
    mascotaInput.addEventListener('input',datosCitas);
    propietarioInput.addEventListener('input',datosCitas);
   telefonoInput.addEventListener('input',datosCitas);
    fechaInput.addEventListener('input',datosCitas);
    horaInput.addEventListener('input',datosCitas);
   sintomasInput.addEventListener('input',datosCitas);
    formulario.addEventListener('submit',nuevaCita);
}

//estructura para guardar la informacion
const citasObj = {
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:'',
}


function datosCitas(e){
    //guardar los valores dentro del objeto
    //console.log(e.target.name)
    citasObj[e.target.name] = e.target.value;
    //console.log(citasObj)
}

function nuevaCita(e){
    //validar y agregar una nueva cita
    e.preventDefault();

   
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

    //validar
    if(mascota==='' || propietario==='' || telefono==='' || fecha==='' || hora==='' || sintomas===''){
        //console.log('Todos los campos son obligatorios')
        useri.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    if(editar){
        //console.log('estoy editando');

        formulario.querySelector('button[type=submit]').textContent = 'Crear Cita';
        editar = false;

        administrarCitas.editarCita({...citasObj});

    
        useri.imprimirAlerta('Se ha modificado la cita correctamente');
    }else{
        //agregando nueva cita
       //datos completos para crear la nueva cita
       console.log('creando nueva cita');
       citasObj.id = Date.now();
       administrarCitas.agregarCita({...citasObj});
       useri.imprimirAlerta('Se ha agregado su cita correctamente');

    }

    
    console.log(citasObj)


    formulario.reset();
    reiniciarObjeto();
    useri.imprimirCitas(administrarCitas); 

}

function reiniciarObjeto(){
    citasObj.mascota ='',
    citasObj.propietario ='',
    citasObj.telefono ='',
    citasObj.fecha ='',
    citasObj.hora ='',
    citasObj.sintomas ='';
}

function eliminarCita(id){
    //console.log('eliminar cita')
    administrarCitas.eliminarCita(id);
    //mostrar un mensaje
    useri.imprimirAlerta('La cita se ha eliminado correctamente');

    //actualizar
    useri.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita){
    //console.log('editar')
    const {mascota, propietario, telefono, hora, fecha, sintomas, id} = cita;

    //llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    horaInput.value = hora;
    fechaInput.value = fecha;
    sintomasInput.value = sintomas;

    //vamos a llenar el objeto
    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.hora = hora;
    citasObj.fecha = fecha;
    citasObj.sintomas = sintomas;
    citasObj.id = id;

    //vamos a cambiar el texto del boton 
    formulario.querySelector('button[type=submit]').textContent = 'Guardar';

    editar = true;
}

const formE1=document.querySelector('.form');

/*---
Intercepta el submit del formulario
*/

formE1.addEventListener('submit',  event => {
    event.preventDefault();
    const formData = new FormData(formE1);
    const data = Object.fromEntries(formData);
    console.log('Revisa el valor del form');

    console.log(data);

    /*---
    Realiza validaciones en los datos del formulario antes de procesar
    */

    if (data.surname == '' || data.password == '') {
        console.log('debe indicar usuario');
        document.getElementById('resultado').style.color="RED";
        document.getElementById('resultado').style.textAlign = "center";
        document.getElementById('resultado').textContent='Debe informar usuario y password para  completar el acceso';
        return;
    }

    if (data.surname == 'pec'){
        console.log('pec no es bienvenido en éste sistema');
        const m=`<li>El usuario <pec> no es bienvenido en éste sistema</li>`;
        document.getElementById('resultado').style.color="RED";
        document.getElementById('resultado').style.textAlign = "center";
        document.getElementById('resultado').textContent='El usuario <pec> no es bienvenido en éste sistema';
        return;
    }
    if (data.termscondition != 'on') {
        console.log('no aceptó los T&C no se puede loggear');
        document.getElementById('resultado').style.color="RED";
        document.getElementById('resultado').style.textAlign = "center";
        document.getElementById('resultado').textContent='Debe aceptar los T&C para poder usar el sistema';
        return;
    }
console.log ("Contact:"+data.contacto+"password"+data.password);
    const listarTicketURL="http://127.0.0.1:5500/listarTicket.html";

    /*---
    Forma URL para acceder, typicode es un fake API REST para pruebas
    */
    //const testLoginURL='https://my-json-server.typicode.com/lu7did/testJASON/posts/';
   // const api_LoginURL=testLoginURL+data.id;

    /*---
      Dirección de REST API en AWS
    */
      const RESTapi_LoginURL="https://xfeclhzb4c.execute-api.us-east-1.amazonaws.com/loginClienteEmail";
        const api_LoginURL=RESTapi_LoginURL+"?contacto="+data.contacto+"&password="+data.password;
    console.log("Contacto:", data.contacto);
    console.log("Password:", data.password);
    console.log("Data:", data);
    /* console.log('Valor de api_LoginURL:', api_LoginURL);
    /*---?contacto="+data.id+
    Genera objeto HTML a ser actualizado en el tag identificado como "app"
    */
    //const RESTapi_LoginURL = "https://xfeclhzb4c.execute-api.us-east-1.amazonaws.com/loginClienteEmail";

// Asegúrate de que los parámetros estén correctamente codificados antes de agregarlos a la URL



// Construye la URL con los parámetros


    /*
    id de cliente para test 
    0533a95d-7eef-4c6b-b753-1a41c9d1fbd0
    */

    const HTMLResponse=document.querySelector("#app");
    const ul=document.createElement("ul");

    const tpl=document.createDocumentFragment();
    console.log("accediendo URL "+api_LoginURL);       
    console.log("data es "+JSON.stringify(data));

    /*-----
    Realiza el acceso al API Rest utilizando gestión de sincronización mediante promesas
    */
    fetch(`${api_LoginURL}`)

    .then(res => {
        return res.json();
    }).then(users=>{
        console.log(users);
          if (users.response == 'OK') {         //<==Habilitar esto para dejar que el API REST verifique sin exponer la password
//        if (users.password == data.password) {
            console.log('La password es correcta');
            console.log("nombre("+users.nombre+") fecha_ultimo_ingreso("+users.fecha_ultimo_ingreso+")");
            document.getElementById('resultado').style.color="BLACK";
            document.getElementById('resultado').textContent='Bienvenido al sistema '+users.nombre+', ultimo ingreso '+users.fecha_ultimo_ingreso;
            window.location.href = listarTicketURL+"?id="+users.id+"&contacto="+users.contacto+"&nombre="+users.nombre+"&ultimo="+users.fecha_ultimo_ingreso;
        }  else {
            console.log('La password no es correcta');
            document.getElementById('resultado').style.color="RED";
            document.getElementById('resultado').textContent='Error de login, intente nuevamente';
        }
        
    })
});
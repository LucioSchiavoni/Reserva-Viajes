class User {
    constructor(nombre, paisOrigen, paisDestino, fechaIda, fechaVuelta, precio) {
        this.nombre = nombre;
        this.paisOrigen = paisOrigen;
        this.paisDestino = paisDestino;
        this.fechaIda = fechaIda;
        this.fechaVuelta = fechaVuelta;
        this.precio = precio;
    };
};

let precio = [1600];

let usuarios = [];

localStorage.getItem("usuarios") ? usuarios = JSON.parse(localStorage.getItem("usuarios")) : localStorage.setItem("usuarios", JSON.stringify(usuarios));

const formUser = document.getElementById("formUser");
const botonReserva = document.getElementById("botonReserva");
const divReserva = document.getElementById("divReserva");


////Subo nueva reserva al local storage
formUser.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    let reservaForm = new FormData(e.target);
    let reservaUser = new User(reservaForm.get("nombre"), reservaForm.get("paisOrigen"),reservaForm.get("paisDestino"), reservaForm.get("fechaIda"), reservaForm.get("fechaVuelta"));
    usuarios.push(reservaUser);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    formUser.reset();
    Toastify({
        text: "Reserva confirmada",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

});

////Muestro la reserva al usuario
botonReserva.addEventListener("click", () => {
    let arrayUser = JSON.parse(localStorage.getItem("usuarios"));
    let itemDiv = "";
    arrayUser.forEach((usuario, indice) => {
        itemDiv += `<div class="card w-50" id="usuario${indice}">
  <div class="card-body">
    <h5 class="card-title">Perfecto ${usuario.nombre}</h5>
    <p class="card-text">Su vuelo a ${usuario.paisDestino} a sido reservado para el ${usuario.fechaIda} hasta el ${usuario.fechaVuelta} desde el aeropuerto de ${usuario.paisOrigen}</p>
    <p class="card-text">con un total de $${precio} </p>
    <button class="btn btn-primary">Cancelar reserva</button>
  </div>
</div> `
    });
    divReserva.innerHTML = itemDiv;

 arrayUser.forEach((usuario,indice) =>{
    let botonCard = document.getElementById(`usuario${indice}`).lastElementChild.lastElementChild;
    botonCard.addEventListener("click", ()=>{
        document.getElementById(`usuario${indice}`).remove();
        usuario.splice(indice, 1);
        usuario.removeItem(`usuario${indice}`);
        Toastify({
            text: "Reserva cancela",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast(); 
    });
});
});

////Buscador de paises
const inputId = document.getElementById("inputForm");
const form = document.getElementById("formulario");
const formularioData = data => {
    form.addEventListener("keyup", e => {
        e.preventDefault();
        const letraUser = inputId.value.toLowerCase();
        const arrayFilter = data.filter(item => {
            const inputData = item.translations.spa.common.toLowerCase();
            if (inputData.indexOf(letraUser) !== -1) {
                return item;
            };
        });
        banderasId(arrayFilter);
    });
};


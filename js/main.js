// alert("Invocado desde Archivo externo de Javascript");

document.addEventListener("DOMContentLoaded", ()=>{
    let hmbButton = document.querySelector("header .hmb-button");
    let nav = document.querySelector("header nav");
    hmbButton.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        nav.classList.toggle("hidden");
    });

    // Instanciando el Carusel
    let caruselInstance = new Carusel(".carusel");
});

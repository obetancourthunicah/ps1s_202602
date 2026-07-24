const isEmptyRegex = /^\s*$/;
const isValidEmailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
document.addEventListener("DOMContentLoaded", ()=>{
    let form1 = document.getElementById("form1");
    let fieldA1 = document.getElementById("field_a_1");
    let fieldA1Parent = fieldA1.parentElement;
    let fieldA2 = document.getElementById("field_a_2");
    let fieldA2Parent = fieldA2.parentElement;
    let fieldErrors = {};

    form1.addEventListener("submit", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        // Aqui haremos las validaciones
        if (validateFormulario()){
            form1.submit();
        };
    });
    // (function validateFormulario(){

    // }).bind(this);
    const validateFormulario = ()=>{
        let focused = false;
        let hasError = false;
        const fieldA1Value = fieldA1.value;
        if(isEmptyRegex.test(fieldA1Value)) {
            if(!fieldErrors[fieldA1.id]){
                fieldA1Parent.classList.add("error");
                const fieldA1ErrorSpan = document.createElement("SPAN");
                fieldA1ErrorSpan.classList.add("col-12", "col-l-8", "offset-l-4");
                fieldA1ErrorSpan.innerHTML = "¡El campo A1 no puede estar vacio!";
                fieldErrors[fieldA1.id] = fieldA1ErrorSpan;
                fieldA1Parent.appendChild(fieldA1ErrorSpan);
                const changeHandler = ()=>{
                    fieldA1Parent.classList.remove("error");
                    fieldA1ErrorSpan.remove();
                    fieldA1.removeEventListener("change", changeHandler);
                    delete fieldErrors[fieldA1.id];
                    validateFormulario();
                }
                fieldA1.addEventListener("change", changeHandler);
                if(!focused) {
                    focused = true;
                    fieldA1.focus();
                }
            }
            hasError=true;
        }
        const fieldA2Value = fieldA2.value;
        if(!isValidEmailRegex.test(fieldA2Value)) {
            if(!fieldErrors[fieldA2.id]){
                fieldA2Parent.classList.add("error");
                const fieldA2ErrorSpan = document.createElement("SPAN");
                fieldA2ErrorSpan.classList.add("col-12", "col-l-8", "offset-l-4");
                fieldA2ErrorSpan.innerHTML = "¡El campo A2 no es un correo válido!";
                fieldErrors[fieldA2.id] = fieldA2ErrorSpan;
                fieldA2Parent.appendChild(fieldA2ErrorSpan);
                const changeA2Handler = ()=>{
                    fieldA2Parent.classList.remove("error");
                    fieldA2ErrorSpan.remove();
                    fieldA2.removeEventListener("change", changeA2Handler);
                    delete fieldErrors[fieldA2.id];
                    validateFormulario();
                }
                fieldA2.addEventListener("change", changeA2Handler);
                if(!focused) {
                    focused = true;
                    fieldA2.focus();
                }
            }
            hasError=true;
        }
        return !hasError;
    }
});
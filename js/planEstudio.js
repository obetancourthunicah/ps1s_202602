const PlanICC_IF01004 = {
    "codigo": "IF01004",
    "nombre": "Ingeniería en Ciencias de la Computación",
    "clases": 60,
    "creditos": 196,
    "bloques": [
        {
            codigo:"I",
            asignaturas:[
                {
                    codigo: "ES101",
                    nombre: "Español",
                    creditos: 3,
                },
                {
                    codigo: "MT101",
                    nombre: "Matemáticas",
                    creditos: 4,
                },
                {
                    codigo: "IF103",
                    nombre: "Introducción a las Ciencias de la Computación",
                    creditos: 3,
                },
                {
                    codigo: "SC101",
                    nombre: "Sociología",
                    creditos: 3,
                },
                {
                    codigo: "FI101",
                    nombre: "Filosofía",
                    creditos: 3,
                },
            ]

        },
        {
            codigo:"II",
            asignaturas:[
                {
                    codigo: "ES201",
                    nombre: "Expresión Oral y Escrita",
                    creditos: 3,
                    requisito: ["ES101"]
                },
                {
                    codigo: "MT201",
                    nombre: "Precálculo",
                    creditos: 4,
                    requisito: ["MT101"]
                },
                {
                    codigo: "IF200",
                    nombre: "Fundamentos y Lógica de Programación",
                    creditos: 3,
                    requisito: ["IF103"]
                },
                {
                    codigo: "HS101",
                    nombre: "Historia de Honduras",
                    creditos: 3,
                },
                {
                    codigo: "CR201",
                    nombre: "El Hombre Frente a la Vida",
                    creditos: 3,
                    requisito: ["FI101"]
                },
            ]

        },
        {
            codigo:"III",
            asignaturas:[
                {
                    codigo: "MT202",
                    nombre: "Estadística I",
                    creditos: 3,
                    requisito: ["MT101"]
                },
                {
                    codigo: "MT303",
                    nombre: "Cálculo I",
                    creditos: 4,
                    requisito: ["MT201"]
                },
                {
                    codigo: "IF214",
                    nombre: "Programación Estructurada I",
                    creditos: 3,
                    requisito: ["IF200"]
                },
                {
                    codigo: "IF213",
                    nombre: "Estructuras Discretas",
                    creditos: 3,
                    requisito: ["IF200"]
                },
                {
                    codigo: "IF394",
                    nombre: "Diseño Gráfico",
                    creditos: 3,
                },
            ]

        },
    ]
};

class PlanDeEstudio {
    rootElement = null;
    planEstudioData = null;

    selectedAsg = null;
    asgStructure = {};

    constructor ( rootSelector, planEstudioData) {
        this.rootElement = document.querySelector(rootSelector);
        if (!this.rootElement) {
            throw new Error("Se requiere un elemento HTML para generar el plan");
        }
        this.planEstudioData = planEstudioData;
        if (!this.planEstudioData) {
            throw new Error("Se requiere de data del plan para generar el UX");
        }
        this.generarUX();
    }

    generarUX() {
        this.rootElement.classList.add("plan");
        let H1Element = document.createElement("H1");
        H1Element.innerHTML = `${this.planEstudioData.codigo} - ${this.planEstudioData.nombre}`;
        this.rootElement.appendChild(H1Element);

        // Crear los bloques

        // const cuadrados = ([1,2,3,4,5,6]).map((o => {
        //     return o * o;
        // }));
        // console.log(cuadrados);

        this.planEstudioData.bloques.forEach((bloqueData)=> {
            let bloqueUX = document.createElement("SECTION");
            bloqueUX.classList.add("bloque");
            let bloqueLabel = document.createElement("DIV");
            bloqueLabel.classList.add("label")
            bloqueLabel.innerHTML = `${bloqueData.codigo}`;
            let bloqueAsignaturas = document.createElement("DIV");
            bloqueAsignaturas.classList.add("asignaturas");
            //Generar las Asignaturas
            bloqueData.asignaturas.forEach((asignaturaData)=>{
                let asgUX = document.createElement("DIV");
                asgUX.classList.add("asignatura");
                let asgTitulo = document.createElement("DIV");
                asgTitulo.classList.add("asg-titulo");
                asgTitulo.innerHTML = `${asignaturaData.codigo} ${asignaturaData.nombre}`;
                let asigCrd = document.createElement("DIV");
                asigCrd.classList.add('asg-credito');
                asigCrd.innerHTML = `Crd. ${asignaturaData.creditos}`;
                asgUX.appendChild(asgTitulo);
                asgUX.appendChild(asigCrd);
                if(!this.asgStructure[asignaturaData.codigo]) {
                    let requisitos = asignaturaData.requisito || [];
                    this.asgStructure[asignaturaData.codigo] = {
                        nodo : asgUX,
                        reqs : requisitos,
                        opns: []
                    }
                    requisitos.forEach((rq)=>{
                        this.asgStructure[rq].opns.push(asignaturaData.codigo);
                    });
                }
                bloqueAsignaturas.appendChild(asgUX);
                // Ligar los Eventos
                asgUX.addEventListener("click", (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Click Levantado", asignaturaData.codigo );
                    if(this.selectedAsg){
                        /*
                            nodo:
                            reqs:
                            opns:
                        */
                       this.selectedAsg.nodo.classList.remove("selected");
                       this.selectedAsg.reqs?.forEach((rq)=>{
                        this.asgStructure[rq].nodo.classList.remove("requisito");
                       });
                       this.selectedAsg.opns?.forEach((op)=>{
                        this.asgStructure[op].nodo.classList.remove("isopenned");
                       });
                    }
                    // Asignar la nueva clase seleccionada
                    this.selectedAsg = this.asgStructure[asignaturaData.codigo];
                    console.log(this.selectedAsg);
                    this.selectedAsg.nodo.classList.add("selected");
                    this.selectedAsg.reqs?.forEach((rq)=>{
                        this.asgStructure[rq].nodo.classList.add("requisito");
                    });
                    this.selectedAsg.opns?.forEach((op)=>{
                        this.asgStructure[op].nodo.classList.add("isopenned");
                    });
                });
                
            });
            bloqueUX.appendChild(bloqueLabel);
            bloqueUX.appendChild(bloqueAsignaturas);
            this.rootElement.appendChild(bloqueUX);
        });
    }
}
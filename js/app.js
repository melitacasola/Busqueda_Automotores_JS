//variables//    
const marca = document.querySelector('#marca'),
    year = document.querySelector('#year'),
    minimo = document.querySelector('#minimo'),
    maximo = document.querySelector('#maximo'),
    puertas = document.querySelector('#puertas'),
    transmision = document.querySelector('#transmision'),
    color = document.querySelector('#color');

//contenedor de resultados
const resultado = document.querySelector('#resultado'),
    max = new Date().getFullYear(),
    min = max - 10;

//datos de busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//eventos//
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //muestra automov
    //llena opc de año
    llenarSelect();

});


//evento p/ select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    //tengo que rellenar datosBusq con el valor asignado
    filtrarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})


//funciones//
function mostrarAutos(autos) {
    limpiarHTML(); //elimina el HTML previo

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto
        const autoHTML = document.createElement('p');
        // dentro del ID resultado, creo una etiqueta P qe muestre la lista, cada iteracion de lista auto x forEach, 
        //creo la etiqueta HTML para insertarse con append en cada <p>
        autoHTML.textContent = `
    ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $ ${precio} - Color:  ${color}

    `
        //insertar resultado al html
        resultado.appendChild(autoHTML)
    });
}

//limpiar HTML xq appndchild no limpia el HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

}

//genera años del select
function llenarSelect() {
    //cambia a mayor xq quiero ver de mayor a menor
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion); //p/q agregue cada año ala etiqta Select Id = year
    }
}

//filtrado de busqueda/resultado

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas)
    .filter(filtrarTransmision).filter(filtrarColor);
    if (resultado.length){
        mostrarAutos(resultado);
    } else{
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    // if(datosBusqueda.marca){
    //     return auto.marca === datosBusqueda.marca;
    // }
    // return auto;
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === parseInt(year); // en addEvent en el e.target puedo parsear sino
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo; //sin necesidad de estricto
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}




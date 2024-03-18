document.addEventListener("DOMContentLoaded", function () {
    // Tu código JavaScript aquí
});

function simular() {
    // Validar campos vacíos
    var inputs = document.querySelectorAll("input[type='number']");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert("Por favor complete todos los campos vacíos.");
            return;
        }
    }

    // Obtener valores de los inputs
    var titulo_pregrado = document.querySelector("input[name='titulo_pregrado']:checked").value;
    var especializacion_anos = parseFloat(document.querySelector("input[name='especializacion_años']").value);
    var no_clinicas_años = parseFloat(document.querySelector("input[name='no_clinicas_años']").value);
    var maestrias_años = parseFloat(document.querySelector("input[name='maestrias_años']").value);
    var doctorado_años = parseFloat(document.querySelector("input[name='doctorado_años']").value);
    var doctorado_1998 = document.querySelector("input[name='doctorado_1998']").checked;
    var categoria_docente = document.querySelector("select[name='categoria_docente']").value;
    var experiencia_investigativa_años = parseFloat(document.querySelector("input[name='experiencia_investigativa_años']").value);
    var experiencia_docente_años = parseFloat(document.querySelector("input[name='experiencia_docente_años']").value);
    var experiencia_direccion_años = parseFloat(document.querySelector("input[name='experiencia_direccion_años']").value);
    var experiencia_no_docente_años = parseFloat(document.querySelector("input[name='experiencia_no_docente_años']").value);

    // Validar valores negativos
    if (especializacion_anos < 0 || no_clinicas_años < 0 || maestrias_años < 0 || doctorado_años < 0 ||
        experiencia_investigativa_años < 0 || experiencia_docente_años < 0 || experiencia_direccion_años < 0 ||
        experiencia_no_docente_años < 0) {
        alert("Por favor ingrese valores no negativos.");
        return;
    }

    // Títulos universitarios
    var suma_titulos = titulo_pregrado === "medicina" ? 183 : 178;

    // Calcular puntajes de postgrado
    var puntaje_especializacion = calcularPuntajeEspecializacion(especializacion_anos);
    var puntaje_maestrias = calcularPuntajeMaestrias(maestrias_años);
    var puntaje_doctorado = calcularPuntajeDoctorado(doctorado_años, doctorado_1998);

    // Limitar puntaje total de postgrado a 140 puntos
    var total_puntaje_postgrado = puntaje_especializacion + puntaje_maestrias + puntaje_doctorado;
    if (total_puntaje_postgrado > 140) {
        var factor_reduccion = 140 / total_puntaje_postgrado;
        puntaje_especializacion *= factor_reduccion;
        puntaje_maestrias *= factor_reduccion;
        puntaje_doctorado *= factor_reduccion;
    }

    // Calcular puntaje por categoría docente
    var puntaje_categoria = calcularPuntajeCategoria(categoria_docente);

    // Calcular puntaje por experiencia
    var puntaje_experiencia = calcularPuntajeExperiencia(experiencia_investigativa_años, experiencia_docente_años, experiencia_direccion_años, experiencia_no_docente_años);

    // Calcular puntaje de productividad académica
    var puntaje_productividad = calcularPuntajeProductividadAcademica();

    // Calcular total de puntos
    var total_puntaje = suma_titulos + puntaje_categoria + puntaje_experiencia + puntaje_productividad;
    var sueldo_estimado = total_puntaje * 20895;

    // Mostrar resultados
    document.getElementById("puntaje_titulos").textContent = suma_titulos;
    document.getElementById("puntaje_categoria").textContent = puntaje_categoria;
    document.getElementById("puntaje_experiencia").textContent = puntaje_experiencia;
    document.getElementById("puntaje_productividad").textContent = puntaje_productividad;
    document.getElementById("total_puntaje").textContent = total_puntaje;
    document.getElementById("sueldo_estimado").textContent = '$ ' + sueldo_estimado.toLocaleString(); // Mostrar el sueldo formateado con comas
}

// Función para calcular el puntaje de especialización
function calcularPuntajeEspecializacion(anos) {
    if (anos >= 1 && anos <= 5) {
        return 15 * anos;
    } else if (anos > 5) {
        return 75;
    } else {
        return 0;
    }
}

// Función para calcular el puntaje de maestrías
function calcularPuntajeMaestrias(anos) {
    if (anos === 1) {
        return 40;
    } else if (anos > 1) {
        return 60;
    } else {
        return 0;
    }
}

// Función para calcular el puntaje de doctorado
function calcularPuntajeDoctorado(anos, doctorado_1998) {
    if (doctorado_1998) {
        return anos === 1 ? 40 : 120;
    } else {
        return anos === 1 ? 80 : 0;
    }
}

// Función para calcular el puntaje de categoría docente
function calcularPuntajeCategoria(categoria) {
    switch (categoria) {
        case "Auxiliar":
            return 37;
        case "Asistente":
            return 58;
        case "Asociado":
            return 74;
        case "Titular":
            return 96;
        default:
            return 0;
    }
}

// Función para calcular el puntaje de experiencia
function calcularPuntajeExperiencia(investigativa_años, docente_años, direccion_años, no_docente_años) {
    var puntaje_investigativa = Math.min(investigativa_años * 6, 20);
    var puntaje_docente = Math.min(docente_años * 4, 45);
    var puntaje_direccion = Math.min(direccion_años * 4, 90);
    var puntaje_no_docente = Math.min(no_docente_años * 3, 120);
    return puntaje_investigativa + puntaje_docente + puntaje_direccion + puntaje_no_docente;
}

function calcularPuntajeProductividadAcademica() {
    var total_puntaje_productividad = 0;

    // Calcular puntaje por artículos en revistas especializadas
    total_puntaje_productividad += calcularPuntajeArticulosRevistasEspecializadas();

    // Calcular puntaje por producción de videos cinematográficos o fonográficos
    total_puntaje_productividad += calcularPuntajeVideos();

    // Calcular puntaje por libros
    total_puntaje_productividad += calcularPuntajeLibros();

    // Calcular puntaje por premios, patentes, traducciones, obras artísticas y producción técnica
    total_puntaje_productividad += calcularPuntajeOtros();

    // Aplicar restricciones de máximo puntaje
    total_puntaje_productividad = aplicarRestriccionesMaximas(total_puntaje_productividad);

    return total_puntaje_productividad;
}

function calcularPuntajeArticulosRevistasEspecializadas() {
    var puntaje_total_articulos = 0;

    // Obtener los contenedores de los inputs generados dinámicamente
    var autores_A1 = document.getElementById("autores_A1");
    var autores_A2 = document.getElementById("autores_A2");
    var autores_B = document.getElementById("autores_B");
    var autores_C = document.getElementById("autores_C");
    var autores_otros_A1 = document.getElementById("autores_otros_A1");
    var autores_otros_A2 = document.getElementById("autores_otros_A2");
    var autores_otros_B = document.getElementById("autores_otros_B");
    var autores_otros_C = document.getElementById("autores_otros_C");
    var autores_reportes_A1 = document.getElementById("autores_reportes_A1");
    var autores_reportes_A2 = document.getElementById("autores_reportes_A2");
    var autores_reportes_B = document.getElementById("autores_reportes_B");
    var autores_reportes_C = document.getElementById("autores_reportes_C");

    // Calcular puntaje individual para cada autor de cada trabajo
    var puntaje_autores_A1 = calcularPuntajePorAutor15Puntos(autores_A1);//15 puntos
    var puntaje_autores_A2 = calcularPuntajePorAutor12Puntos(autores_A2);//12 puntos
    var puntaje_autores_B = calcularPuntajePorAutor8Puntos(autores_B);// 8 puntos
    var puntaje_autores_C = calcularPuntajePorAutor3Puntos(autores_C);//3 puntos
    var puntaje_autores_otros_A1 = calcularPuntajePorAutor4pto5Puntos(autores_otros_A1);//4.5 puntos
    var puntaje_autores_otros_A2 = calcularPuntajePorAutor3pto6Puntos(autores_otros_A2);//3.6 puntos
    var puntaje_autores_otros_B = calcularPuntajePorAutor2pto4Puntos(autores_otros_B);//2.4 puntos
    var puntaje_autores_otros_C = calcularPuntajePorAutor0pto6Puntos(autores_otros_C);//0.6puntos
    var puntaje_autores_reportes_A1 = calcularPuntajePorAutor9Puntos(autores_reportes_A1); // 9 puntos
    var puntaje_autores_reportes_A2 = calcularPuntajePorAutor7pto2Puntos(autores_reportes_A2);//7.2 puntos
    var puntaje_autores_reportes_B = calcularPuntajePorAutor4pto8Puntos(autores_reportes_B);//4.8 puntos
    var puntaje_autores_reportes_C = calcularPuntajePorAutor18Puntos(autores_reportes_C);//18 puntos

    // Sumar los puntajes individuales para cada autor de cada trabajo
    puntaje_total_articulos += puntaje_autores_A1;
    puntaje_total_articulos += puntaje_autores_A2;
    puntaje_total_articulos += puntaje_autores_B;
    puntaje_total_articulos += puntaje_autores_C;
    puntaje_total_articulos += puntaje_autores_otros_A1;
    puntaje_total_articulos += puntaje_autores_otros_A2;
    puntaje_total_articulos += puntaje_autores_otros_B;
    puntaje_total_articulos += puntaje_autores_otros_C;
    puntaje_total_articulos += puntaje_autores_reportes_A1;
    puntaje_total_articulos += puntaje_autores_reportes_A2;
    puntaje_total_articulos += puntaje_autores_reportes_B;
    puntaje_total_articulos += puntaje_autores_reportes_C;

    return puntaje_total_articulos;
}
function calcularPuntajeVideos() {
    var puntaje_total_videos = 0;

    // Obtener los contenedores de los inputs generados dinámicamente
    var autores_videos_internacionales = document.getElementById("autores_videos_internacionales");
    var autores_videos_nacionales = document.getElementById("autores_videos_nacionales");

    // Calcular puntaje individual para cada autor de videos internacionales 12 puntos
    var puntaje_autores_videos_internacionales = calcularPuntajePorAutor12Puntos(autores_videos_internacionales);
    // Calcular puntaje individual para cada autor de videos nacionales 7 puntos
    var puntaje_autores_videos_nacionales = calcularPuntajePorAutor7Puntos(autores_videos_nacionales);

    // Sumar los puntajes individuales de todos los autores y trabajos de videos internacionales
    puntaje_total_videos += puntaje_autores_videos_internacionales;
    // Sumar los puntajes individuales de todos los autores y trabajos de videos nacionales
    puntaje_total_videos += puntaje_autores_videos_nacionales;

    return puntaje_total_videos;
}

function calcularPuntajeLibros() {
    var puntaje_total_libros = 0;

    // Obtener los contenedores de los inputs generados dinámicamente
    var autores_libros_investigacion = document.getElementById("autores_libros_investigacion");
    var autores_libros_textos = document.getElementById("autores_libros_textos");
    var autores_libros_ensayos = document.getElementById("autores_libros_ensayos");

    // Calcular puntaje individual para cada autor de libros de investigación 20 puntos
    var puntaje_autores_libros_investigacion = calcularPuntajePorAutor20Puntos(autores_libros_investigacion);
    //15 puntos
    var puntaje_autores_libros_textos = calcularPuntajePorAutor15Puntos(autores_libros_textos);
    var puntaje_autores_libros_ensayos = calcularPuntajePorAutor15Puntos(autores_libros_ensayos);

    // Sumar los puntajes individuales de todos los autores y trabajos de libros de investigación
    puntaje_total_libros += puntaje_autores_libros_investigacion;
    // Sumar los puntajes individuales de todos los autores y trabajos de libros de texto
    puntaje_total_libros += puntaje_autores_libros_textos;
    // Sumar los puntajes individuales de todos los autores y trabajos de libros de ensayo
    puntaje_total_libros += puntaje_autores_libros_ensayos;

    return puntaje_total_libros;
}

function calcularPuntajeOtros() {
    var puntaje_total_otros = 0;

    // Obtener los contenedores de los inputs generados dinámicamente
    var autores_premios = document.getElementById("autores_premios");
    var autores_patentes = document.getElementById("autores_patentes");
    var autores_traducciones = document.getElementById("autores_traducciones");
    var autores_obras_internacionales = document.getElementById("autores_obras_internacionales");
    var autores_obras_nacionales = document.getElementById("autores_obras_nacionales");
    var autores_productos_software = document.getElementById("autores_productos_software");

    // Calcular puntaje individual para cada autor de premios 15 puntos
    var puntaje_autores_premios = calcularPuntajePorAutor15Puntos(autores_premios);
    // Calcular puntaje individual para cada autor de patentes 25 puntos
    var puntaje_autores_patentes = calcularPuntajePorAutor25Puntos(autores_patentes);
    // Calcular puntaje individual para cada autor de traducciones 15 puntos
    var puntaje_autores_traducciones = calcularPuntajePorAutor15Puntos(autores_traducciones);
    // Calcular puntaje individual para cada autor de obras internacionales 20 puntos
    var puntaje_autores_obras_internacionales = calcularPuntajePorAutor20Puntos(autores_obras_internacionales);
    // Calcular puntaje individual para cada autor de obras nacionales 14 puntos
    var puntaje_autores_obras_nacionales = calcularPuntajePorAutor14Puntos(autores_obras_nacionales);
    // Calcular puntaje individual para cada autor de productos de software 15 puntos
    var puntaje_autores_productos_software = calcularPuntajePorAutor15Puntos(autores_productos_software);

    // Sumar los puntajes individuales de todos los autores y trabajos de premios
    puntaje_total_otros += puntaje_autores_premios;
    // Sumar los puntajes individuales de todos los autores y trabajos de patentes
    puntaje_total_otros += puntaje_autores_patentes;
    // Sumar los puntajes individuales de todos los autores y trabajos de traducciones
    puntaje_total_otros += puntaje_autores_traducciones;
    // Sumar los puntajes individuales de todos los autores y trabajos de obras internacionales
    puntaje_total_otros += puntaje_autores_obras_internacionales;
    // Sumar los puntajes individuales de todos los autores y trabajos de obras nacionales
    puntaje_total_otros += puntaje_autores_obras_nacionales;
    // Sumar los puntajes individuales de todos los autores y trabajos de productos de software
    puntaje_total_otros += puntaje_autores_productos_software;

    return puntaje_total_otros;
}
// Función para calcular el puntaje individual para cada autor de un trabajo
function calcularPuntajePorAutor15Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos, agregar 0 al puntaje
        } else if (num_articulos <= 3) {
            puntaje += 15; // Si hay hasta 3 artículos, agregar 15 al puntaje
        } else if (num_articulos <= 6) {
            puntaje += 7.5; // Si hay hasta 6 artículos, agregar 7.5 al puntaje
        } else {
            puntaje += 15 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
//Tambien se puede usar para 
function calcularPuntajePorAutor12Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 12; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 6; // Si hay hasta 6 artículos
        } else {
            puntaje += 12 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}

function calcularPuntajePorAutor7Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 7; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 3.5; // Si hay hasta 6 artículos
        } else {
            puntaje += 7 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor4pto5Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 4.5; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 2.25; // Si hay hasta 6 artículos
        } else {
            puntaje += 4.5 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor3pto6Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 3.6; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 1.8; // Si hay hasta 6 artículos
        } else {
            puntaje += 3.6 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor3Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 3; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 1.5; // Si hay hasta 6 artículos
        } else {
            puntaje += 3 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor2pto4Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 2.4; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 1.2; // Si hay hasta 6 artículos
        } else {
            puntaje += 2.4 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor0pto6Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 0.6; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 0.3; // Si hay hasta 6 artículos
        } else {
            puntaje += 0.6 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor9Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 9; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 4.5; // Si hay hasta 6 artículos
        } else {
            puntaje += 9 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor8Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 8; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 4; // Si hay hasta 6 artículos
        } else {
            puntaje += 8 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor7pto2Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 7.2; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 3.6; // Si hay hasta 6 artículos
        } else {
            puntaje += 7.2 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor4pto8Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 4.8; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 2.4; // Si hay hasta 6 artículos
        } else {
            puntaje += 4.8 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor18Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 18; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 9; // Si hay hasta 6 artículos
        } else {
            puntaje += 18 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}

function calcularPuntajePorAutor7Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 7; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 3.5; // Si hay hasta 6 artículos
        } else {
            puntaje += 7 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}
function calcularPuntajePorAutor20Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 20; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 10; // Si hay hasta 6 artículos
        } else {
            puntaje += 20 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}

function calcularPuntajePorAutor25Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 25; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 12.5; // Si hay hasta 6 artículos
        } else {
            puntaje += 25 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}

function calcularPuntajePorAutor14Puntos(container) {
    var inputs = container.querySelectorAll("input[type='number']");
    var puntaje = 0;
    for (var i = 0; i < inputs.length; i++) {
        var num_articulos = parseInt(inputs[i].value);
        if (num_articulos === 0) {
            puntaje += 0; // Si no hay artículos
        } else if (num_articulos <= 3) {
            puntaje += 14; // Si hay hasta 3 artículos
        } else if (num_articulos <= 6) {
            puntaje += 7; // Si hay hasta 6 artículos
        } else {
            puntaje += 14 / num_articulos; // Si hay más de 6 artículos, agregar 15 dividido por el número de artículos al puntaje
        }
    }
    return puntaje;
}

// function obtenerSumaInputs(container) {
//     var inputs = container.querySelectorAll("input[type='number']");
//     var suma = 0;
//     for (var i = 0; i < inputs.length; i++) {
//         suma += parseInt(inputs[i].value) || 0; // Asegurarse de sumar 0 si el valor no es un número válido
//     }
//     return suma;
// }



function aplicarRestriccionesMaximas(total_puntaje) {
    // Obtener el elemento del escalafón docente
    var escalafonElement = document.getElementById("escalafon");

    // Verificar si el elemento existe
    if (escalafonElement) {
        var escalafon = escalafonElement.value;
        var max_puntaje = 0;

        // Determinar el máximo puntaje según el escalafón docente
        switch (escalafon) {
            case "Auxiliar":
                max_puntaje = 80;
                break;
            case "Asistente":
                max_puntaje = 160;
                break;
            case "Asociado":
                max_puntaje = 320;
                break;
            case "Titular":
                max_puntaje = 540;
                break;
            default:
                max_puntaje = 0; // Si no se selecciona un escalafón válido, el máximo puntaje será 0
        }

        // Aplicar restricción de máximo puntaje
        if (total_puntaje > max_puntaje) {
            total_puntaje = max_puntaje;
        }
    }

    return total_puntaje;
}




function generarCeldas(containerId, input) {
    var container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar contenido existente

    var numElementos = parseInt(input.value);
    for (var i = 1; i <= numElementos; i++) {
        var br = document.createElement('br'); // Agregar un salto de línea
        container.appendChild(br);

        // Crear el texto que indica el número de trabajo
        var span = document.createElement('span');
        span.textContent = 'Trabajo ' + i + ': ';
        container.appendChild(span);

        // Crear el input para el puntaje
        var nuevoInput = document.createElement('input');
        nuevoInput.type = 'number';
        nuevoInput.min = 0;
        nuevoInput.step = 1;
        nuevoInput.value = 0;
        container.appendChild(nuevoInput);
    }
}

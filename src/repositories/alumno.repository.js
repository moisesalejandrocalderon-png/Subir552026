//Base de datos temporal en memoria
let alumnos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 20, grado: '10°' },
    { id: 2, nombre: 'María', apellido: 'Gómez', edad: 19, grado: '11°' },
    { id: 3, nombre: 'Carlos', apellido: 'López', edad: 21, grado: '12°' },
];

// Varibles para generar el id autoincrememtal
let idActual = 4;

// findall - Devuelve todos los alumnos, con opcion de filtrar por grado
export const findAll = ({ grado }) => {
    if (grado) return alumnos.filter((a) => a.grado === grado);
    
    return alumnos;
};

// findByid - Devuelve un alumno específico por ID
export const getAlumnoById = (id) => {
    return alumnos.find((a) => a.id === Number(id));
};

// findByIdNombreCompleto - Devuelve un alumno por su nombre completo
export const getAlumnoByNombreCompleto = (nombre, apellido) => {
    return (
      alumnos.find((a) => a.nombre === nombre && a.apellido === apellido) ?? null
    );
};

// save - Agrega un nuevo alumno a la base de datos
export const save = ({ nombre, apellido, grado, seccion }) => {
    const nuevoAlumno = {
        id: idActual++,
        nombre,
        apellido,
        grado,
        seccion
    }

    alumnos.push(nuevoAlumno);
    
    return nuevoAlumno;
};

// update - Actualiza un alumno existente
export const updateById = (id, campos) => {
    const alumno = alumnos.find((a) => a.id === Number(id));

    if (!alumno) return null;

    const permitidos = ['nombre', 'apellido', 'grado', 'seccion'];

    permitidos.forEach((campo) => {
        if (campos[campo] !== undefined) alumno[campo] = campos[campo];
    });

    return alumno;
};

// delete - Elimina un alumno por ID
export const deleteById = (id) => {
    const alumnoIndex = alumnos.findIndex((a) => a.id === Number(id))

    if (alumnoIndex === -1) return false;

    alumnos.splice(alumnoIndex, 1);
    return true;

}
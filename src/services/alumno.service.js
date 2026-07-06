import {AppError} from '../errors/AppError.js';
import * as AlumnoRepository from '../repositories/alumno.repository.js';

//getAll - Devuelve todos los alumnos, con opcion de filtrar por grado
export const getAll = ({ grado }) => {
    return AlumnoRepository.findAll({ grado });
};

//getById - Devuelve un alumnopor su ID
export const getById = (id) => {
    const alumno = AlumnoRepository.findById(id);

    if (!alumno) throw new AppError('Alumno no encontrado', 404);


    };

    //create - Agrega un nuevo alumno a la base de datos
export const create = ({ nombre, apellido, grado, seccion }) => {
    if (!nombre || !apellido || !grado || !seccion) {
        throw new AppError(
            'Todos los campos son requeridos: nombre, apellido, grado, seccion',
            400,
        );
    }

    const existentes = AlumnoRepository.findByNombreCompleto(nombre, apellido)

    if (existentes) {
        throw new AppError(
            'Ya existe un alumno con el mismo nombre y apellido',
            400,
        );
    }

    return AlumnoRepository.save({ nombre, apellido, grado, seccion });
};

export const update = (id, campos) => {};
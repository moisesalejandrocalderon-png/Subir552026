import 'dotenv/config'
import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000

app.use (express.json());

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

// Mi Primer ruta
app.get('/', (req, res) => {
    res.json({
        message: 'API del Colegio San Marcos'
    });
});

//Base de datos temporal en memoria
let alumnos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 20, grado: '10°' },
    { id: 2, nombre: 'María', apellido: 'Gómez', edad: 19, grado: '11°' },
    { id: 3, nombre: 'Carlos', apellido: 'López', edad: 21, grado: '12°' },
];

// Variable para generar el id autoincremental
let idActual = 4;

// GET /alumnos

// Devuelve un alumno especidico por ID
app.get('/alumnos/:id', (req, res) => {
    const alumno = alumnos.find(a => a.id === Number(req.params.id));

    if (!alumno) {
        return res.status(404).json({ 
            error: 'Alumno no encontrado',
        });
    }

    res.json(alumno);
});

// lista todos los alumnos y acepta ?grado como filtro opcional
app.get('/alumnos', (req, res) => {
    const grado = req.query.grado;
    
    const resultado = grado ? alumnos.filter((a) => a.grado === grado) : alumnos;
    
    res.json(resultado);
});

// POST /alumnos

// Registrar un nuevo alumo
app.post('/alumnos', (req, res) => {
    if (
        req.body === undefined ||
        req.body.nombre === undefined ||
        req.body.apellido === undefined ||
        req.body.edad === undefined ||
        req.body.grado === undefined
    ) {
        return res.status(400).json({
            error:
             'Todos los campos son requeridos: nombre, apellido, edad, grado'
        });
    }

    const { nombre, apellido, edad, grado,  } = req.body;
    
    const nuevoAlumno = {
        id: idActual++,
        nombre,
        apellido,
        edad,
        grado
    };

alumnos.push(nuevoAlumno);

res.status(201).json({
  message: 'Alumno registrado exitosamente',
  alumno: nuevoAlumno
});


});
// PATCH /alumnos/:id
// Actualiza solo los campos que se envíen en el body, los demas se mantienen igual 

app.patch('/alumnos/:id', (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({
      error: 'El body no puede estar vacío'
    });
  }

  const alumno = alumnos.find((a) => a.id === Number(req.params.id));

  if (alumno) {
    return res.status(404).json({
      error: 'Alumno no encontrado',
    });
  }

  const { nombre, apellido, edad, grado } = req.body;

    if (nombre) alumno.nombre = nombre;
    if (apellido) alumno.apellido = apellido;
    if (edad) alumno.edad = edad;
    if (grado) alumno.grado = grado;
   
    res.json({
        message: 'Alumno actualizado exitosamente',
        alumno,
    });
});

// PATCH /alumnos/:id
// Actualiza solo los campos que se envíen en el body, los demas se mantienen igual 
app.patch('/alumnos/:id', (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({
      error: 'El body no puede estar vacío'
    });
  }

  const alumno = alumnos.find((a) => a.id === Number(req.params.id));

  if (!alumno) {
    return res.status(404).json({
      error: 'Alumno no encontrado',
    });
  }

  const { nombre, apellido, edad, grado } = req.body;

    if (nombre) alumno.nombre = nombre;
    if (apellido) alumno.apellido = apellido;
    if (edad) alumno.edad = edad;
    if (grado) alumno.grado = grado;
   
    res.json({
        message: 'Alumno actualizado exitosamente',
        alumno,
    });
});

// DELETE /alumnos/:id
// Elimina un alumno por ID
app.delete('/alumnos/:id', (req, res) => {
    const alumnoIndex = alumnos.findIndex((a) => a.id === Number(req.params.id));

    if (alumnoIndex === -1) {
        return res.status(404).json({
            error: 'Alumno no encontrado',
        });
    }

    alumnos.splice(alumnoIndex, 1);

    res.status(204).send();
});

//Captura cualquier soliciud que no coincida con las rutas definidas
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
    });
});

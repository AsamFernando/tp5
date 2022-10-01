var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.profesor_materia
    .findAll({
      attributes: ["id", "id_profesor", "id_materia"],
        include:[{
        as:'Profesor-Relacionado',
        model:models.profesor,
        attributes: ["id","nombre","apellido","dni"]
      },
      {
        as:'Materia-Relacionada',
        model:models.materia,
        attributes: ["id","nombre"]
      }]
    })
    .then(profesores_materias => res.send(profesores_materias))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.profesor_materia
    .create({
      id_profesor: req.body.id_profesor,
      id_materia: req.body.id_materia
    })
    .then(profesor_materia => res.status(201).send({ id: profesor_materia.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otro profesor_materia con el mismo id')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findprofesor_materia = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor_materia
    .findOne({
      attributes: ["id", "id_profesor", "id_materia"],
      where: { id }
    })
    .then(profesor_materia => (profesor_materia ? onSuccess(profesor_materia) : onNotFound()))
    .catch(() => onError());
};

const findprofesor_materiaAsociado = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor_materia
    .findOne({
      attributes: ["id", "id_profesor", "id_materia"],
      include:[{
        as:'Profesor-Relacionado',
        model:models.profesor,
        attributes: ["id","nombre","apellido","dni"]
      },
      {
        as:'Materia-Relacionada',
        model:models.materia,
        attributes: ["id","nombre"]
      }],
      where: { id }
    })
    .then(profesor_materia => (profesor_materia ? onSuccess(profesor_materia) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findprofesor_materiaAsociado(req.params.id, {
    onSuccess: profesor_materia => res.send(profesor_materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = profesor_materia =>
    profesor_materia
      .update({
        id_profesor: req.body.id_profesor,
        id_materia: req.body.id_materia
      },
      {
        fields: ["id_profesor", "id_materia"]
      })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otro profesor_materia con el mismo id')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findprofesor_materia(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = profesor_materia =>
    profesor_materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findprofesor_materia(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;

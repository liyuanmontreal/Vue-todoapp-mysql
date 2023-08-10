const db = require("../models");
const Task= db.tasks;
const Op = db.Sequelize.Op;


// Create and Save a new Task
// Postman setting : post http://localhost:8080/tasks
// send Jason type data to test
// {
//   "content" :"buy milk",
//   "finished": false
// }
// response:
// {
//   "id": 1,
//   "content": "buy milk",
//   "finished": false
// }
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Task
  const task = {
    content: req.body.content,   
    finished: req.body.finished ? req.body.finished : false
  };

  // Save Task in the database
  Task.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });
};



// Retrieve all Tasks from the database (with condition).
// ALL-Postman setting: get http://localhost:8080/tasks/
// Search - Postman setting: get http://localhost:8080/tasks/?content=milk
exports.findAll = (req, res) => {
    const content = req.query.content;
    var condition = content ? { content: { [Op.like]: `%${content}%` } } : null;

    Task.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      });
    }

// Get all unfinished tasks
// url : http://localhost:8080/tasks/unfinished
// Postman setting:  http://localhost:8080/tasks/unfinished
  exports.findAllUnfinished = (req, res) => {
    Task.findAll({ where: { finished: false } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
  };



// Find a single Task with a id
// url : http://localhost:8080/tasks/:id
// Postman setting:  http://localhost:8080/tasks/1
exports.findOne = (req, res) => {
  const id = req.params.id;
  Task.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id
      });
    });
};




// Update a Task identified by the id in the request
// URL http://localhost:8080/tasks/:id
// Postman setting: PUT http://localhost:8080/tasks/1
// send data
// {
//   "content" :"go to library",
//   "finished": false
// }
// receive
// {
//     "id": "1",
//     "content": "go to library",
//     "finished": false
// }
exports.update = (req, res) => {
  // Validate Request
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Taskwith id=${id}. Maybe Task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Taskwith id=" + id
      });
    });
};

// Delete a Task with the specified id in the request
// routes DELETE /tasks/:id
// Postman setting: delete http://localhost:8080/tasks/3
// receive data:
// {
//   "message": "Task was deleted successfully!"
// }
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Taskwith id=${id}. Maybe Task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Taskwith id=" + id
      });
    });
};

// Delete all Tasks from the database.
// routes DELETE /tasks
// Postman setting: delete http://localhost:8080/tasks/
// receive data:
// {
//   "message": "All Tasks were deleted successfully!"
// }
 exports.deleteAll = (req, res) => {
  Task.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tasks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks."
      });
    });
 };
const { Sequelize, DataTypes } = require("sequelize");
const config = require('../../../config/env_local_var.json')

var sequelize = new Sequelize(
  "mysql://mani:mani1234@localhost:3306/crud-hapi-mysql"
);
sequelize
  .authenticate()
  .then(function () {
    console.log(
      "Connected to the MYSQL Database " + config.database.mysql.name
    );
  })
  .catch(function (err) {
    console.error(err);
  });

/** Defining model of Task table */
const Task = sequelize.define("Task", {
  // Model attributes are defined here
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  task_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  givenTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  task_details:
  {
    type: DataTypes.STRING,
    allowNull: false
  },
  project_name:
  {
    type: DataTypes.STRING,
    allowNull: false
  }
});
sequelize.sync()
console.log(Task)

/**
 * To create new Task
 * @createNewTask
 * @param {object} data - task data to be inserted
 */
exports.createNewTask = async (data) => {
  console.log(data)
  return new Promise((resolve, reject) => {
    const l = JSON.stringify(data)
    Task.create(data)
      .then((res) => {
        console.log(res)
        console.log('Data inserted')
        resolve(true)
      })
      .catch((err) => {
        console.log("Insertion failed", err);
        reject(err);
      });
  })

};


/**
* To delete task
* @deleteTask
* @param {number} _id - task id to be deleted 
*/
exports.deleteTask = async (_id) => {
  console.log('task_id', _id)
  return new Promise((resolve, reject) => {
    Task.destroy({ where: { task_id: _id } }).then((success) => {
      resolve(true)
    }).catch((err) => {
      console.log("Insertion failed", err);
      reject(err)
    })
  });
};


/**
* To update task data
* @updateTask
* @param {object} data - data to be updated 
*/
exports.updateTask = async (data) => {
  console.log(data)
  return new Promise((resolve, reject) => {
    Task.update(data, { where: { task_id: data.task_id } }).then((success) => {
      console.log('success', success)
      resolve(true)
    }).catch((err) => {
      console.log('updation failed', err)
      reject(err)
    })
  });
};


/**
* To get all task details
* @getAllTasks
*/
exports.getAllTasks = async () => {
  try {
    const a = await Task.findAll()
    console.log(a, '++++++++++++++++++++')
    return a;
  } catch (e) {
    console.log(e)
    return e
  }
}
module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", { 
    // id 自动生成，不用加入
    // id: {
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true    
    //  },      
    content: {
      type: Sequelize.STRING, defaultValue: "new task"   // add default value
    },   
    finished: {
      type: Sequelize.BOOLEAN
    } 
    },{
      timestamps:false
    });

  return Task;
};


 
 
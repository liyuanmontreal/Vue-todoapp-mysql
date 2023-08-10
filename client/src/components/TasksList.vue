<template>
  <div>   
    <div id="to-do-header"  >   
       <h1> To Do List </h1>
       <div id="to-do-input" >       
            <input type="text" class="form-control" placeholder="add someting to do "
              v-model="newtask.content"  name="content" id="content" required   
            /> 
            <button class="btn  btn-info " type="button"
                @click="createTask">          
                +
            </button>  
        </div>
      <h5> completed tasks: {{ isComplete }} / {{ totalItems }}</h5>
    </div>



    <div id="to-do-list">     
      <table class="table table-hover">       
        <tbody>
          <tr class="{active:index == currentIndex}"
            v-for="(taskitem, index) in tasks"
            :key="index"
            @click="setActiveTask(taskitem, index)" 
           
            >  
            <td >
              <input type="checkbox" id="checkbox" v-model="taskitem.finished" @click="changeStatus(taskitem,index)"/>  
               <span>{{ taskitem.content }}</span>     
         
            </td>     
               
          
            <td align="right">  
              
              <button class="btn  btn-info " type="button"
                  @click="deleteCurrentTask(taskitem, index)">
                  X
              </button> 
            </td>
          </tr>         
        </tbody>
        
      </table>
 
    </div>   
    <div id="to-do-list-footer">   
      <button class="m-3 btn btn-sm btn-info" @click="removeAllTasks">
        remove all tasks
      </button>
    </div>
  </div>
</template>

<script>
import TaskDataService from "../services/TaskDataService";

export default {
  name: "tasks-list",
  data() {
    return {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      searchcontent: "",     
      newtask: {
        id: null,
        content: "",     
        finished: false
      },
      isEditing: false,
    };
  },
   computed: {
    totalItems() {
      return this.tasks.length; //auto increment of 1 of each items added into array
    },
    isComplete() {
      return this.tasks.filter(item => item.finished).length; //to get completed [checkbox: checked] 
    }
  },
  methods: {
    
    retrieveTasks() {
      TaskDataService.getAll()
        .then(response => {
          this.tasks = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTasks();
      this.currentTask = null;
      this.currentIndex = -1;
    },

    setActiveTask(task, index) {
      this.currentTask = task;
      this.currentIndex = task ? index : -1;
    },

    changeStatus(task,index){
      this.currentTask = task;
      this.currentIndex = task ? index : -1;
      var data = {
        content: this.currentTask.content,
        finished: !this.currentTask.finished
      };
      TaskDataService.update(this.currentTask.id, data)
        .then(response => {
          console.log(response.data);       
          this.refreshList();
          
        })
        .catch(e => {
          console.log(e);
        });
    },


    deleteCurrentTask(task, index) {
      this.currentTask = task;
      this.currentIndex = task ? index : -1;
      TaskDataService.delete(this.currentTask.id)
        .then(response => {
          console.log(response.data);        
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateItem(task,index){     
      this.currentTask = task;
      this.currentIndex = task ? index : -1;
      var data = {
        content:this.currentTask.content,
        finished: this.currentTask.finished
      };
      TaskDataService.update(this.currentTask.id, data)
        .then(response => {
          console.log(response.data);       
          this.refreshList();
          
        })
        .catch(e => {
          console.log(e);
        });
        this.isEditing = false;
    },

    removeAllTasks() {
      TaskDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchContent() {
      TaskDataService.findByContent(this.searchcontent)
        .then(response => {
          this.tasks = response.data;
          this.setActiveTask(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        this.searchcontent ="";
    },

    createTask() {
      var data = {
        content: this.newtask.content,
        finished: false
      };

      TaskDataService.create(data)
        .then(response => {
          this.newtask.id = response.data.id;
          console.log(response.data);      
          this.refreshList();          
        })
        .catch(e => {
          console.log(e);
        });
   
        this.newtask.content ="";

    },
  },
  mounted() {
    this.retrieveTasks();
  }
};
</script>

<style>

#to-do-input {
    height: 40px;
    display: flex;
    align-items: center;  
    text-align: center;
    padding: 30px 30px 30px 30px;
    color: white;
    font-size: 20px;
}

#to-do-header {
  background: #80bdab;
  text-align: center;
  padding: 30px 0;
  color: white;
}


#to-do-list {  
  background: #bbf1c8;
  padding: 0  20px 0 30px ;
  text-align: left; 
  display: flex;
  flex-direction: column;
  align-items: center;
  
   font-size: 20px;
}

#to-do-list-footer {  
  text-align: center;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #bbf1c8;
}

completedTask {
    text-decoration: line-through;
    color: #0075FF;
}

#to-do-list  input:checked + span{
  text-decoration: line-through;
}

#to-do-list  span{
  margin-left: 10px;
}


</style>
<script setup>
import { ref, computed } from 'vue';
import CheckCircle from './icons/CheckCircle.vue'
import TrashBin from './icons/TrashBin.vue'
import PlusCircle from './icons/PlusCircle.vue'
import CloseCircle from './icons/CloseCircle.vue'

import { useStore } from 'vuex';

const store = useStore();
const tasks = computed(() => store.state.tasks)

const hoveredItemId = ref('')
const showInfo = ref(true)

const completedTasks = computed(() => tasks.value.filter(task => task.completed));

const handleShowInfo = () => {
  showInfo.value = !showInfo.value
}

const addTask = () => {
  store.commit('addTask')
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
};

const updateTaskStatus = (task) => {
  store.commit('updateTaskStatus', task)
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
};

const removeTask = (task) => {
  store.commit('removeTask', task)
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const deleteTasksDone = (task) => {
  store.commit('deleteTasksDone', task)
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const deleteAllTasks = () => {
  store.commit('deleteAllTasks')
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
};

const handleMouseEnter = (id) => {
  hoveredItemId.value = id
}
const handleMouseLeave = (id) => {
    if (hoveredItemId.value === id) {
        hoveredItemId.value = null
    }
}

const handleCheckCircleColor = (task) => {
    if (task.completed) { return '#A3A3A3'}
    return '#37C892'
}


</script>

<template>
    <div class="container">
      <span class="title">Vue ToDo List</span>
      <div class="card">
          <!-- Task Summary -->
          <div class="task-summary">
            <div class="tasks">Tasks <span>{{ tasks.length }}</span></div>
            <div class="tasks">Tasks Done <span>{{ completedTasks.length }}</span></div>
            <div class="delete-tasks" @click="deleteTasksDone" v-if="completedTasks.length > 0">
                <TrashBin class="trash-bin" color="white"/>
                <span>Tasks Done</span>
            </div>
            <div class="delete-tasks" @click="deleteAllTasks">
                <TrashBin class="trash-bin" color="white"/>
                <span>Tasks</span>
            </div>
          </div>
      
          <!-- Task List -->
          <div class="task-list">
            <div v-for="task in tasks" :key="task.id" class="task-item"
              @mouseenter="handleMouseEnter(task.id)"
              @mouseleave="handleMouseLeave(task.id)"
              :class="{'hovered': hoveredItemId==task.id}"
            >
              <CheckCircle
                class="check-circle"
                :class="{'hovered-icon': hoveredItemId==task.id}"
                @click="updateTaskStatus(task)"
                :color="handleCheckCircleColor(task)"
              />
              <span :class="{ completed: task.completed }">{{ task.text }}</span>
              <TrashBin class="trash-bin"
                :class="{'hovered-icon': hoveredItemId==task.id}"
                @click="removeTask(task)"
                v-if="hoveredItemId==task.id"
                color="#FC4855"
              />
            </div>
          </div>
      
          <!-- New Task Input -->
          <div class="new-task-input">
            <div>
                <input type="text" v-model="$store.state.newTaskText" placeholder="New task">
                <PlusCircle
                  class="plus-circle"
                  color="#246CAA"
                  @click=addTask
                />
            </div>
          </div>
      </div>
      <div class="info">
        <div class="info-message" v-if=!showInfo @click=handleShowInfo>
            This application uses the browser's Local Storage to store data
            <span></span>
            <CloseCircle class="close-circle" color="black"/>
        </div>
        <div class="show-info" v-if=showInfo @click=handleShowInfo>
            Show Info
        </div>
      </div>
    </div>
  </template>

<style>
  .container {
    background: linear-gradient(to bottom, #37C892, #244855);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family:Arial, Helvetica, sans-serif
  }

  .title {
    color: white;
    font-weight: 600;
    font-size: 72px;
  }

  .card {
    width: 600px;
    max-width: 600px;
    min-height: 330px;
    height: 375px;
    max-height: 375px;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    background-color: white;
  }

  .task-summary {
    width: 100%;
    min-height: 50px;
    padding: 0 15px 0 15px;
    display: flex;
    justify-content: flex-end;
    background-color: rgb(231, 229, 229);
  }

  .task-summary .tasks {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    margin: 13px 3px 13px 3px;
    padding: 0 0 0 10px;
    background-color: #246CAA;
    border-radius: 50px;
  }

  .task-summary span {
    display: flex;
    justify-content: center;
    align-content: center;
    color: #246CAA;
    font-size: 13px;
    font-weight: 600;
    width: 20px;
    height: 20px;
    background-color: white;
    margin-left: 5px;
    margin-right: 2px;
    border-radius: 50%;
  }

  .task-summary .delete-tasks {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    margin: 12px 4px 12px 4px;
    padding: 0 5px 0 5px;
    background-color: #FC4855;
  }

  .task-summary .delete-tasks:hover {
    cursor: pointer;
  }

  .task-summary .delete-tasks .trash-bin {
    margin: 0;
    scale: 85%;
  }

  .task-summary .delete-tasks span {
    margin: 0 5px 0 0;
    display: flex;
    width: auto;
    color: white;
    background-color: #FC4855;
  }

  .task-list {
    width: 100%;
    /* max-height: 200px; */
    max-height: 245px;
    padding: 30px;
    flex-grow: 1;
    overflow-y: auto;
  }

  .task-list span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;    
  }
  
  .task-item {
    display: flex;
    height: 50px;
    align-items: center;
    margin: 0 0 8px 0;
    border-style: solid;
    border-radius: 6px;
    border-width: 1px;
    border-color: rgb(231, 229, 229);
    transition: 0.3s ease;
  }

  .task-item.hovered {
    background-color: rgb(231, 229, 229);
    transition: 0.3s ease;
  }

  .check-circle {
    order: 1;
    margin: 15px;
    scale: 110%;
  }

  .task-item span {
    order: 2;
    flex: 1
  }

  .trash-bin {
    order: 3;
    margin: 15px;
    justify-self: flex-end;
    scale: 110%;
  }
  
  .task-item input[type="checkbox"] {
    margin-right: 10px;
  }

  .task-item button {
    justify-self: flex-end;
  }
  
  .completed {
    color: #A3A3A3;
    text-decoration: line-through;
  }
  
  .new-task-input {
    width: 100%;
    min-height: 90px;
    background-color: rgb(231, 229, 229);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .new-task-input div {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-style: solid;
    border-color: #246CAA;
    border-radius: 70px;
    margin: 0 20px 0 20px;
    width: 100%;
    height: 60px;
    background-color: rgb(245, 245, 245);
  }

  .new-task-input div input {
    order: 1;
    max-width: 515px;
  }

  .plus-circle {
    order: 2;
    scale: 200%;
    justify-self: flex-end;
  }

  .plus-circle:hover {
    cursor: pointer;
  }

  .new-task-input input:focus {
    outline: none;
  }

  button, input, select, textarea {
    background-color: transparent;
    padding: 20px
  }
  
  .new-task-input input[type="text"] {
    width: 100%;
  }

  .new-task-input input:focus {
    color: #246CAA;
  }
  
  .new-task-input button {
    padding: 5px 10px;
  }

  .hovered-icon {
    cursor: pointer;
  }

  .info-message {
    display: flex;
    color: white;
    font-weight: 600;
    background-color:#002455;
    padding: 8px 12px 8px 12px;
    border-radius: 50px;
    position: absolute;
    right: 25px;
    bottom: 25px;
    padding-left: 30px;
  }

  .show-info {
    color: white;
    z-index: 1 !important;
    font-weight: 600;
    background-color:#246CAA;
    padding: 3px 12px 3px 12px;
    position: absolute;
    right: 25px;
    bottom: 25px;
  }
  .show-info:hover {
    cursor: pointer;
  }

  .info-message span {
    position: relative;
    left: 17px;
    top: 7px;
    z-index: 0!important;
    background-color: white;
    width: 10px;
    height: 10px;
  }

  .close-circle {
    scale: 130%;
  }

  .close-circle:hover {
    cursor: pointer;
  }

  </style>
  
import { createStore } from 'vuex';
let count = 0
const store = createStore({
  state() {
    return {
      tasks: localStorage.tasks ? JSON.parse(localStorage.tasks) : [],
      newTaskText: ''
    };
  },
  mutations: {
    addTask(state) {
      localStorage.setItem('count', count)
      if (state.newTaskText) {
        state.tasks.push({
          id: count + 1,
          text: state.newTaskText,
          completed: false
        });
        state.newTaskText = '';
      }
      count++
    },
    updateTaskStatus(state, task) {
      task.completed = !task.completed;
    },
    removeTask(state, task) {
      state.tasks = state.tasks.filter(t => task.id!==t.id)
    },
    deleteTasksDone(state) {
      state.tasks = state.tasks.filter(task => !task.completed)
    },
    deleteAllTasks(state) {
      state.tasks = [];
    }
  },
  getters: {
    completedTasks(state) {
      return state.tasks.filter(task => task.completed);
    }
  }
});

export default store;

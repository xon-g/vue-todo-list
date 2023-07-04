import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      tasks: localStorage.tasks ? JSON.parse(localStorage.tasks) : [],
      newTaskText: '',
      count: localStorage.count || 0
    };
  },
  mutations: {
    addTask(state) {
      if (state.newTaskText) {
        state.tasks.push({
          id:  state.count,
          text: state.newTaskText,
          completed: false
        });
        state.newTaskText = '';
      };
      state.count++;
      localStorage.setItem('count', state.count)
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

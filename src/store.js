import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      tasks: [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: true },
        { id: 3, text: 'Task 3', completed: false }
      ],
      newTaskText: ''
    };
  },
  mutations: {
    addTask(state) {
      if (state.newTaskText) {
        state.tasks.push({
          id: state.tasks.length + 1,
          text: state.newTaskText,
          completed: false
        });
        state.newTaskText = '';
      }
    },
    updateTaskStatus(state, task) {
      task.completed = !task.completed;
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

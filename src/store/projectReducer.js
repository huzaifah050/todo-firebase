const initState = {
  todos: [],
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('created', action.newTodo);
      return state;

    case 'ADD_TODO_ERROR':
      console.log('created', action.err);
      return state;

    case 'DELETE_TODO':
      console.log('object deleted');
      return state;

    case 'DELETE_TODO_ERROR':
      console.log('delete error', action.err);
      return state;
    default:
      return state;
  }
};

export default projectReducer;

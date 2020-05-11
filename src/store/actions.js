// export function addTodo(newTodo) {
//   return (dispatch, getState, getFirebase) => {
//     const firebase = getFirebase();
//     firebase.push('todos', newTodo).then(() => {
//       dispatch({ type: 'SOME_ACTION' });
//     });
//   };
// }

export const addTodo = (newTodo) => {
  return (dispatch, getState, { getFirestore }) => {
    //make async call

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const id = getState().firebase.auth.uid;
    firestore
      .collection("todos")
      .add({
        ...newTodo,
        name: profile.name,
        uid: id,
        createdAt: new Date(),
        // firstName: 'Can',
        // lastName: 'kila',
        // id: 123,
      })
      .then(() => {
        // console.log(getState().firebase.auth.uid);
        dispatch({ type: "ADD_TODO", newTodo });
      })
      .catch((err) => {
        // console.log(err.message);
        dispatch({ type: "ADD_TODO_ERROR", err });
      });
  };
};

export const deleteTodo = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_TODO" });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_TODO_ERROR", err: err.message });
      });
  };
};

// export const deleteTodo = (id) => {
//   return {
//     type: 'DELETE_TODO',
//   };
// };

export const dispatchEditTodo = (todo) => {
  return (dispatch) => {
    dispatch({
      type: "DISPATCH_EDIT_TODO",
      todo,
    });
  };
};

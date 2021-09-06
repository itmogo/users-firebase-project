
export const addUserAction =(user) => {
    return (dispatch, state, {getFirestore}) =>{
         getFirestore()
        .collection('users')
        .add({...user, timestamp: getFirestore().FieldValue.serverTimestamp()})
        .then((doc) => {})
        .catch ((err) => {
          console.log(err);
        });
       };
  }
  
  export function deleteUserAction(id) {
    return {
      type: 'DELETE_USER',
      payload: id,
    };
  }
  
  export function updateUserAction(id, updatedUser) {
    return {
      type: 'UPDATE_USER',
      payload: { id: id, updatedUserInfo: updatedUser },
    };
  }

 // to get data from firebase db and display on UI
  // 1.create component didmount on apps
  //2. import get all user in apps
  //3. create mapstate and mapdispatch in app js
  //4. create a case on reducers
  // 5. delete dispatch in add component 

  export const getAllUsers =() => {
    return (dispatch, state, {getFirestore}) => {
      getFirestore()
      .collection("users")
      .onSnapshot((snapshot) =>{
        let users = [];
        snapshot.forEach((doc) =>{
          // collecting data from snapshot and picking id 
          // to data to help delete 
          users.push({...doc.data(), id: doc.id});
        });
        console.log(users);
        dispatch({
          type: 'SET_ALL_USERS',
          payload: users,
        });
      }, (err)=>{}      
      );
    };
  };
  
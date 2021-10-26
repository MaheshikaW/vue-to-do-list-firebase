import firebase from 'firebase';
import 'firebase/firestore';

var  firebaseConfig = {
  apiKey: "AIzaSyAsLvxia_pREY1uof5E1xFpijc8JxoHbA4",
  authDomain: "fir-vue-2d2fe.firebaseapp.com",
  projectId: "fir-vue-2d2fe",
  storageBucket: "fir-vue-2d2fe.appspot.com",
  messagingSenderId: "84398331282",
  appId: "1:84398331282:web:cdd0d970966e0149ce9d4b"
};

  // const firebaseApp = firebase.initializeApp(firebaseConfig);
  // const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  // const usersCollection = firebaseApp.firestore().collection('tasks');

  // export const createUser = users =>{
  //     return usersCollection.add(users);
  // }

  // export const getUser = async id =>{
  //   const users = await usersCollection.doc(id).get();
  //   return users;
  // }

  // export const updateUser = (id,user) =>{
  // return usersCollection.doc(id).update(user);
  // }

  // export const deleteUser = id =>{
  // return usersCollection.doc(id).delete();
  // }

  // export const useLoadUsers = () =>{
  //   const users = ref ([]);
  //   const close =usersCollection.onSnapshot(snapshot => {
  //     users.value = snapshot.docs.map(doc =>({id:doc.id,...doc.data()}))
  //   })
  //   onUnmounted(close);
  //   return users;
  //   }

 // export { timestamp };
  export const db = firebase.initializeApp(firebaseConfig).firestore();

  export const createUser = users =>{
    return db.collection('tasks').add(users);
}
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import firebase from "../firebase"

const AuthContext = React.createContext();
const db = firebase.firestore();
let uid = '';

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, typeUser) {
    return auth.createUserWithEmailAndPassword(email, password)
      .then((data => {
        console.log('DATA =>', data);
        const uid = data.user.uid;

        db.collection("users").doc(uid).set({
          email: email, typeUser: typeUser
        });
      }))
      .catch(error => {
        console.log('ERROR', error)
      })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
      .then((data => {
        uid = data.user.uid;
      }))
      .catch(error => {
        console.log('ERROR', error)
      })

  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  async function getDataUser() {
    const docRef = db.collection("users").doc(uid);
    const dataUser = {};

    await docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        dataUser.typeUser = doc.data().typeUser;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    ).catch((error) => {
      console.log("Error getting document:", error);
    });
    return dataUser;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getDataUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

import { createContext, useContext, useMemo, useReducer } from "react";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native";
import firebase from "@react-native-firebase/app"

const MyContext = createContext()
MyContext.displayName = "My Store"

const reducer = (state, action) =>{
     switch(action.type){
          case "USER_LOGIN":
               return {...state, userLogin: action.value}
          case "LOGOUT":
               return {...state, userLogin: null}
          default:{
               throw new Error("Action không tồn tại")
          }
     }
}
const MyContextControllerProvider = ({children}) => {
     const initialState = {
          userLogin: null,
          jobs: []
     }
     const[controller, dispatch] = useReducer(reducer, initialState)
     const value = useMemo(() => [controller, dispatch])
     return(
          <MyContext.Provider value={value}>
               {children}
          </MyContext.Provider>
     )
}
const useMyContextProvider = () =>{
     const context = useContext(MyContext)
     if(!context)
     {
          return new Error("useMyContextProvider phải đặt trong MyContextControllerProvider")
     }
     return context
}
const USERS = firestore().collection("USERS")
const createAccount = (email, password, fullName) =>{
      auth().createUserWithEmailAndPassword(email, password)
     .then(()=>{
          Alert.alert("Thông báo","Tạo tài khoản thành công với email: " + email)
          USERS.doc(auth().currentUser.uid)
          .set(
               {
                    email,
                    password,
                    fullName,
               }
          )
     }).catch(e => Alert.alert("Lỗi:" + e.message))
}
const login = (dispatch, email, password, navigation) =>{
     auth().signInWithEmailAndPassword(email, password)
     .then(()=>{
          USERS.doc(auth().currentUser.uid)
          .onSnapshot(u=>{
               if(u.exists){
                    console.log("Đăng nhập thành công với: " + u.id)
                    dispatch({type: "USER_LOGIN", value: u.data()})
                    navigation.navigate('Home')
               }
          })
     })
     .catch(e => Alert.alert("Thông báo","Sai tài khoản hoặc mật khẩu"))
}
const logout = (dispatch, navigation) =>{
     auth().signOut().then(()=>dispatch({type: "LOGOUT"}))
     navigation.navigate('Login')
     console.log("Logout successful")
}
export {
     MyContextControllerProvider,
     useMyContextProvider,
     createAccount,
     login,
     logout
}
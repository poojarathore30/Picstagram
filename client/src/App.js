// import React, { useEffect, createContext, useReducer,useContext } from 'react';
// import NavBar from "./components/Navbar"
// import './App.css';
// import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom"
// import Home from "./components/screens/Home"
// import SignUp from "./components/screens/SignUp"
// import Signin from "./components/screens/Signin"
// import Profile from "./components/screens/Profile"
// import UserProfile from "./components/screens/userProfile"
// import CreatePost from "./components/screens/createPost"
// import { reducer, initialState } from "./reducers/userReducer"
// import SubUserPost from './components/screens/subUserpost'
// import ResetPAss from './components/screens/reset'
// import NewPAss from './components/screens/NewPassword'
// export const UserContext = createContext()
// const Routing = () => {
//   const history = useHistory();
//   const {state,dispatch}=useContext(UserContext)
//   useEffect(()=>{
//     const user=JSON.parse(localStorage.getItem('user'))
//     if(user){
//       dispatch({type:"USER",payload:user})
    
//     }else{
//       if(!history.location.pathname.startsWith('/reset-password'))
//       history.push('/signin')
//     }
//   },[])
//   return (
//     <Switch>
//       <Route exact path="/">
//         <Home />
//       </Route>
//       <Route path="/signin">
//         <Signin />
//       </Route>
//       <Route path="/signup">
//         <SignUp />
//       </Route>
//       <Route exact path="/profile">
//         <Profile />
//       </Route>
//       <Route path="/createPost">
//         <CreatePost />
//       </Route>
//       <Route path="/profile/:userid">
//         <UserProfile />
//       </Route>
//       <Route path="/myfollowingpost">
//         <SubUserPost />
//       </Route>
//       <Route exact path="/reset-password">
//         <ResetPAss />
//       </Route>
//       <Route path="/reset-password/:token">
//         <NewPAss />
//       </Route>
      
//     </Switch>
//   )
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState)
//   return (
//     <UserContext.Provider value={{state,dispatch}}>
//       <BrowserRouter>
//         <NavBar />
//         <Routing />
//       </BrowserRouter>
//     </UserContext.Provider>
//   );
// }
// export default App;

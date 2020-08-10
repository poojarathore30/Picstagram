// import React,{useState,useContext} from "react";
// import {Link,useHistory} from "react-router-dom"
// import {UserContext} from "../../App"
// import M from "materialize-css"
//  const SignIn=()=>{
//    //connection with server
//    const {state,dispatch}=useContext(UserContext)
//   const history=useHistory()
//   const [password, setPassword] = useState("")
//   const [email, setEmail] = useState("")
//   const PostData = () => {
//     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if(!re.test(email))
//     {
//      return M.toast({html:"Invalid Email",classes:"#ef5350 red lighten-1"}) 
//      }
//   fetch("/signin", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password
//       })
//     }).then(res=>res.json()).then(data=>{
      
//       if(data.error){
//       M.toast({html:data.error,classes:"#ef5350 red lighten-1"})}
//       else{
//         localStorage.setItem("jwt", data.token)
//         localStorage.setItem("user",JSON.stringify(data.user))
//         dispatch({type:"USER",payload:data.user})
//         M.toast({html:"Signed in Successfully ",classes:"#388e3c green darken-2"})
//         history.push('/')
//       }
//   }).catch(err=>{console.log(err);
//   })
//   }
//   //client side
//  return (
//     <div className="my-card">
//     <div className="card auth-card">
//     <h2>Instagram</h2>
//     <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
//     <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
    
//     <button className="btn waves-effect waves-light "
//      type="submit" name="action" onClick={()=>{PostData()}}>
//     SignIn
//       </button>
//       <h6 >
//       <Link to="/signup" className="divert">Don't have an account ? signup</Link></h6>
//       <h6 >
//       <Link to="/reset-password" className="divert">Forgot Password ??</Link></h6>
//     </div></div>
// )
//  }
//  export default SignIn;
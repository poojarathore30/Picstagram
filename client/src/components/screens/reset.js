import React,{useState,useContext} from "react";
import {Link,useHistory} from "react-router-dom"
import {UserContext} from "../../App"
import M from "materialize-css"
 const SignIn=()=>{
   //connection with server

  const history=useHistory()

  const [email, setEmail] = useState("")
  const PostData = () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email))
    {
     return M.toast({html:"Invalid Email",classes:"#ef5350 red lighten-1"}) 
     }
  fetch("/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    }).then(res=>res.json()).then(data=>{
      
      if(data.error){
      M.toast({html:data.error,classes:"#ef5350 red lighten-1"})}
      else{
    
        M.toast({html:data.message,classes:"#388e3c green darken-2"})
        history.push('/signin')
      }
  }).catch(err=>{console.log(err);
  })
  }
  //client side
 return (
    <div className="my-card">
    <div className="card auth-card">
    <h2>Instagram</h2>
    <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
   
    <button className="btn waves-effect waves-light "
     type="submit" name="action" onClick={()=>{PostData()}}>
    ResetPassword
      </button>
  
    </div></div>
)
 }
 export default SignIn;
import React,{useState,useContext} from "react";
import {Link,useHistory,useParams} from "react-router-dom"
import {UserContext} from "../../App"
import M from "materialize-css"
 const NewPass=()=>{
   //connection with server
   
  const history=useHistory()
  const [password, setPassword] = useState("")
  const {token}=useParams()
  console.log(token)
  const PostData = () => {
   
  fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
    
        password: password,
        token:token
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
    
    <input type="password" 
    placeholder="Enter new password"
     value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
    <button className="btn waves-effect waves-light "
     type="submit" name="action" onClick={()=>{PostData()}}>
    Update Password
      </button>
      
    </div></div>
)
 }
export default NewPass;
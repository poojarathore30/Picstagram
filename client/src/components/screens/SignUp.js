// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom"
// import M from "materialize-css";
// import { useEffect } from "react";
// const SignUp = () => {
//   const history = useHistory()
//   const [name, setName] = useState("")
//   const [password, setPassword] = useState("")
//   const [email, setEmail] = useState("")
//   const [image, SetImage] = useState('')
//   const [url, seturl] = useState(undefined)

//   useEffect(()=>{
//   if(url){
//     uploadFeilds()
//   }
// },[url])

// const UploadPic=()=>{
//   const data = new FormData();
//   data.append('file', image)
//   data.append('upload_preset', "Instagram-Clone-Pooja")
//   data.append('cloud_name', "poojarathore")
//   fetch("https://api.cloudinary.com/v1_1/poojarathore/image/upload", {
//     method: "post",
//     body: data
//   }).then(res => res.json()
//   ).then(data => {
//     console.log(data.url)
//     seturl(data.url)
//   }).catch(err => console.log(err)
//   )
// }
// const uploadFeilds=()=>{
//   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (!re.test(email)) {
//     return M.toast({ html: "Invalid Email", classes: "#ef5350 red lighten-1" })
//   }
//   fetch("/signup", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: name,
//       email: email,
//       password: password,
//       pic:url
//     })
//   }).then(res => res.json()).then(data => {
//     if (data.error) {
//       M.toast({ html: data.error, classes: "#ef5350 red lighten-1" })
//     }
//     else {
//       M.toast({ html: data.message, classes: "#388e3c green darken-2" })
//       history.push('/signin')
//     }
//   }).catch(err => {
//     console.log(err);
//   })
// }
// const PostData = () => {
//   if(image){
//     UploadPic()
//   }
//   else{
//     uploadFeilds()
//   } 
//   }

//   return (
//     <div className="my-card">
//       <div className="card auth-card">
//         <h2>Instagram</h2>
//         <input type="text" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
//         <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
//         <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        
//         <div className="file-field input-field">
//           <div className="btn">
//             <span>Upload ProfilePic</span>
//             <input type="file" onChange={(e) => { SetImage(e.target.files[0]) }} />
//           </div>
//           <div className="file-path-wrapper">
//             <input className="file-path validate" type="text" />
//           </div>
//         </div>

//         <button className="btn waves-effect waves-light "
//           type="submit" name="action" onClick={() => PostData()}>
//           SignUp
//         </button>
//         <h6 >
//           <Link to="/signin" className="divert">Already have an account ? signin</Link>
//         </h6>
//       </div></div>
//   )
// }
// export default SignUp;
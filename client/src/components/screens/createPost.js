import React, { useState,useEffect } from "react";
import M from "materialize-css"
import {useHistory} from 'react-router-dom'
const CreatePost = () => {
  const history=useHistory()
  const [title, SetTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, SetImage] = useState("")
  const [url, setUrl] = useState("")
useEffect(()=>{
  if(url){
  fetch("/createpost", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body: JSON.stringify({
      title: title,
      body: body,
      pic: url
    })
  }).then(res => res.json()).then(data => {
    console.log(data);
    if (data.error) {
      M.toast({ html: data.error, classes: "#ef5350 red lighten-1" })
    }
    else {
      M.toast({ html: "Created Post Successfully ", classes: "#388e3c green darken-2" })
      history.push('/')
    }
  }).catch(err => {
    console.log(err);
  })}
},[url])


  const postDetails = () => {
    const data = new FormData();
    data.append('file', image)
    data.append('upload_preset', "Instagram-Clone-Pooja")
    data.append('cloud_name', "poojarathore")
    fetch("https://api.cloudinary.com/v1_1/poojarathore/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()
    ).then(data => {
      console.log(data.url)
      setUrl(data.url)
    }).catch(err => console.log(err)
    )
  }
  return <div>
    <div className="card input-field"
      style={{
        margin: "100px auto"
        , maxWidth: "500px",
        padding: "20px",
        textAlign: "center"
      }} >
      <div className="card-title" style={{ fontWeight: 'normal' }}>
        Create New Post
      </div>
      <input type="text" placeholder="Title" value={title} onChange={(e) => { SetTitle(e.target.value) }} />
      <input type="text" placeholder="Body" value={body} onChange={(e) => { setBody(e.target.value) }} />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => { SetImage(e.target.files[0]) }} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light" type="submit" name="action"
        onClick={() => {
          postDetails()
        }}>
        Create Post
        </button>
    </div>
  </div>
}
export default CreatePost;
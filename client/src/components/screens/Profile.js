import React, { useEffect, useState, useContext } from "react"
import images from "../images/profile.jpg"
import { UserContext } from "../../App"
export default function Profile() {
  const [mypic, Setmypic] = useState([])
  const [image, SetImage] = useState("")
  const [url, setUrl] = useState("")

  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    fetch('/myposts', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      }
    }).then(res => res.json()).then(result => {
      console.log(result)
      Setmypic(result.mypost)
    }
    )
  }, [])

  // useEffect(() => {
  //   if (image) {
  //     const data = new FormData()
  //     data.append("file", image)
  //     data.append('upload_preset', "Instagram-Clone-Pooja")
  //     data.append('cloud_name', "poojarathore")
  //     fetch("https://api.cloudinary.com/v1_1/poojarathore/image/upload", {
  //       method: "post",
  //       body: data
  //     }).then(res => 
  //       res.json()
  //     ).then(data => {
  // console.log("data iks "+data);
  
  //       // fetch('/updatepic', {
  //       //   method: "put",
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //     "Authorization": "Bearer " + localStorage.getItem("jwt")
  //       //   },
  //       //   body: JSON.stringify({
  //       //     pic: data.url
  //       //   })
  //       // }).then(res => {
  //       //   console.log("res", res)
  //       //   res.json()
  //       // }).then(result => {
  //       //   console.log("result", result);
  //       //   localStorage.setItem('user', JSON.stringify({ ...state, pic: result.url }))

  //       //   dispatch({ type: "UPDATEPIC", payload: result.url })
  //       //   window.location.reload()
  //      // })
  //     }).catch(err => console.log(err))}
  // }, [image])

useEffect(()=>{
  if(image){
    const data = new FormData();
    data.append('file', image)
    data.append('upload_preset', "Instagram-Clone-Pooja")
    data.append('cloud_name', "poojarathore")
    fetch("https://api.cloudinary.com/v1_1/poojarathore/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()
    ).then(data => {
           
      localStorage.setItem("user",JSON.stringify({ ...state, pic: data.url }))
      dispatch({ type: "UPDATEPIC", payload: data.url })
      fetch('/updatepic',{
        method:'put',
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
          pic:data.url
        })
      }).then(res=>{
        res.json()
               
      }).then(resss=>{
          console.log("result"+resss);
      })
      //window.location.reload()
    }).catch(err => console.log(err)
    )
  }
},[image])

  const updatePhoto = (file) => {
     SetImage(file) 
  }

  return <div style={{ maxWidth: '550px', margin: '0px auto' }} >
    <div style={{
      margin: "18px 0px",
      borderBottom: "1px solid rgb(145, 141, 136)"
    }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}>
        <div>
          <img src={state ? state.pic : "loading"}
            alt="profile-image"
            style={{ width: "160px", height: "160px", borderRadius: "80px" }} />

        </div>
        <div>
          <h4>{state ? state.name : "Loading"}</h4>
          <h5>{state ? state.email : "Loading"}</h5>
          <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
            <h6>{mypic.length} posts</h6>
            <h6>{state ? state.followers.length : 'Loading'} followers</h6>
            <h6>{state ? state.following.length : 'Loading'} following</h6>
          </div>
        </div>
      </div>

      <div style={{ margin: '25px' }} className="file-field input-field">
        <div className="btn">
          <span>Upload ProfilePic</span>
          <input type="file" onChange={(e) => { updatePhoto(e.target.files[0]) }} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

    </div>
    <div className="gallery">
      {
        mypic.map(item => {
          return <img className="item" alt="galery photo" key={item._id}
            src={item.photo} />
        })
      }
    </div>
  </div>
}

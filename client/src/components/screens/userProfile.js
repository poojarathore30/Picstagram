import React,{useEffect,useState,useContext} from "react"
import images from "../images/profile.jpg"
import {UserContext} from "../../App"
import { useParams } from "react-router-dom"
export default function Profile()
{  
  const [userProfile,setProfile]=useState(null)
  const {state,dispatch}=useContext(UserContext)
 
  const {userid}=useParams();
  const [showfollow,setshowfollow]=useState(state?!state.following.includes(userid):true)
  
  useEffect(()=>{
    fetch(`/user/${userid}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    }).then(res=>res.json()).then(result=>{
      //console.log(result)
        setProfile(result)}
    )
  },[])

  const followuser=()=>{
    fetch('/follow',{
      method:"put",
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        followId:userid
      })
    }).then(res=>res.json()).then(data=>{
      console.log(data);      
      dispatch({type:"UPDATE",payload:{
        followers:data.followers,
        following:data.following
      }})
      localStorage.setItem('users',JSON.stringify(data))
      setProfile(prevstate=>{
        return ({
          ...prevstate,
          user:{
            ...prevstate.user,
            followers:[...prevstate.user.followers,data._id]
          }
        })
      })
      setshowfollow(false)
    }).catch(err=>console.log(err)
    )
    
  }

  const unfollowuser=()=>{
    fetch('/unfollow',{
      method:"put",
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        unfollowId:userid
      })
    }).then(res=>res.json()).then(data=>{
      console.log(data);      
      dispatch({type:"UPDATE",payload:{
        followers:data.followers,
        following:data.following
      }})
      localStorage.setItem('users',JSON.stringify(data))
    
      setProfile(prevstate=>{
        const newfollower=prevstate.user.followers.filter(item=>item!=data._id)
        return ({
          ...prevstate,
          user:{
            ...prevstate.user,
            followers:newfollower
          }
        })
      })
      setshowfollow(true)
    }).catch(err=>console.log(err)
    )
    
  }


    return <>{userProfile
            ? <div style={{maxWidth:'550px',margin:'0px auto'}} >
            <div 
            style={{display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid rgb(145, 141, 136)"}}>
            <div>
               <img src={userProfile.user.pic} style={{width:"160px",height:"160px",borderRadius:"80px"}}/>
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
              <h6>{userProfile.posts.length} posts</h6>
              <h6>{userProfile.user.followers.length} followers</h6>
              <h6>{userProfile.user.following.length} following</h6>

              </div>
              {showfollow?
               
              <button className="btn waves-effect "
              type="submit" name="action" onClick={()=>{followuser()}}>
             Follow
               </button>
               :
              <button className="btn waves-effect "
              type="submit" name="action" onClick={()=>{unfollowuser()}}>
             UnFollow
               </button>
              }
            </div>
            </div>
            <div className="gallery">
            {
              userProfile.posts.map(item=>{
                return  <img className="item" alt="galery photo" key={item._id}
                src={item.photo}/>
              })
            }
           
            </div>
            </div>
            :<h2 style={{textAlign:"center"}}>........Loading ......</h2>}
            </>
}

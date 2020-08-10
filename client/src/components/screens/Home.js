import React, { useState, useEffect ,useContext} from "react";
import {UserContext} from "../../App"
import {useHistory} from "react-router-dom"
import M from "materialize-css"
import {Link} from 'react-router-dom'
const Home = () => {
    const [data, setData] = useState([])
    const hisory=useHistory()
    const {state,dispatch}=useContext(UserContext)
    useEffect(() => {
        fetch('/allposts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json()).then(result => {
            console.log(result);
            setData(result.posts)
        })
    }, [])
    const likePost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json()).then(result=>{
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>console.log(err)
        )
    }
    const UnlikePost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json()).then(result=>{
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>console.log(err)
        )
    }
    const makeComment=(text,postId)=>{
      fetch('/comment',{
          method:"put",
          headers:{
              "content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem('jwt')
          },
          body:JSON.stringify({
              postId:postId,
              text:text
          })
      }).then(res=>res.json()).then(result=>{
        const newData=data.map(item=>{
            if(item._id==result._id){
                return result
            }else{
                return item
            }
        })
        setData(newData)
      }).catch(err=>console.log(err)
      )
    }
    const deletePost=(postId)=>{
        fetch(`/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>{
            res.json()
        }).then(re=>{
          
            const newData=data.filter(item=>{
                M.toast({ html: "Deleted Successfully ", classes: "#388e3c green darken-2" })
                hisory.push('/')
                return item._id !== re._id
            })
            setData(newData)
          
        
        }).catch(err=>{console.log(err);
        })
    }

    return <div className="home">
        {
            data.map(item => {
                return <div className="card home-card" key={item._id}>
                
                <div>
                <h5> 
                    <Link to={(item.postedBy._id != state._id)?'/profile/'+item.postedBy._id:'/profile'}>
                    {item.postedBy.name}</Link>
                        {item.postedBy._id == state._id && <i className="material-icons"
                            style={{ float: "right" }}
                             onClick={() => { deletePost(item._id) }}>delete</i>}
                    </h5>
                    </div>
                    <div className="card-image">
                        <img alt="upload" src={item.photo} />
                    </div>
                    <div className="card-content">
                        <i className="material-icons heart" style={{ color: "red" }}>favorite</i>
                        {item.likes.includes(state._id) 
                            ?
                             <i className="material-icons"
                                onClick={() => { UnlikePost(item._id) }}>thumb_down</i>
                            :
                            <i className="material-icons"
                                onClick={() => { likePost(item._id) }}>thumb_up</i> }


                        <h6>{item.likes.length} likes</h6>
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        {
                            item.comments.map(cmt=>{
                                return (
                                    <h6 key={cmt._id}>
                                    <span style={{fontWeight:"600"}}>{cmt.postedBy.name}</span>  {cmt.text}
                                    </h6>
                                )
                            })
                        }
                        <form onSubmit={e=>{
                            e.preventDefault()
                            makeComment(e.target[0].value,item._id);                            
                        }}>
                        <input type="text" placeholder="add a comment"  />
                        </form>
                    </div>
                </div>
            })
        }
    </div>

}
export default Home;
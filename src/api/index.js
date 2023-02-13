import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from "../utils"

const customFetch=async(url, {body, ...costomConfig})=>{
    const token=window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    
    const headers={
        'content-type':'application/x-www-form-urlencoded',
    }

    if(token){
        headers.Authorization=`Bearer ${token}`
    }

    const config={
        ...costomConfig,
        headers:{
            ...headers,
            ...costomConfig.headers
        }
    };

    if(body){
        config.body=getFormBody(body);
        
    }



    try{

       const response=await fetch(url, config);
       
       const data=await response.json();
        
       if(data.success){
        return {
            data:data.data,
            success:true
        }
       }

       throw new Error(data.message)
    } catch(error){
        return{
            message:error.message,
            success:false
        }
    }

}

export const getPosts=(page=1, limit=5)=>{
   return customFetch(API_URLS.posts(page, limit), {
    method:'GET',
   })
}

export const login=(email, password)=>{
    return customFetch(API_URLS.login(),{
        method:'POST',
        body:{email, password}
    })
}

export const signup = (name, email, password, confirmPassword) => {
    return customFetch(API_URLS.signup(), {
        method: 'POST',
        body: {name, email, password, confirm_password:confirmPassword}
    })
}

export const editProfile= (id, password, confirmPassword, name) => {
    return customFetch(API_URLS.editUser(), {
        method: 'POST',
        body: { id, password, confirm_password: confirmPassword, name }
    })
}

export const getUserInfo=(id)=>{
    return customFetch(API_URLS.userInfo(id),{
        method:'GET'
    })
}

export const getUserFriends=()=>{
    return customFetch(API_URLS.friends(),{
        mathod:'GET'
    })
}

export const addFriend=(id)=>{
    return customFetch(API_URLS.createFriendship(id),{
        method:'POST'
    })
}

export const removeFriendShip=(id)=>{
    return customFetch(API_URLS.removeFriend(id),{
        method:'POST'
    })

}

export const toggleLike = (itemId, itemType)=>{
    return customFetch(API_URLS.toggleLike(itemId, itemType),{
        method:'POST'
    })
}

export const getAllCommentOfPost=(post_id)=>{
    return customFetch(API_URLS.getComments(post_id),{
        method:'GET'
    })
}

export const createComment=(post_id, content)=>{
    return customFetch(API_URLS.comment(),{
        method:'POST',
        body:{post_id, content}

    })
}

export const deleteComment=(commentId, postId)=>{
    return customFetch(API_URLS.deleteComments(commentId, postId),{
        method:'DELETE'
    })
}

export const createPost=(content)=>{
    return customFetch(API_URLS.createPost(),{
        method:'POST',
        body:{content}
    })

}

export const getAllUser=(searchKey)=>{
    return customFetch(API_URLS.searchUser(searchKey),{
        method:'GET'
    })
}
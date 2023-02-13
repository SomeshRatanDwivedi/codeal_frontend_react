import { useState } from "react"
import { toast } from "react-toastify";
import { createComment, deleteComment } from "../api";
import { useAuth } from "../hooks";

export default function Comments({comments, postId, addCommentOnPost, deleteCommentOnPost }) {
    const [commentContent, setCommentContent]=useState('');
    const [deleting, setDeleting]=useState(false);
    const auth=useAuth();


   const addComment=async()=>{
    const response=await createComment(postId, commentContent);
    if(response.success){
        addCommentOnPost(postId, response.data.comment);
        toast.success("Your comment is added");
        
    }
    else{
        toast.error(response.message)
    }
   }

    const handleInput=(e)=>{
        if (e.key =='Enter'){
            e.target.value='';
            addComment();
        }
        setCommentContent(e.target.value);

    }


    const deleteThisComment=async(commentId)=>{
        setDeleting(true)
        const response=await deleteComment(commentId, postId);
        if(response.success){
            toast.success("Your comment is deleted");
            deleteCommentOnPost(postId, commentId);

        }
        else{
            toast.error(response.message);
        }
        setDeleting(false)


    }

    return (
        <>
            <input type='text' name="comment" placeholder="Start typing a comment"
                onKeyUp={(e) => handleInput(e)}
            />

            {
                comments.map((comment) => {
                    return (
                        <div key={`comment-${comment._id}`}>
                            <div className="random-comment-parent">
                                <div>

                                    <span className="timing">{comment.user.name}</span>
                                    <span className="timing">a minute ago 22</span>

                                </div>


                              <div className="comment-content-parent">

                                <div className="comment-text" style={{border:'1px solid grey', padding:'5px'}}>

                                    {comment.content}
                                </div>
                                {
                                    comment.user._id===auth.user._id 
                                    &&
                                        <button disabled={deleting} className="btn btn-primary" onClick={() => deleteThisComment(comment._id)}>{deleting?'Deleting':'Delete'}</button>
                                }
                               
                              </div>
                            </div>
                        </div>
                    )
                })
            }
        </>


    )

}
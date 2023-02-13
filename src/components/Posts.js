import { useEffect, useState } from "react";
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { createPost, getPosts, toggleLike } from '../api'
import { toast } from "react-toastify";
import Comments from "./Comment";

export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);
    const [postContent, setPostContent] = useState('');
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        setLoader(true)
        const fetchPosts = async () => {
            const response = await getPosts();
            if (response.success) {
                setPosts(response.data.posts)
            }
            setLoader(false)

        }

        fetchPosts();
    }, []);

    const addCommentOnPost = (postId, comment) => {
        const newPosts = posts.map((post) => {
            if (post._id == postId) {
                post.comments = [...post.comments, comment];
            }
            return post;
        })

        setPosts(newPosts);

    }

    const deleteCommentOnPost = (postId, commentId) => {
        const newPosts = posts.map((post) => {
            if (post._id == postId) {
                post.comments = post.comments.filter((comment) => comment._id != commentId);
            }
            return post;
        })

        setPosts(newPosts);
    }

    const likePost = async (itemId) => {
        const response = await toggleLike(itemId, 'Post');
        if (response.success) {
            if (response.data.deleted) {
                toast.success("Your like deleted from the post")

            }
            else {
                toast.success("Your like added in a post")


            }

        }
        else {
            toast.error(response.message)
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await createPost(postContent);
        setPostContent('')
        if(response.success){
            addNewPost(response.data.post)
            toast.success("Your post is added");
        }
        else{
            toast.error(response.message)
        }
    }

    const addNewPost=(newPost)=>{
        const newPosts=[newPost, ...posts];
        setPosts(newPosts);
    }

    if (loader) {
        return <Loader />
    }
    return (
        <>
            <div className="post-input-content">
                <form onSubmit={handleSubmit} >
                    <div className="text-area-parent">
                        <textarea value={postContent} onChange={(e)=>setPostContent(e.target.value)} />

                    </div>
                    <div className="btn-parent">
                        <button className="btn btn-primary" type="submit">Post</button>

                    </div>
                </form>


            </div>
            {
                posts.map((ele) => {
                    return (
                        <div className="post-parent" key={ele._id}>
                            <div className="user-info">
                                <div>
                                    <i className="fa-sharp fa-solid fa-user-tie"></i>

                                </div>
                                <Link to={`/user-profile/${ele.user._id}`}>
                                    <span>{ele.user.name}</span>

                                    <span className="timing">a minute ago</span>
                                </Link>

                            </div>

                            <div className="post-content" >

                                {ele.content}
                            </div>

                            <div className="user-intraction">
                                <div className="no-of-likes">

                                    <i className="fa-regular fa-heart" onClick={() => likePost(ele._id)}></i>
                                    <span>{ele.likes.length}</span>
                                </div>

                                <div className="no-of-comments">
                                    <i className="fa-regular fa-comment"></i>
                                    <span>{ele.comments.length}</span>

                                </div>


                            </div>

                            <div className="comment-parent">

                                <Comments
                                    postId={ele._id}
                                    comments={ele.comments}
                                    addCommentOnPost={addCommentOnPost}
                                    deleteCommentOnPost={deleteCommentOnPost}

                                />
                            </div>

                        </div>

                    )
                })
            }


        </>
    )
}
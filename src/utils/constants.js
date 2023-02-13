const API_ROOT = 'http://localhost:8000/api/v1';



export const API_URLS = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,
    posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
    createPost: () => `${API_ROOT}/posts/create`,
    createFriendship: (userId) => `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
    friends: () => `${API_ROOT}/friendship/fetch_user_friends`,
    removeFriend: (userId) => `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
    toggleLike: (itemId, itemType) => `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`,
    getLikes: (itemId, itemType) => `${API_ROOT}/likes?likeable_id=${itemId}&likeableType=${itemType}`,
    comment: () => `${API_ROOT}/comments`,
    deleteComments: (commentId, postId) => `${API_ROOT}/comments?comment_id=${commentId}&post_id=${postId}`,
    getComments:(post_id)=> `${API_ROOT}/comments?post_id=${post_id}`,
    editUser: () => `${API_ROOT}/users/edit`,
    userInfo: (userId) => `${API_ROOT}/users/${userId}`,
    searchUser: (searchText) => `${API_ROOT}/users/search?text=${searchText}`

};

export const LOCALSTORAGE_TOKEN_KEY = '__codeial_token__';

//https://www.notion.so/aakashcn/Codeial-api-dics-3a4d0b5a42c54f0a94d951a42aabc13f
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, deletePost } from "./reducers/Posts";
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const postList = useSelector((state) => {
    return state.posts.value
  })

  // useDispatchを使用し、storeに通知
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addPost({
        // 配列の長さで決めるのはNG
        id: postList.length + 1,
        name: name,
        content: content,
      })
      );
      setName('');
      setContent('');
  }

  const handleDelete = (id) => {
    dispatch(
      deletePost({
        id: id
      })
    )
  }
  return (
    <div className="App">
      <h1>redux練習掲示板</h1>
      <div className="addPost">
        <input
          type="text"
          placeholder="お名前"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="投稿内容"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button onClick={() => handleClick()}>投稿</button>
        <hr />
      </div>
      <div className="displayPosts">
        {postList.map((post) => (
          <div key={post.id} className="post">
            <h1 className="postName">{post.name}</h1>
            <p className="postContent">{post.content}</p>
            <button onClick={() => handleDelete(post.id)}>削除</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

function BlogPostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch blog posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading posts...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="App">
      <h1>Blog Posts</h1>
      <ErrorBoundary>
        <BlogPostList posts={posts} />
      </ErrorBoundary>
    </div>
  );
}

export default App;

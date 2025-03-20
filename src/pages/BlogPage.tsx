// src/pages/BlogPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import { loadPosts, Post } from '../utils/postLoader';

const BlogPage = () => {
  // 从 URL 中拿到当前页码
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  
  // 当前页码默认为 1
  const currentPage = pageNumber ? parseInt(pageNumber, 10) : 1;
  
  const [posts, setPosts] = useState<Post[]>([]);
  const postsPerPage = 5; // 每页显示条数

  // 拉取全部文章数据
  useEffect(() => {
    const fetchPosts = async () => {
      const loadedPosts = await loadPosts();
      setPosts(loadedPosts);
    };
    fetchPosts();
  }, []);

  // 计算总页数
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 取出当前页对应的文章
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 分页按钮点击时跳转
  const goToPage = (p: number) => {
    // 限制范围
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    // 路由跳转到 /page/:p
    navigate(`/page/${p}`);
  };

  // 点击阅读更多 或 标题时，跳转到单篇文章
  // 需要在你的 <BlogPost> 或者相关元素上加个 onClick 之类的处理
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">

        {currentPosts.map((post) => (
          <div 
            key={post.slug} 
            onClick={() => navigate(`/${post.slug}`)}
            style={{ cursor: 'pointer' }}
          >
            <BlogPost
              title={post.title}
              date={post.date}
              content={post.content}
            />
          </div>
        ))}

        {/* 分页区域 */}
        {posts.length > 0 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 disabled:bg-gray-200"
            >
              Previous
            </button>
            
            <span className="text-gray-600">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 disabled:bg-gray-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // 这里用Link来做跳转
import BlogPost from '../components/BlogPost';
import { loadPosts, Post } from '../utils/postLoader';

const SinglePostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  // 为了拿到整个 posts 数据，方便做“前/后篇”查找
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      const loadedPosts = await loadPosts();
      setAllPosts(loadedPosts);
      
      // 根据slug找到当前文章
      const foundPost = loadedPosts.find((p) => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center mt-20">文章不存在或slug不正确</div>;
  }

  // 拿到当前文章在数组里的索引
  const foundIndex = allPosts.findIndex((p) => p.slug === slug);

  // 取得上一篇和下一篇（如果有的话）
  const prevPost = foundIndex > 0 ? allPosts[foundIndex - 1] : null;
  const nextPost = foundIndex < allPosts.length - 1 ? allPosts[foundIndex + 1] : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        
        {/* 正文部分 */}
        <BlogPost
          title={post.title}
          date={post.date}
          content={post.content}
        />

        {/* 上一篇 / 下一篇 预览区 */}
        <div className="flex justify-between mt-12 space-x-4">
          {/* 左侧：上一篇 */}
          {prevPost ? (
            <Link to={`/${prevPost.slug}`} className="w-1/2 group">
              <div className="p-4 border border-gray-200 rounded-md hover:shadow-lg transition-shadow">
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                  Previous
                </p>
                <h3 className="text-xl font-semibold text-black">
                  {prevPost.title}
                </h3>
                {/* 可以加一句摘要或日期 */}
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {prevPost.date}
                </p>
              </div>
            </Link>
          ) : (
            <div className="w-1/2" /> // 如果没有上一篇，用空占位维持布局
          )}

          {/* 右侧：下一篇 */}
          {nextPost ? (
            <Link to={`/${nextPost.slug}`} className="w-1/2 group">
              <div className="p-4 border border-gray-200 rounded-md hover:shadow-lg transition-shadow text-right">
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                  Next
                </p>
                <h3 className="text-xl font-semibold text-black">
                  {nextPost.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {nextPost.date}
                </p>
              </div>
            </Link>
          ) : (
            <div className="w-1/2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
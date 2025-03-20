//src/components/BlogPost.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
}

// Hash function: Convert date string to a hue value (0–360)
function hashDateToHue(date: string): number {
    let hash = 0;
    for (let i = 0; i < date.length; i++) {
      hash = date.charCodeAt(i) + ((hash << 5) - hash); // Simple hash algorithm
    }
    return Math.abs(hash) % 360; // Ensure value is between 0 and 360
  }// HSL to RGB conversion function
  function hslToRgb(h: number, s: number, l: number): string {
    s /= 100; // Convert percentage to 0–1 range
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const r = Math.round(255 * f(0));
    const g = Math.round(255 * f(8));
    const b = Math.round(255 * f(4));
    return `rgb(${r}, ${g}, ${b})`;
  }// Generate background color based on date
  function generateBackgroundColor(date: string): string {
    const hue = hashDateToHue(date); // Hue varies by date
    const saturation = 20 + Math.random() * 20; // 20%–40%, low saturation
    const lightness = 40 + Math.random() * 10; // 40%–50%, light color
    return hslToRgb(hue, saturation, lightness);
  }
  
  


const BlogPost = ({ title, date, content }: BlogPostProps) => {

  return (
    <div 
      className="
        mb-14       /* 每篇之间留较大距离 */
        mx-auto
        max-w-3xl   /* 控制正文宽度，利于阅读 */
        transition-shadow
        hover:shadow-lg
        rounded-xl
        bg-white
        overflow-hidden
      "
      style={{
        border: '1px solid #eaeaea', /* 极浅的分割线 */
        
      }}
    >
      {/* 可以用一个「彩色竖条」来增加一点点活泼度 */}
      <div
        className="w-2 h-full float-left"
        style={{ backgroundColor: generateBackgroundColor(date) }}
      />
      
      <div className="p-6">
        {/* 日期和标题部分 */}
        <div className="mb-2">
          <p 
            className="text-sm text-gray-400 uppercase"
            style={{ letterSpacing: '0.08em', color: generateBackgroundColor(date)  }}
          >
            {date}
          </p>
          <h2 
            className="text-2xl font-semibold text-black mt-1 mb-4"
            style={{
              fontFamily: 'ui-sans-serif, PingFang TC, Microsoft YaHei, Helvetica, Arial',
            }}
          >
            {title}
          </h2>
        </div>

        {/* 正文内容 */}
        <div 
          className="text-gray-700 leading-8"
          style={{ fontFamily: 'PingFang TC, Microsoft YaHei, serif' }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>,
              a: ({ href, children }) => (
                <a 
                  href={href} 
                  className="underline text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {children}
                </a>
              ),
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold my-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold my-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold my-3">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl font-semibold my-2">{children}</h4>
              ),
              li: ({ children }) => (
                <li className="list-disc ml-6 mb-2">{children}</li>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;


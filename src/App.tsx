// src/App.tsx
import Typical from 'react-typical';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import SinglePostPage from './pages/SinglePostPage';
import { FaHome } from "react-icons/fa"; // Home icon
import { MdArchive } from "react-icons/md"; // Archive icon

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-7 ml-2" />

              <Typical
                steps={["JIAMING's", 500, "JIAMING's CogitoVault", 1000]}
                loop={Infinity}
                wrapper="span"
                className="text-2xl font-bold ml-1 tracking-tight text-gray-800"
                style={{
                  fontFamily: "ui-sans-serif, PingFang TC, Microsoft YaHei, Helvetica, Arial"
                }}
              />
            </div>

            <div className="space-x-4 text-gray-600 font-medium flex items-center">
              
              <a
                href="https://jamesliu.space/"
                className="hover:text-blue-500 transition-colors"
              >
                <FaHome size={24} />
              </a>
              <Link to="/page/1" className="hover:text-blue-500 transition-colors">
                <MdArchive size={24} />
              </Link>
            </div>
          </div>
        </nav>

        {/* Content Area with Routing */}
        <Routes>
          {/* 让根路径自动跳到 /page/1 */}
          <Route path="/" element={<Navigate to="/page/1" replace />} />

          {/* 分页列表页：/page/1, /page/2, /page/3, ... */}
          <Route path="/page/:pageNumber" element={<BlogPage />} />

          {/* 单篇文章路由：/2025-3-18（slug可以是日期或其他形态） */}
          <Route path="/:slug" element={<SinglePostPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
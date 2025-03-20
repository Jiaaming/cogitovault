import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function generatePostIndex() {
    try {
        // 1️⃣ 定义 src/posts/ 目录路径
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const postsDir = path.join(__dirname, '../src/posts');
        const outputFile = path.join(postsDir, 'index.json'); // Changed to write in src/posts/

        // 2️⃣ 递归读取 src/posts/ 目录中的所有 .md 文件
        const fileList = [];
        async function readDirRecursive(dir) {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                const relativePath = path.relative(postsDir, fullPath).replace(/\\/g, '/'); // 转换为相对路径，使用正斜杠
                if (entry.isDirectory()) {
                    await readDirRecursive(fullPath);
                } else if (entry.isFile() && entry.name.endsWith('.md')) {
                    fileList.push(relativePath);
                }
            }
        }

        await readDirRecursive(postsDir);
        console.log('Found Markdown files:', fileList);

        // 3️⃣ 写入 src/posts/index.json
        await fs.writeFile(outputFile, JSON.stringify(fileList, null, 2), 'utf-8');
        console.log(`Generated ${outputFile} with ${fileList.length} files.`);
    } catch (error) {
        console.error('Error generating post index:', error);
        process.exit(1);
    }
}

generatePostIndex();

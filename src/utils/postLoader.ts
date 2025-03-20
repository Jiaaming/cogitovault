// src/utils/postLoader.ts
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export const loadPosts = async (): Promise<Post[]> => {
const postModules = import.meta.glob('../posts/**/*.md', { as: 'raw', eager: false });
  console.log('Found files:', Object.keys(postModules));

  const postPromises = Object.keys(postModules).map(async (path) => {
    try {

      const module = await postModules[path](); // Attempt to load the file
      const { data, content } = matter(module); // Parse with gray-matter

      const slug = path.split('/').pop()?.replace('.md', '') || '';
      return {
        slug,
        title: data.title || '',
        date: data.date || slug.slice(0, 10),
        content,
      };
    } catch (error) {
      console.error(`Error processing file ${path}:`, error);
      // Return a default post to avoid breaking the Promise.all
      return {
        slug: path.split('/').pop()?.replace('.md', '') || '',
        title: 'Error Loading Post',
        date: 'Unknown Date',
        content: 'Failed to load this post.',
      };
    }
  });

  const loadedPosts = await Promise.all(postPromises);
  console.log('All loaded posts:', loadedPosts); // Check the final array
  return loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
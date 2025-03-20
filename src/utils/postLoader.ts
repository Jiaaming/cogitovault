import fm from 'front-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface PostAttributes {
  title?: string;
  date?: string;
}

export const loadPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch('/posts/index.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch post list: ${response.statusText}`);
    }
    const fileList: string[] = await response.json();

    const postsPromises = fileList.map(async (fileName) => {
      try {
        const fileResponse = await fetch(`/posts/${fileName}`);
        if (!fileResponse.ok) {
          throw new Error(`Failed to fetch file ${fileName}: ${fileResponse.statusText}`);
        }
        const content = await fileResponse.text();

        const { attributes, body } = fm(content);
        const slug = fileName.replace('.md', '');

        return {
          slug,
          title: (attributes as PostAttributes).title || null,
          date: (attributes as PostAttributes).date || slug.slice(0, 10),
          content: body,
        };
      } catch (error) {
        console.error(`Error processing file ${fileName}:`, error);
        return {
          slug: fileName.replace('.md', ''),
          title: 'Error Loading Post',
          date: 'Unknown Date',
          content: 'Failed to load this post.',
        };
      }
    });

    const posts = await Promise.all(postsPromises);
    console.log('Loaded posts:', posts);

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};
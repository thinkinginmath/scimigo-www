import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Layout from '../../components/Layout';

export default function BlogPost({ post, content }) {
  return (
    <Layout>
      <Head>
        <title>{post.title} - SciMigo Blog</title>
        <link rel="canonical" href={`https://www.scimigo.com/blog/${post.slug}`} />
      </Head>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-muted-foreground">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </header>
          
          <div 
            className="blog-content space-y-6 text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
        
        <footer className="mt-16 pt-8 border-t">
          <a 
            href="/blog" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            ← Back to all posts
          </a>
        </footer>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join('posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content: markdownContent } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(markdownContent);
  const content = processedContent.toString();

  return {
    props: {
      post: {
        slug: params.slug,
        ...data,
      },
      content,
    },
  };
}
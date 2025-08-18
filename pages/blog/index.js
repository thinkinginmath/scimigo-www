import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';

export default function Blog({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Blog - SciMigo</title>
        <link rel="canonical" href="https://www.scimigo.com/blog" />
      </Head>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, tutorials, and updates about STEM learning and AI-powered education.
          </p>
        </header>

        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.slug} className="border-b pb-8 last:border-b-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="text-muted-foreground mb-3">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric',
                    })}
                  </div>
                  {post.excerpt && (
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 text-primary font-medium group-hover:text-primary/80 transition-colors">
                    Read more →
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No blog posts yet. Check back soon for STEM learning insights and updates!
              </p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));
  const posts = files
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const fullPath = path.join('posts', filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: data.date,
        excerpt: data.excerpt || '',
        ...data,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

  return { props: { posts } };
}

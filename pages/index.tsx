import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import styles from "../styles/Blog.module.css";

import { formatDate } from "../utils";

import { gql } from "@apollo/client";
import client from "../graphql-client";

type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
};
type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="container">
      <Head>
        <title>@joaovitorzv • blog</title>
        <meta name="description" content="My place on internet" />
      </Head>
      <Header />
      <main className={styles.main}>
        {posts.map((post: Post) => (
          <section key={post.title} className={styles.post}>
            <Link href={`/post/${post.slug}`}>
              <a className={styles.postTitle}>{post.title}</a>
            </Link>
            <span>{formatDate(post.date)}</span>
            <p>{post.description}</p>
            <Link href={`/post/${post.slug}#keep-reading`}>
              continuar lendo...
            </Link>
          </section>
        ))}
      </main>

      <footer className={styles.footer}>
        <p>Copyright &copy; new Date().getFullYear() João Vitor Veras </p>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query BlogPosts {
        posts(orderBy: createdAt_DESC) {
          id
          title
          description
          date
          slug
        }
      }
    `,
  });

  return {
    props: data,
  };
};

export default Home;

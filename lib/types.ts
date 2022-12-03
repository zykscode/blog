import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type Post = {
  id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  date: string;
  summary: string;
  coverImage: string;
  readingTime: string;
  createdAt: string;
  tags: Tag[];
}

export type Slug = string

export type Tag = {
  name: string;
  colors: string;
  posts: Post[];
  slug: string;
}

export type Views = {
  total: number;
};

export type BlurredImages = {
  base64: string;
  postId: any;
  src: string;
  height: number;
  width: number;
  type?: string | undefined;
}
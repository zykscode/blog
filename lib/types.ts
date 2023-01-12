import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type Post = {
  slug: any;
  images?: any;
  id?: string | undefined;
  content?: {
      markdown: string;
  } | undefined;
  title?: string | undefined;
  date?: string | undefined;
  summary?: string | undefined;
  coverImage?: string | undefined;
  readingTime?: string | undefined;
  createdAt?: string | undefined;
  tags?: Tag[] | undefined;

}

export type Slug = string

export type Tag = {
  name: string;
  colors: string;
  posts?: Post[];
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
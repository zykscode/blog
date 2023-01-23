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


export type CommonSEOProps ={
  title: string;
  description: string;
  ogType: string;
  ogImage: string | { url: string }[];
  twImage: string;
  canonicalUrl?: string;
}


export type PageSEOProps = {
  title: string,
  description: string
}
export type TagSEOProps = {
  title: string,
  description: string
}
export type BlogSEOProps = {
  authorDetails?: { name:string }[],
  title: string,
  summary: string,
  date: string,
  lastmod?: string,
  url: string,
  images?: string[]|string,
  canonicalUrl?: string
}




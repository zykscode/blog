export interface WindowWithGtag extends Window {
  gtag: (...args: any[]) => void;
}

export type Post = {
  slug: any;
  images?: any;
  id?: string | undefined;
  content?:
    | {
        markdown: string;
      }
    | undefined;
  title?: string | undefined;
  date?: string | undefined;
  summary?: string | undefined;
  coverPhoto?: CoverImage | undefined;
  readingTime?: string | undefined;
  createdAt?: string | undefined;
  tags?: Tag[] | undefined;
  author: Author;
  isFeatures: boolean;
};

export type Author = {
  id: string;
  posts: Post[];
  name: string;
  bio: string;
  avatar: Avatar;
  slug: string;
  stacks: string;
};

export type Avatar = {
  url: string;
};
export type Slug = string;

export type Tag = {
  name: string;
  colors: string;
  posts?: Post[];
  slug: string;
};

export type Views = {
  total: number;
};

export type CommonSEOProps = {
  title: string;
  description: string;
  ogType: string;
  ogImage: string | { url: string }[];
  twImage: string;
  canonicalUrl?: string;
};

export type PageSEOProps = {
  title: string;
  description: string;
};
export type TagSEOProps = {
  title: string;
  description: string;
};
export type BlogSEOProps = {
  authorDetails?: { name: string }[];
  title: string;
  summary: string;
  date: string;
  lastmod?: string;
  url: string;
  images?: string[] | string;
  canonicalUrl?: string;
};

export type BlurredPhoto =
  | {
      base64: string;
      postId?: any;
      src: string;
      height: number;
      width: number;
      type?: string | undefined;
    }
  | undefined;

export type CoverImage = {
  base64: string;
  postId?: any;
  src: string;
  height: number;
  width: number;
  type?: string | undefined;
};
export type CoverPhoto = {
  url: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};

import { bundleMDX, } from 'mdx-bundler'
import path from 'path'
import remarkMath from 'remark-math'
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes'
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import getAllFilesRecursively from './utils/files';
import { existsSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import remarkCodeTitles from './remark-code-title';
import remarkExtractFrontmatter from './remark-extract-frontmatter';
import remarkTocHeadings from './remark-toc-headings';
import { ProcessorOptions } from '@mdx-js/mdx';
// import rehypeCitation from 'rehype-citation'
import rehypePresetMinify from 'rehype-preset-minify'
import remarkImgToJsx from './remark-img-to-jsx';



interface FileData {
    mdxSource: string;
    toc: any;
    frontMatter: {
        readingTime: number;
        slug: string;
        fileName: string;
        date: string | null;
        [key: string]: any;
    };
}

export async function getFileBySlug(type: string, slug: string): Promise<FileData> {
  const mdxPath = path.join(root, 'data', type, `${slug}.mdx`);
  const mdPath = path.join(root, 'data', type, `${slug}.md`);
  const source = existsSync(mdxPath)
    ? readFileSync(mdxPath, 'utf8')
    : readFileSync(mdPath, 'utf8');

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe');
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild');
  }

  let toc: any[] = [];

  console.log(source);
  const { code, frontmatter } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'components'),
    mdxOptions(options:ProcessorOptions, frontmatter: any) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        // [rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      };
      return options;
    },
  });

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}



const root = process.cwd()

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '');
}

export function dateSortDesc(a: string | Date, b: string | Date) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}



export async function mdxToHtml(source:any) {
  let toc:any[] = []
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm,
        remarkGfm,
        [remarkFootnotes, { inlineNotes: true }]],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
          [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor']
            }
          }
        ],
        rehypeKatex,
        [rehypePrismPlus, { ignoreMissing: true }]
      ],
      format: 'mdx'
    }
  });


  return {
    html: mdxSource,
    wordCount: source.split(/\s+/gu).length,
    readingTime: readingTime(source).text,
    toc
  };
}



export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = path.join(root, 'data', folder);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter: any[] = [];

  files.forEach((file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/');
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return;
    }
    const source = readFileSync(file, 'utf8');
    const { data: frontmatter } = matter(source);
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      });
    }
  });

  return allFrontMatter.sort((a: any, b: any) => dateSortDesc(a.date, b.date));
}
/* eslint-disable no-param-reassign */
import type { BuildOptions } from 'esbuild';
import { bundleMDX } from 'mdx-bundler';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCitation from 'rehype-citation';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
// Rehype packages
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';
// Remark packages
import remarkMath from 'remark-math';

import remarkCodeTitles from './remark-code-title';

const root = process.cwd();

export async function mdxToHtml(source: any) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath, remarkFootnotes],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        rehypeKatex,
        rehypePresetMinify,
        rehypeCitation,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
  });

  const { code } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'components'),
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, 'data') }],
        [rehypePrism, { ignoreMissing: true }],
        rehypePresetMinify,
      ];
      return options;
    },
    esbuildOptions: (options: BuildOptions) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      };
      return options;
    },
  });

  return {
    html: mdxSource,
    code,
    wordCount: source.split(/\s+/gu).length,
    readingTime: readingTime(source).text,
  };
}

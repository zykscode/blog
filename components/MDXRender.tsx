'use client'
import { Post } from '#/lib/types'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import React from 'react'
import BlogImage from './BlogImage'

type Props = {
    post:MDXRemoteSerializeResult
}

export const MDXComponents = {
    BlogImage,
    a: Link,
}

const MDXRender = ({post}: Props) => {
  return (
    <MDXRemote {...post}  />
  )
}

export default MDXRender
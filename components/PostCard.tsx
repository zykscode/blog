import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import type { BlurredPhoto, Post } from '#/lib/types';

import BlogImage from './BlogImage';

type Props = {
  post: Post;
  coverImages: BlurredPhoto[];
};

const PostCard: React.FC<Props> = ({ post, coverImages }) => {
  const passingImages = () => {
    return coverImages.find((img) => img!.postId === post.id);
  };
  const blurImg = passingImages();
  return (
    <Link
      className="collection-card collection-card-size-medium"
      href={`blog/${post.slug}`}
    >
      <div className="collection-card-cover">
        {blurImg && post.title && (
          <BlogImage imgSrc={blurImg} alt={post.title} />
        )}
      </div>
      <div className="collection-card-body">
        <div className="collection-card-property">
          <span className="property property-title">
            <span className="page-link">
              <span className="page-title">
                <div className="page-icon-inline page-icon-image">
                  <svg
                    className="page-title-icon page-icon"
                    viewBox="0 0 30 30"
                    width="16"
                  >
                    <path d="M16,1H4v28h22V11L16,1z M16,3.828L23.172,11H16V3.828z M24,27H6V3h8v10h10V27z M8,17h14v-2H8V17z M8,21h14v-2H8V21z M8,25h14v-2H8V25z"></path>
                  </svg>
                </div>
                <span className="page-title-text">{post.title}</span>
              </span>
            </span>
          </span>
        </div>
        <div className="collection-card-property">
          <span className="property property-text">{post.summary}</span>
        </div>
        <div className="collection-card-property">
          <span className="property property-date">
            <time dateTime={post.createdAt}>
              {moment(post.createdAt).format('MMMM Do YYYY')}{' '}
            </time>
          </span>
        </div>
        <div className="collection-card-property">
          <span className="property property-multi_select">
            {post.tags!.map((tag) => {
              return (
                <div
                  key={tag.name}
                  className={`property-multi_select-item item-${tag.colors}`}
                >
                  {tag.name}
                </div>
              );
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;

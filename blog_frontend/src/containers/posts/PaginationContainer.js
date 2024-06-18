import React from 'react';
import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
const PaginationContainer = () => {
  const [searchParams] = useSearchParams();
  const { username } = useParams();
  const tag = searchParams.get('tag');
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    loading: loading['posts/LIST_POSTS'],
    posts: posts.posts,
  }));
  if (!posts || loading) return null;
  let postExist = false;
  if (posts.length !== 0) {
    postExist = true;
  }
  return (
      <Pagination
        tag={tag}
        lastPage={lastPage}
        username={username}
        page={parseInt(page, 10)}
        postExist={postExist}
      />

  );
};

export default PaginationContainer;

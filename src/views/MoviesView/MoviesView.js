import React, { useState } from 'react';

import Searchbar from '../../components/Searchbar';
import GalleryView from '../GalleryView';

export default function MoviesView() {
  const [searchQuery, setsearchQuery] = useState('');

  return (
    <>
      <Searchbar onSubmit={setsearchQuery} />
      <GalleryView searchQuery={searchQuery} />
    </>
  );
}

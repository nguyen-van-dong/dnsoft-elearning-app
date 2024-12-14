import React, { useCallback, useState } from 'react'
import { AutoComplete, Input } from 'antd';
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux';
import { handleSearch, setNullSearchResult } from '../app/appSlice';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { convertToSlug } from '../utils/common';
import { LOCAL_KEY_POST } from '../const/common';

const renderTitle = (title, url) => (
  <span>
    {title}
    <a
      style={{
        float: 'right',
      }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title, url = null) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {
        url ? <Link to={url}>{title}</Link> : ''
      }
    </div>
  ),
});

function AutocompleteSearch() {
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();
  const searchResult = useSelector(state => state.app.searchResult);
  const searching = useSelector(state => state.app.searching);

  const options = [];

  if (searchResult?.courses?.length > 0) {
    options.push({
      label: renderTitle('Khoá Học'),
      options: searchResult?.courses?.map((item, idx) => (renderItem(item.name, `/courses/${convertToSlug(item.slug)}`))),
    })
  }
  if (searchResult?.posts?.data?.length > 0) {
    options.push({
      label: renderTitle('Bài Viết'),
      options: searchResult?.posts?.data?.map((item, idx) => (renderItem(item.name, `/posts/${convertToSlug(item.url)}`))),
    })
  }
  if (searchResult?.courses?.length == 0 && searchResult?.posts?.data?.length && searchResult?.videos?.length == 0) {
    // options.push({
    //   label: renderTitle('Video'),
    //   options: renderItem('Not result'),
    // })
  }

  const debouncedOnChange = useCallback(debounce(handleDebounce, 500), []);

  const onHandleSearch = (e) => {
    setKeyword(e?.target?.value);
    debouncedOnChange(e?.target?.value);
  }

  function handleDebounce(value) {
    if (value) {
      dispatch(handleSearch(value));
    } else {
      dispatch(setNullSearchResult());
    }
  }

  return (
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={20}
      className='header-search-inner'
      options={searchResult ? options : null}
      onSelect={(value) => {
        setKeyword('')
        dispatch(setNullSearchResult());
        localStorage.setItem(LOCAL_KEY_POST, '')
      }}
      value={keyword}
      // allowClear={true}
      onClear={() => setKeyword('')}
    >
      <Input
        placeholder="Tìm kiếm khóa học, bài viết" size="large"
        style={{ borderRadius: 20 }}
        className='header-search-input'
        onChange={onHandleSearch}
        prefix={<SearchOutlined />}
        suffix={
          searching ? <SyncOutlined spin
            style={{
              color: 'rgba(0,0,0,.45)',
            }} /> : ''
        }
      />
    </AutoComplete>
  )
}

export default AutocompleteSearch

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import './admin.css';

const URL = process.env.REACT_APP_URL;

const GENRE = [
  'comedy',
  'romance',
  'action',
  'slice of life',
  'horror',
  'fantasy',
  'shounen',
  'historical',
];

const Admin = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState(
    GENRE.map((each) => ({ genre: each, checked: false }))
  );
  const [imgFile, setImgFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', imgFile);
    form.append('title', title);
    form.append('description', description);
    const genreString = genre.reduce((prev, cur) => {
      if (cur.checked) {
        if (prev === '') return cur.genre;
        prev += ' ' + cur.genre;
        return prev;
      }
      return prev;
    }, '');
    form.append('genre', genreString);

    const res = await fetch(URL + '/admin/post-anime', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + props.jwt,
      },
      body: form,
    });
    if (res.status !== 201) throw new Error('failed to add new anime');
    await res.json();
    history.push('/');
  };

  let adminPage = null;
  if (!props.loading) {
    adminPage =
      !props.jwt || props.user.role !== 'admin' ? (
        <Redirect to="/" />
      ) : (
        <form
          className="add-anime"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <ul>
            <li className="flex-list-items">
              <label>Title</label>
              <input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </li>
            <li className="flex-list-items">
              <label>Description</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </li>
            <li className="flex-list-items">
              <label>Genre</label>
              <div className="flex-genre">
                {GENRE.map((each, index) => (
                  <React.Fragment key={index}>
                    <label>{each}</label>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const genreTmp = [...genre];
                        const i = genre.findIndex(
                          (each) => each.genre === e.target.name
                        );
                        genreTmp[i].checked = e.target.checked;
                        setGenre(genreTmp);
                      }}
                      name={each}
                    />
                  </React.Fragment>
                ))}
              </div>
            </li>
            <li className="flex-list-items">
              <label>Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setImgFile(e.target.files[0]);
                }}
              />
            </li>
          </ul>
          <button type="submit" className="submit-button">
            Add Anime
          </button>
        </form>
      );
  }

  return props.loading ? <h1>Loading...</h1> : adminPage;
};

const mapStateToProps = (state) => {
  return {
    loading: state.webGeneral.loading,
    jwt: state.auth.jwt,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Admin);

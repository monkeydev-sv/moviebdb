import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({  title: '', message: '', tags: '', selectedFile: '',actors: '',genres: '',years:'' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '', actors: '',genres: '',years:'' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost({ ...postData, name: user?.result?.name }));
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          clear();
        }
      };
    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              
              Please Sign In to insert a new movie!

            </Typography>
            <Typography variant="h7">Welcome to this database of movies, you can help us fill it out by creating an account and uploading your favorite movies.</Typography>
          </Paper>
        );
      }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Upload a new Movie'}</Typography>
             <TextField name="title" variant="outlined" label="Movie title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
             <TextField name="director" variant="outlined" label="Director" fullWidth value={postData.director} onChange={(e) => setPostData({ ...postData, director: e.target.value.split(',') })} />
                <TextField name="actors" variant="outlined" label="Actors" fullWidth value={postData.actors} onChange={(e) => setPostData({ ...postData, actors: e.target.value.split(',') })} />
                <TextField name="genres" variant="outlined" label="Genres" fullWidth value={postData.genres} onChange={(e) => setPostData({ ...postData, genres: e.target.value.split(',') })} />
                <TextField name="years" variant="outlined" label="Year" fullWidth value={postData.years} onChange={(e) => setPostData({ ...postData, years: e.target.value })} />

                
                <TextField name="message" variant="outlined" label="Information" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;
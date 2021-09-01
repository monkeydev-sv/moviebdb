import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './input';
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    
    
    const isSignup = true;

     const handleSubmit = () =>{
        
     }
     const handleChange = () =>{

     }

    return (
        <Container component ="main" maxWidth="xs">
<Paper className={classes.paper} elevation={3}>
    <Avatar className={classes.avatar}>
        <LockOutlinedIcon>

        </LockOutlinedIcon>
    </Avatar>
    <Typography variant="h5">{isSignup ? 'Sign up for publish movie' : 'Sign in for publish a new movie'}</Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
<Grid container spacing={2}>
    {
        isSignup && (
        <>
        
        
        <Input name ="firsname" label="First Name" handleChange={handleChange} autoFocus half/>
       <Input name="lastName" label="Last Name" handleChange={handleChange} half />
        </>
        )}
        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
</Grid>
<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
    </form>
</Paper>

        </Container>
    );
};
export default Auth;
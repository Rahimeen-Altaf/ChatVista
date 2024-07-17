import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
//import {CameraAltI as CameraAltIcon} from '@mui/icons-material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from "../utils/validators";
import { bgGradient } from "../constants/color";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin(prev => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  }

  const handleSignUp = (e) => {
    e.preventDefault();
  }

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler("single");

  return (
    <div style={{
      backgroundImage: bgGradient,
    }}>
    <Container component={"main"} maxWidth="xs" sx={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form style={{width: "100%", marginTop: "1rem"}}
            onSubmit={handleLogin}
            >
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
                />
              
              {
                username.error && (
                  <Typography color="error" variant="caption">{username.error}</Typography>
                )
              }

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
                />
              
              {
                password.error && (
                  <Typography color="error" variant="caption">{password.error}</Typography>
                )
              }

              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                >
                Login
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>OR</Typography>

              <Button
                variant="text"
                fullWidth
                onClick={toggleLogin}
                >
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form style={{width: "100%", marginTop: "1rem"}}
            onSubmit={handleSignUp}
            >
              
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar sx={{width: "10rem", height: "10rem", objectFit: "contain"}}
                src={avatar.preview}
                />

                <IconButton sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.5)",
                  ":hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  }
                }}
                  component= "label"
                  >
                  <>
                  <CameraAltIcon />
                  <VisuallyHiddenInput type="file" onChange={avatar.changeHandler}/>
                  </>
                </IconButton>
              </Stack>

                  {
                    avatar.error && (
                      <Typography m={"1rem auto"} width={"fit-content"} display={"block"} color="error" variant="caption">{avatar.error}</Typography>
                    )
                  }

            <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
                />

            <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
                />
              
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
                />

              {
                username.error && (
                  <Typography color="error" variant="caption">{username.error}</Typography>
                )
              }

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
                />
              
              {
                password.error && (
                  <Typography color="error" variant="caption">{password.error}</Typography>
                )
              }

              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                >
                Sign Up
              </Button>

              <Typography textAlign={"center"} m={"1rem"}>OR</Typography>

              <Button
                variant="text"
                fullWidth
                onClick={toggleLogin}
                >
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
        </div>
  );
};

export default Login;

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { LockOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { loginSchema, type LoginSchema } from "../../tools/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "./userApi";
import { useState } from "react";

export default function LoginForm() {
  //      a2@op.pl
  //      Pa$$w0rd!

  //redux login endpoint => consumes LoginSchema -> map to Api requested object
  const [login, { isLoading: loginLoading }] = useLoginUserMutation();
  const [token, setToken] = useState<string>("");

  //zod validation triggered by onTouch
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    //login form schema -> required by zod to validate the form
    resolver: zodResolver(loginSchema),
  });

  //custom call to api => async await!
  const onSubmit = async (data: LoginSchema) => {
    const response = await login(data);
    console.log(response);
    setToken(response.data!.accessToken);
    console.log("token: ", token);
  };

  if (loginLoading || !login) {
    return <Box>Loading...</Box>;
  }

  return (
    <Container maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={8}
      >
        <LockOutline sx={{ mt: 3, color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">Sign In</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          marginY={3}
        >
          <TextField
            fullWidth
            label="Email"
            autoFocus
            {...register("email", { required: "email is missing" })}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", { required: "password is missing" })}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          <Button disabled={loginLoading} variant="outlined" type="submit">
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?
            <Typography
              component={Link}
              to="/register"
              sx={{ ml: 2 }}
              color="primary"
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

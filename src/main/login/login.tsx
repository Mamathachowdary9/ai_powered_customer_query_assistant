import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import "./login.css";
import { ReactComponent as WhiteCircleIcon } from "../assets/whiteCircleIcon.svg";
import { ReactComponent as PersonIcon } from "../assets/person_outline.svg";
import { ReactComponent as LockIcon } from "../assets/lock_open.svg";
import { ReactComponent as Visibility } from "./../assets/visibility.svg";
import { ReactComponent as VisibilityOff } from "./../assets/visibility_off.svg";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [validateUser, setValidateUser] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleLogin = async (values: any) => {
    try {
      const response = await fetch(
        "https://ai-assistant-backend-node-1.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: values.username,
            password: values.password,
          }),
        }
      );
      const data = await response.json();
      if (data.message === "Invalid credentials") {
        setAlertOpen(true);
        setValidateUser("Invalid credentials");
        localStorage.setItem("login", "false");
      } else if (data.message === "Login successful") {
        setAlertOpen(true);
        setValidateUser("Successfully login!");
        localStorage.setItem("login", "true");
        localStorage.setItem("userType", data.userType);
        navigate("/products");
      }
    } catch (error) {
      console.log("error occured");
    } finally {
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
        "Please enter a valid email address"
      )
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
    validationSchema: signInSchema,
  });

  return (
    <>
      <div className="login-background">
        <div className="login-container">
          <div className="div-container">
            <div className="left-login-div">
              <div className="text-container">
                <div className="text-header">Welcome to Zitara Store</div>
                <div className="text-header-1">How it works?</div>
                <div className="text-content">
                  <div className="text-icon-container">
                    <div className="text-icon">
                      <WhiteCircleIcon className="icons-bg-img" />
                      <PersonIcon className="login-icons" />
                    </div>
                    <Typography
                      sx={{ fontSize: "var(--Font-size-h6, 1.1875rem)" }}
                    >
                      Log In to Start Shopping
                    </Typography>
                  </div>
                  <div className="text-icon-container">
                    <div className="text-icon">
                      <WhiteCircleIcon className="icons-bg-img" />
                      <LockIcon className="login-icons" />
                    </div>
                    <Typography
                      sx={{ fontSize: "var(--Font-size-h6, 1.1875rem)" }}
                    >
                      Track Your Orders using chatbot ai
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-login-div">
              <div className="sign-in-container">
                <Typography
                  className="sign-in-header"
                  variant="h5"
                  component="h1"
                >
                  {"Sign In"}
                </Typography>
                <div className="sign-in-content">
                  {
                    <form onSubmit={formik.handleSubmit}>
                      <TextField
                        className={
                          formik.touched.username && formik.errors.username
                            ? "sign-in-fields-error"
                            : "sign-in-fields"
                        }
                        placeholder="Email*"
                        variant="outlined"
                        value={formik.values.username}
                        error={Boolean(
                          formik.touched.username && formik.errors.username
                        )}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="username"
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="error-msg">
                          {formik.errors.username}
                        </div>
                      ) : null}
                      <OutlinedInput
                        className={
                          formik.touched.password && formik.errors.password
                            ? "sign-in-fields-error"
                            : "sign-in-fields"
                        }
                        placeholder="Password*"
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((show) => !show)}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility className="my-svg-icon" />
                              ) : (
                                <VisibilityOff className="my-svg-icon" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="error-msg">
                          {formik.errors.password}
                        </div>
                      ) : null}
                      <Button
                        fullWidth
                        type="submit"
                        className="sign-in-button"
                      >
                        Sign In
                      </Button>
                    </form>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="login-footer">© 2025 Mamatha all rights reserved</div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        open={alertOpen}
        message={validateUser}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={
            validateUser === "Invalid credentials" ? "error" : "success"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {validateUser}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;

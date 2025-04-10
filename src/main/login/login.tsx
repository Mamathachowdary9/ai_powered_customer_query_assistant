import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import "./login.css";
import { ReactComponent as WhiteCircleIcon } from "../assets/whiteCircleIcon.svg";
import { ReactComponent as PersonIcon } from "../assets/person_outline.svg";
import { ReactComponent as LockIcon } from "../assets/lock_open.svg";

const Login = () => {
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
                    <form
                    // onSubmit={formik.handleSubmit}
                    >
                      <TextField
                        className="sign-in-fields"
                        // className={
                        //   formik.touched.username && formik.errors.username
                        //     ? "sign-in-fields-error"
                        //     : "sign-in-fields"
                        // }
                        placeholder="Email*"
                        variant="outlined"
                        // value={formik.values.username}
                        // error={Boolean(
                        //   formik.touched.username && formik.errors.username
                        // )}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        name="username"
                      />
                      {/* {formik.touched.username && formik.errors.username ? (
                        <div className="error-msg">
                          {formik.errors.username}
                        </div>
                      ) : null} */}
                      <OutlinedInput
                        className="sign-in-fields"
                        // className={
                        //   formik.touched.password && formik.errors.password
                        //     ? "sign-in-fields-error"
                        //     : "sign-in-fields"
                        // }
                        placeholder="Password*"
                        // type={showPassword ? "text" : "password"}
                        // value={formik.values.password}
                        // error={
                        //   formik.touched.password &&
                        //   Boolean(formik.errors.password)
                        // }
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        name="password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              aria-label="toggle password visibility"
                              //   onClick={() => setShowPassword((show) => !show)}
                              //   onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {/* {showPassword ? (
                                <Visibility className="my-svg-icon" />
                              ) : (
                                <VisibilityOff className="my-svg-icon" />
                              )} */}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {/* {formik.touched.password && formik.errors.password ? (
                        <div className="error-msg">
                          {formik.errors.password}
                        </div>
                      ) : null} */}
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
    </>
  );
};

export default Login;

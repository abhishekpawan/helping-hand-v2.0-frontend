import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { showNotification } from "../../utils/ToastNotification";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import "./Login&Signup.css";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  role: "individual" | "organisation";
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { setUser, isUserLoggedIn, setUserLoggedin } = useContext(AppContext);
  let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const [isSpinning, setSpining] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 34, color: "#002047" }} spin />
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  //if user loggedin navigate to homepage
  useEffect(() => {
    if (isUserLoggedIn == true) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  const onSubmit: SubmitHandler<Inputs> = async (signupData) => {
    let signupBody = {
      ...signupData,
      role,
    };
    setSpining(true);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupBody),
      };
      let response = await fetch(
        "http://localhost:3005/user/signup",
        requestOptions
      );
      const data = await response.json();

      if (data.success == true) {
        const userInfromation = {
          id: data.userData._id,
          name: data.userData.name,
          email: data.userData.email,
          phone: data.userData.phone,
          role: data.userData.role,
        };
        localStorage.setItem("user", JSON.stringify(userInfromation));
        setUser(userInfromation);
        setUserLoggedin(true);
        setSpining(false);

        showNotification(
          "success",
          "You signed up successfully! \n Welecome to Findemy!"
        );
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setSpining(false);

      showNotification("error", error.toString());
    }
  };

  const showPassword = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <main className="signup d-flex justify-content-center align-items-center p-5">
      <div className="container d-flex justify-content-center align-items-center m-5">
        <div className="signup__form  d-flex flex-column d-flex justify-content-center align-items-center">
          <h2 className="signup__heading fw-bold fs-3 mb-5">
            Sign up and start donating
          </h2>
          {role === "" ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h2 className="signup__heading fw-bold fs-3 mb-4">Are you </h2>
              <button
                onClick={() => setRole("individual")}
                className="justify-content-center fs-3"
              >
                an Individual
              </button>
              <button className="justify-content-center fs-3">OR</button>

              <button
                onClick={() => setRole("organisation")}
                className="justify-content-center fs-3"
              >
                an Organisation
              </button>
            </div>
          ) : (
            <div>
              <Spin indicator={antIcon} spinning={isSpinning}>
                <div className="signup__terms-and-policy mt-3 fs-5 text-center">
                  <p>
                    You're signing up as an <b className="fs-4">{role}!</b>{" "}
                    <a
                      onClick={() => setRole("")}
                      className="text-decoration-underline"
                    >
                      (change)
                    </a>
                  </p>
                </div>

                <form
                  className="d-flex flex-column"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder={
                        role === "individual"
                          ? "Your full name"
                          : "Name of your organisation"
                      }
                      {...register("name", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                      })}
                    />

                    {errors.name && (
                      <p className="error" role="alert">
                        <span className="mb-3 text-danger">
                          name must be more than 6 characters and less than 20
                          characters
                        </span>
                      </p>
                    )}

                    <label htmlFor="fullName">
                      {role === "individual"
                        ? "Full name"
                        : "Name of your organisation"}
                    </label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder={
                        role === "individual"
                          ? "Email"
                          : "Email of your organisation"
                      }
                      {...register("email", {
                        required: true,
                        pattern: email_regex,
                      })}
                    />

                    {errors.email && (
                      <p className="error" role="alert">
                        <span className="mb-3 text-danger">
                          Please enter a valid email ID!
                        </span>
                      </p>
                    )}

                    <label htmlFor="email">
                      {" "}
                      {role === "individual"
                        ? "Email"
                        : "Email of your organisation"}
                    </label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      maxLength={10}
                      placeholder={
                        role === "individual"
                          ? "Phone"
                          : "Phone number of your organisation"
                      }
                      {...register("phone", {
                        required: true,
                        maxLength: 10,
                      })}
                    />

                    {errors.phone && (
                      <p className="error" role="alert">
                        <span className="mb-3 text-danger">
                          Please enter your 10 digit phone number!
                        </span>
                      </p>
                    )}

                    <label htmlFor="phone">
                      {role === "individual"
                        ? "Phone"
                        : "Phone number of your organisation"}
                    </label>
                  </div>

                  <div className="form-floating">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        pattern: password_regex,
                      })}
                    />

                    {errors.password && (
                      <p className="error" role="alert">
                        <span className="mb-3 text-danger">
                          password should be min 6 character with MIX of
                          Uppercase, lowercase, digits and symbols!
                        </span>
                      </p>
                    )}

                    <label htmlFor="password">Password</label>
                    <a>
                      {passwordVisible ? (
                        <AiFillEyeInvisible onClick={showPassword} />
                      ) : (
                        <AiFillEye onClick={showPassword} />
                      )}
                    </a>
                  </div>

                  <button>Sign up</button>
                </form>
              </Spin>
              <div className="signup__terms-and-policy mt-3 fs-6 text-center">
                <p>
                  By signing up, you agree to our <u>Terms of Use</u> and{" "}
                  <u>Privacy Policy..</u>
                </p>
              </div>
              <div className="signup__terms-and-policy__underline"></div>

              <div className="signup__login d-flex justify-content-center">
                <p className="m-0">
                  Already have an account?
                  <Link to="/login"> Log in</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Signup;

import React, { useState, useEffect } from "react";
import { connect, useDispatch, useStore, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { login } from "../store/slices/auth";
import { useRouter } from "next/router";
import { wrapper } from "../store";
function Login(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.table(data);
    (async () => {
      let { email, password } = data;
      let res = await dispatch(
        login({
          grant_type: "password",
          email,
          password,
        })
      );

      if (res.payload.isLogin) {
        router.push("/");
      }
    })();
  };

  return (
    <>
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Account"
                          {...register("email", {
                            required: "this is a required",
                          })}
                        />
                        <label htmlFor="floatingInput">Account </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          {...register("password", {
                            required: "this is a required",
                          })}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>

                      <div className="d-grid">
                        <button
                          className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                          type="submit"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    ({ ctx }) => {
      const { isLogin, me } = store.getState().auth;
      if (isLogin) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      return {
        props: {},
      };
    }
);

export default Login;

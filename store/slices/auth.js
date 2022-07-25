import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
import { HYDRATE } from "next-redux-wrapper";

// 退出登录
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMsg: error.message });
  }
});

// 获取用户信息
export const fetchUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.PRODUCT_API}api/auth`);
    return response.data.name;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMsg: error.message });
  }
});

// 登录
export const login = createAsyncThunk(
  "/api/login",
  async (credentials, thunkAPI) => {
    try {
      // 获取token信息
      const response = await axios.post(
        `api/auth/login`,
        qs.stringify(credentials)
      );
      const resdata = response.data;
      if (resdata.token) {
        // 获取用户信息
        const refetch = await axios.get(`http://127.0.0.1:2699/api/auth`, {
          headers: { Authorization: `Bearer ${resdata.token}` },
        });
        return {
          accessToken: resdata.token,
          isLogin: true,
          me: { name: refetch.data.name, user_id: refetch.data.id },
          user_id:  refetch.data.id ,
        };
      } else {
        return thunkAPI.rejectWithValue({ errorMsg: response.data.message });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMsg: error.message });
    }
  }
);

// 初始化数据
const internalInitialState = {
  accessToken: null,
  me: null,
  user_id: null,
  errorMsg: null,
  isLogin: false,
};

// reducer
export const authSlice = createSlice({
  name: "auth",
  initialState: internalInitialState,
  reducers: {
    updateAuth(state, action) {
      state.accessToken = action.payload.accessToken;
      state.me = action.payload.me;
    },
    reset: () => internalInitialState,
  },
  extraReducers: {
    // 水合，拿到服务器端的reducer注入到客户端的reducer，达到数据统一的目的
    [HYDRATE]: (state, action) => {
      // console.log("HYDRATE", state, action.payload);
      return Object.assign({}, state, { ...action.payload.auth });
    },
    [login.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLogin = action.payload.isLogin;
      state.me = action.payload.me;      
      state.user_id = action.payload.user_id;      
    },
    [login.rejected]: (state, action) => {
      
      state = Object.assign(Object.assign({}, internalInitialState), {
        errorMsg: action.payload.errorMsg,
      });      
    },
    [fetchUser.rejected]: (state, action) => {
      state = Object.assign(Object.assign({}, internalInitialState), {
        errorMsg: action.errorMsg,
      });
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.me = action.payload;
    },
    [logout.fulfilled]: (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.me = null;
      state.isLogin = false;
    },
  },
});

export const { updateAuth, reset } = authSlice.actions;

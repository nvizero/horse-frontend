import axios from "axios";

class BaseApi {
  constructor(accessToken, subPath) {
    this.config = {};
    if (accessToken) {
        this.config.headers = {
          authorization: `Bearer ${accessToken}`,
        };
    }    
    this.apiUrl = `${process.env.API_HTTP}${"api/v1"}` + subPath;
    this.apiAuthUrl = `${process.env.API_HTTP}${"api/auth"}` + subPath;
  }

  getAll() {
    let url = `${this.apiUrl}`;    
    let resp = axios.get(url);   
    return resp;
  }

  update(id, data) {
    return axios.patch(`${this.apiUrl}/${id}`, data, this.config);
  }

  getByUser() {
    return axios.get(`${this.apiUrl}/me`, this.config);
  }

  getById(id) {
    return axios.get(`${this.apiUrl}/${id}`);
  }

  getBySlug(slug) {
    return axios.get(`${this.apiUrl}/s/${slug}`);
  }

  create(data) {
    return axios.post(this.apiUrl, data, this.config);
  }

  register(data) {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return axios({
      method: "post",
      url: `${this.apiAuthUrl}`,
      data: data,
      headers: headers,
    });    
  }

  login(data) {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return axios({
      method: "post",
      url: `${this.apiAuthUrl}`,
      data: data,
      headers: headers,
    });
  }

  logout(data) {    
    // let headers = {
    //   "Content-Type": "application/json",
    //   "Accept": "application/json",
    //   authorization: `Bearer ${accessToken}`,
    // };
    // console.log( 'headers' , this.apiAuthUrl , data , this.config.headers);
    return axios({
      method: "post",
      url: `${this.apiAuthUrl}`,      
      headers: this.config.headers,
    });
  }
}

export default BaseApi;

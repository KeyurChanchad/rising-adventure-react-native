import axios from 'axios';
import config from '../config'

const mainUrl = config.baseUrl + '/api';

export const api = async (endpoint, data, type, token) => {
  var res;
  if (token) {
    token = user_info[0].token;
    console.log(`Token jwt is ${token}`);
  }

  switch (type) {
    case 'post':
      await axios({
        data: data,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${token}`,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          if (err.response.status === 400) {
            res = err.response;
          }
          if (
            err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 503
          ) {
            res = err.response;
          }
        });
      break;
    case 'get':
      await axios({
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${token}`,
        },
        url: mainUrl + endpoint,
      }).then((response) => {
        res = response;
      }).catch((err) => {

        if (err.response.status === 400) {
          res = err.response;
        }
        if (
          err.response.status === 401 ||
          err.response.status === 403 ||
          err.response.status === 503
        ) {
          res = err.response;
        }
        // 
      });
      break;
    case 'put':
      await axios({
        method: 'put',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          authorization: `${token}`,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          if (err.response.status === 400) {
            res = err.response;
          }
          if (
            err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 503
          ) {
            res = err.response;
          }
          // 
        });
      break;
    case 'delete':
      await axios({
        data: data,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${token}`,
        },
        url: mainUrl + endpoint,
      })
        .then(function (response) {
          res = response;
        })
        .catch((err) => {
          if (err.response.status === 400) {
            res = err.response;
          }
          if (
            err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 503
          ) {
            res = err.response;
          }
        });
      break;
    default:
      return true;
  }
  return res;
};
export const checkData = (data) => {
  return true;
};

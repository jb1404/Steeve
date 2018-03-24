import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api',
});

const errHandler = err => {
  console.error(err.response.data);
  throw err.response.data;
};

export default {
  service: service,
  
  getNotes() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhYWY2YWI2NDljNjJlMzZlMDA2OTlmZCJ9.t2HEXtInBmlX675Bezx6rjRGs7Lm_m-94JJDKOGtCis';
    return service
    .get('notes')
    .then(res => res.data)
    .catch(errHandler);
  },
  createNote() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhYWY2YWI2NDljNjJlMzZlMDA2OTlmZCJ9.t2HEXtInBmlX675Bezx6rjRGs7Lm_m-94JJDKOGtCis';
    return service
    .post('notes/123/addNote')
    .then(res => res.data)
    // .then(console.log(res.data))
    .catch(errHandler)
  }
  
};

// signup(userInfo) {
//   const formData = new FormData();
//   Object.keys(userInfo).forEach(key => formData.append(key, userInfo[key]));
//   return service
//     .post('/signup', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then(res => res.data)
//     .catch(errHandler);
// },

// login(username, password) {
//   return service
//     .post('/login', {
//       username,
//       password,
//     })
//     .then(res => {
//       const { data } = res;
//       localStorage.setItem('user', JSON.stringify(data));
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
//       return data;
//     })
//     .catch(errHandler);
// },

// getSecret() {
//   return service
//     .get('/secret')
//     .then(res => res.data)
//     .catch(errHandler);
// },

// logout() {
//   delete axios.defaults.headers.common['Authorization'];
//   localStorage.removeItem('user');
// },

// loadUser() {
//   const userData = localStorage.getItem('user');
//   if (!userData) return false;
//   const user = JSON.parse(userData);
//   if (user.token && user.name) {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
//     return user;
//   }
//   return false;
// },


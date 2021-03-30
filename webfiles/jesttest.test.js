const axios = require('axios');
let user
test('login', async () => {
  let token= await axios.post('http://127.0.0.1:4000/api/login', { withCredentials: true }, {
        username: 'admin',
        password: 'passwordadmin'
    })
      expect(token.u).toBe('admin') 
});
test('chats',() => {
    let result = axios.get('http://127.0.0.1:4000/api/chats', { withCredentials: true })
        .then(function (response) {
            expect(response.count).toBe(1);
        })
});
test('allusers',() => {
    let result = axios.get('http://127.0.0.1:4000/api/users', { withCredentials: true })
        .then(function (response) {
            expect(response.count).toBe(5);
        })
});
test('allusers',() => {
   let result=  axios.post('http://127.0.0.1:4000/api/chats', { withCredentials: true }, {
        friendname: 'user2'  
    })
    expect(result).toBe(2);
        // .then(function (response) {
        //     expect(response).toBe(2);
        // })
});

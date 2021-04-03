/**
 * @jest-environment node
 */

 const axios= require('axios')
 const {test, expect}= require('@jest/globals')
 test('succcess login', async()=>{
  let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
         "username": 'admin',
         "password": 'passwordadmin2'
     })
         expect(res.status).toBe(200)
 })
 test('fail login', async()=>{
     let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
            "username": 'admin',
            "password": 'password'
        }).catch(function(error){
         expect(error.response.status).toBe(401)
        })
           
    })
    test('get users', async()=>{
     let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
         "username": 'admin',
         "password": 'passwordadmin'
     })
     let token=res.data.token
     let Users = await axios.get('http://192.168.100.5:3000/api/users',{
         headers:{
             Authorization:`${token}`
         }
     })
     expect(Users.data.length).toBe(5)
    })
    test('get users with no token', async()=>{
     let token=""
     let Users = await axios.get('http://192.168.100.5:3000/api/users',{
         headers:{
             Authorization:`${token}`
         }
     })
     .catch(function(error){
         expect(error.response.status).toBe(401)
        })
    })
    test('get Chats', async()=>{
     let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
         "username": 'admin',
         "password": 'passwordadmin'
     })
     let token=res.data.token
     let Chats = await axios.get('http://192.168.100.5:3000/api/chats',{
         headers:{
             Authorization:`${token}`
         }
     })
     expect(Chats.status).toBe(200)
    })
    test('get chats with no token', async()=>{
     let token=""
     let Chats = await axios.get('http://192.168.100.5:3000/api/chats',{
         headers:{
             Authorization:`${token}`
         }
     })
     .catch(function(error){
         expect(error.response.status).toBe(401)
        })
    })
 
 
    test('get admin chats', async()=>{
     let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
         "username": 'admin',
         "password": 'passwordadmin'
     })
     let token=res.data.token
     let Chats = await axios.get('http://192.168.100.5:3000/api/admin/chats',{
         headers:{
             Authorization:`${token}`
         }
     })
     expect(Chats.status).toBe(200)
    })
    test('get admin chats with user token', async()=>{
     let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
         "username": 'user1',
         "password": 'password1'
     })
     let token=res.data.token
         let Chats = await axios.get('http://192.168.100.5:3000/api/admin/chats',{
         headers:{
             Authorization:`${token}`
         }
     })
     .catch(function(error){
         expect(error.response.status).toBe(401)
        })
    })
    test('get admin chats with no token', async()=>{
     let token=""
     let Chats = await axios.get('http://192.168.100.5:3000/api/admin/chats',{
         headers:{
             Authorization:`${token}`
         }
     })
     .catch(function(error){
         expect(error.response.status).toBe(401)
        })
    })
 
 
    test('post chats', async()=>{
     let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
         "username": 'user1',
         "password": 'password1'
     })
     let token=res.data.token
     let PostChat = await axios.post('http://192.168.100.5:3000/api/chats',{
         friendname:3},{
         headers:{
             Authorization:`${token}`
         }
     })
     expect(PostChat.status).toBe(200)
    })
    test('post chats with no token', async()=>{
     let token=""
     let PostChat = await axios.post('http://192.168.100.5:3000/api/chats',{
         friendname:3},{
         headers:{
             Authorization:`${token}`
         }
     })
     .catch(function(error){
         expect(error.response.status).toBe(401)
        })
    })
 
    test('post Messages', async()=>{
     let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
         "username": 'user1',
         "password": 'password1'
     })
     let token=res.data.token
     let PostMessage = await axios.post(`http://192.168.100.5:3000/api/messages/${1}`,{
         message:"hello"},{
         headers:{
             Authorization:`${token}`
         }
     })
     expect(PostMessage.status).toBe(200)
    })
    test('post Messages with no token', async()=>{
     let token=""
     let PostMessage = await axios.post(`http://192.168.100.5:3000/api/messages/${1}`,{
         message:"hello"},{
         headers:{
             Authorization:`${token}`
         }
     })
     .catch(function(error){
         expect(error.response.status).toBe(401)
        })
    })
    test('get Messages', async()=>{
     let res = await axios.post(`http://192.168.100.5:3000/api/login`, {
         "username": 'user1',
         "password": 'password1'
     })
     let token=res.data.token
     let GetMessage = await axios.get(`http://192.168.100.5:3000/api/messages/${1}`,{
     
         headers:{
             Authorization:`${token}`
         }
     })
     expect(GetMessage.status).toBe(200)
    })
    test('get Messages with no token', async()=>{
     let token=""
     let GetMessage = await axios.get(`http://192.168.100.5:3000/api/messages/${1}`,{
        
         headers:{
             Authorization:`${token}`
         }
     })
     .catch(function(error){
         expect(error.response.status).toBe(401)
        })
    })

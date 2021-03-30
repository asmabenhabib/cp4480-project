const axios = require('axios');
async function MessagesFunction(){
   
       let login= await axios.post('http://127.0.0.1:4000/api/login', {
             username: 'admin',
             password: 'passwordadmin'
         })
            let token=login.data
            let user= token.u
            console.log(token)
      let Users = await axios.get('http://127.0.0.1:4000/api/users',{
          headers:{
              Authorization:`${token.token}`
          }
      })
      
      let Chats = await axios.get('http://127.0.0.1:4000/api/chats',{
        headers:{
            Authorization:`${token.token}`
        }
    })
    let PostChat = await axios.post('http://127.0.0.1:4000/api/chats',{
        friendname:3},{
        headers:{
            Authorization:`${token.token}`
        }
    })
    if(user=='admin'){
        let AdminChats=await axios.get('http://127.0.0.1:4000/api/admin/chats',{
            headers:{
                Authorization:`${token.token}`
            }
        })
        console.log(AdminChats.data)

    }
    let postmessages= await axios.post(`http://127.0.0.1:4000/api/messages/${1}`,{
       message:"hello"},
       { headers:{
            Authorization:`${token.token}`
        }
    })
    console.log(postmessages.data)
    let messages= await axios.get(`http://127.0.0.1:4000/api/messages/${1}`,{
        headers:{
            Authorization:`${token.token}`
        }
    })
    console.log(messages.data)
  
    



}
MessagesFunction()
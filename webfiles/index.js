var script = document.createElement('script');

script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
let username
function loadFriends(){    
    let authToken = sessionStorage.getItem('authorization')
    document.getElementById('topmenu').getElementsByTagName('span')[0].style.background = `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/top-menu.png") ${-3}px ${-118}px no-repeat`
    document.getElementById('chats').style.background = `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/top-menu.png") ${-95}px ${-46}px no-repeat`    
    console.log(username)
    $.ajax({
        url: "/api/users",
        dataType: "json",
        method: "get",    
        headers: {
            Authorization: `${authToken}`
        },       
        success: function(data) {
            let listFriends = ``
            data.forEach((a) => {
                listFriends += `<div class="friend">
            	<img src="icon.jpg" />
                <p onclick="startChat(${a.userId})">
                	<strong> ${a.userName} </strong>
                </p>
            </div>`
            })
            // listChats +=`</div>`	
          $("#friendschats").html(listFriends)
        return true
        
     },
        error: function(j,t,e) {
            return false
            // window.location.href='/'
         }
    }
    )
} 
function startChat(user){
    let authToken = sessionStorage.getItem('authorization')

    let PostRequest={
        friendname:user
    }
    $.ajax({
        url: "/api/chats",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(PostRequest),
        headers: {
            Authorization: `${authToken}`
        },      
        success: function(result) {
            getChat(result)
        },
        error: function(j,t,e) {
            alert("wrong")
             //window.location.href='/index'
         }})
}
function loadChats() {     
    let authToken = sessionStorage.getItem('authorization')

    document.getElementById('topmenu').getElementsByTagName('span')[0].style.background = `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/top-menu.png") ${-3}px ${-46}px no-repeat`
    document.getElementById('chats').style.background = `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/top-menu.png") ${-95}px ${-118}px no-repeat`    
    $.ajax({
        url: "/api/chats",
        dataType: "json",
        method: "get",    
        headers: {
            Authorization: `${authToken}`
        },             
        success: function(data) {
            let listChats = ``
            data.forEach((a) => {
                listChats += `<div class="friend">
            	<img src="icon.jpg" />
                <p onclick="getChat(${a.chatId})">
                	<strong> user ${a.user} </strong>
                </p>
            </div>`
            })
            console.log(data)
            console.log(listChats)
            // listChats +=`</div>`	
          $("#friendschats").html(listChats)
      
       
     },
        error: function(j,t,e) {
            // window.location.href='/index'
         }
    }
    )
} 
function loadAdminChats() {     
    let authToken = sessionStorage.getItem('authorization')

     
    $.ajax({
        url: "/api/admin/chats",
        dataType: "json",
        method: "get",       
        headers: {
            Authorization: `${authToken}`
        },          
        success: function(data) {
            let listChats = ``
            data.forEach((a) => {
                listChats += `<div class="friend">
            	<img src="icon.jpg" />
                <p onclick="getUserChat(${a.chatId})">
                	<strong> ${a.user} </strong>
                </p>
            </div>`
            })
            listChats +=`</div>`	
          $("#friendschats").html(listChats)
      
       
     },
        error: function(j,t,e) {
          //   window.location.href='/'
         }
    }
    )
} 
function getChat(chatId) {        
    let authToken = sessionStorage.getItem('authorization')

    $.ajax({
        url: `/api/messages/${chatId}`,
        dataType: "json",
        method: "get",    
        headers: {
            Authorization: `${authToken}`
        },             
        success: function(data) {
         
            let listMessages = ``
            data.forEach((a) => {
                console.log(a)
                listMessages += `
                
                <div class="message">
                    <div class="bubble">
                    <p> ${a.message} </p>
                        
                       <br>
                        </div>
                    </div>
                `
            })
            listMessages += ` <div id="sendmessage">
                   	<input type="text" id ="currenMessage"  />
                     <button onclick="send(${chatId})" >send</button></div>`
          $("#friendschats").html(listMessages)
      
       
     },
        error: function(j,t,e) {
            //window.location.href='/'
         }
    }
    )
} 
function getUserChat(chatId) {      
    let authToken = sessionStorage.getItem('authorization')
  
    $.ajax({
        url: `/api/messages/${chatId}`,
        dataType: "json",
        method: "get", 
        headers: {
            Authorization: `${authToken}`
        },                
        success: function(data) {
         
            let listMessages = `
            `
            data.forEach((a) => {
                console.log(a)
                listMessages += `
                
                <div class="message">
                    <div class="bubble">
                    <p> ${a.message} </p>
                        
                        </div>
                    </div>
                    <br></br>
                `
            })
            
          $("#friendschats").html(listMessages)
      
       
     },
        error: function(j,t,e) {
            //window.location.href='/'
         }
    }
    )
} 


function send(chatId){
    let authToken = sessionStorage.getItem('authorization')
    let message = $("#currenMessage").val();
    
    console.log(message)
    PostRequest = {
        message 
    }
    $.ajax({
        url: `/api/messages/${chatId}`,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(PostRequest),
        headers: {
            Authorization: `${authToken}`
        },      
        success: function(result) {
            
            console.log(result)
            return(result)
            //window.location.href = '/mainpage.html'
        },
        error: function(x, t, s) {
            alert("sorry")
            return("failed")

           //window.location.href = '/'
     } })
     
}
// function doLogout() {
//     $.ajax({
//         url: "/api/logout",
//         method: "post",
//         success: function(result) {
//             window.location.href = '/'
//         },
//         error: function(x, t, s) {
//             window.location.href = '/'
//         }
//     })
    
// }

// $(function() {
//     loadContacts()
   
// })
function doLogin() {
    
    let un = $("#username").val();
    let pw = $("#password").val();

    loginRequest = {
        username: un,
        password: pw
    }
    
    $.ajax({
        url: "/api/login",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(loginRequest),
        success: function(result) {
            console.log(result)
            sessionStorage.setItem('authorization', result.token)
            username=result
                 if (result.u=="admin"){
                     
                     //console.log("loged")
                    window.location.href="/admin.html"
                 }
                 else{
                      
                     window.location.href="/mainpage.html"
                     //console.log(result)
                 }
              return true
        },
        error: function(j,t, e) {
           // window.location.href="/index.html"
            alert("Go away!")
            return false 
        }

    })

}
function doLogout() {
    sessionStorage.removeItem('authorization')
    window.location.href = '/index.html'
}
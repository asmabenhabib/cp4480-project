
let express = require("express")
let jwt = require('jsonwebtoken')
let cookieParser = require('cookie-parser')
let app = express()
let port = 4000
app.use(express.json())
let appSecretKey = '30u40474bh8o234573dfhv'
var sha256 = require('js-sha256');
app.use(express.static('webfiles'))
app.use(express.json())
app.use(cookieParser())
var mysql = require('mysql');

let connection = async (params) => new Promise(
    (resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'Messagesproject',
            insecureAuth: true
        });
        connection.connect(error => {
            if (error) {
                reject(error);
                return;
            }

            resolve(connection);
        })
    });
let query = async (conn, q, params) => new Promise(
    (resolve, reject) => {
        const handler = (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }
        conn.query(q, params, handler);
    });

//app.use(express.static('webfiles'))
app.get('/api/users', async (req, res) => {
    try {
        const breareheader = req.headers['authorization']
        console.log(breareheader)
        let authToken = breareheader
        let userDetails = jwt.verify(authToken, appSecretKey)
        if (userDetails.exp !== undefined) {
            let con = await connection()

            let result = await query(con,
                `select * from Users where userId<>${userDetails.userid}`)
            res.send(result)
        }
    }

    catch (e) {
        res.status(401)
        res.send('not authorized')
    }
}
)
app.post('/api/chats', async (req, res) => {
    try {
        const breareheader = req.headers['authorization']
        let authToken = breareheader
        let userDetails = jwt.verify(authToken, appSecretKey)
        let friendId = req.body.friendname
        if (userDetails.exp !== undefined) {
            let con = await connection()
            //let friendId= await  query(con,`select userId from Users where userName="${friend}"`)
            console.log(friendId)
            let id
            let chat = await query(con,
                `select chatId from Chat where user1=${friendId} and user2=${userDetails.userid} or user2=${friendId} and user1=${userDetails.userid} `)
            console.log(chat)
            if (chat.length < 1) {
                console.log(-1)
                let maxIdChat = await query(con, `select max(chatId) as id from Chat`)
                let maxId = maxIdChat[0].id + 1
                console.log(maxId)

                await query(con, `insert into Chat value (${maxId},${userDetails.userid}, ${friendId} )`)
                console.log("done")
                res.status(200)
                res.send(`${maxId}`)
            }
            else {
                id = chat[0].chatId
                res.status(200)

                res.send(`${id}`)
            }
        }
    }
    catch (e) {
        res.status(401)
        res.send('not authorized')
    }


})
app.get('/api/chats', async (req, res) => {
    try {
        const breareheader = req.headers['authorization']
        let authToken = breareheader
        let userDetails = jwt.verify(authToken, appSecretKey)

        if (userDetails.exp !== undefined) {
            let chatArray = []
            let con = await connection()
            let result = await query(con,
                `select * from Chat where user1=${userDetails.userid} or user2=${userDetails.userid} `)
            result.map(async (re, i) => {
                console.log(i)
                if (userDetails.userid == re.user1) {
                    let friendname = await query(con,
                        `select userName from Users where userId=${re.user2}`)
                    chatArray.push({ user: friendname[0].userName, chatId: re.chatId })
                    
                }
                if (userDetails.userid == re.user2) {
                    let friendname = await query(con,
                        `select userName from Users where userId=${re.user1}`)
                    chatArray.push({ user: friendname[0].userName, chatId: re.chatId })
                    
                }
                if (i === result.length - 1) {
                    console.log(chatArray)
                    res.status(200)
                    res.send(chatArray)
                }
            })

        }
    }

    catch (e) {
        res.status(401)
        res.send('not authorized')
    }
}


)
app.get('/api/admin/chats', async (req, res) => {
    try {

        const breareheader = req.headers['authorization']
        let authToken = breareheader
        let userDetails = jwt.verify(authToken, appSecretKey)
        console.log(userDetails)

        if (userDetails.exp !== undefined) {
            let chatArray = []

            let con = await connection()
            let result = await query(con,
                `select * from Chat`)

            result.map(re => {
                let chatResult

                let users = re.user2 + " " + re.user1
                console.log(users)

                chatResult = { user: users, chatId: re.chatId }
                console.log(chatResult)


                chatArray.push(chatResult)

            })
            res.status(200)
            // let chatResult= {user:result.user1, chatId:result.chatId}
            res.send(chatArray)
        }
    }

    catch (e) {
        res.status(401)
        res.send('not authorized')
    }
}

)
app.post('/api/messages/:chatId', async (req, res) => {
    try {
        let Message = req.body.message
        const breareheader = req.headers['authorization']
        let authToken = breareheader
        let userDetails = jwt.verify(authToken, appSecretKey)
        let maxId = 1
        if (userDetails.exp !== undefined) {
            let con = await connection()
            await query(con, 'select max(number) as id from Message;', async function (err, result, fields) {
                if (err) throw err;
                maxId = result[0].id + 1
                console.log(maxId)
                await query(con,
                    `insert into Message values 
                    (${maxId},${req.params.chatId},"${Message}", ${userDetails.userid});`, function (err, result, fields) {
                    if (err) throw err;
                    res.status(200)
                    res.send("ok")

                });
            });


        }
    }
    catch (e) {
        res.status(401)
        res.send('not authorized')
    }

})
app.get('/api/messages/:chatId', async (req, res) => {
    console.log(req.params.chatId)
    try {
        const breareheader = req.headers['authorization']
        let authToken = breareheader
        let userDetails = jwt.verify(authToken, appSecretKey)

        if (userDetails.exp !== undefined) {
            let con = await connection()
            let result = await query(con,
                `select * from Message where chatId=${req.params.chatId}`)
res.status(200)
                res.send(result)
        }
    }
    catch (e) {
        res.status(401)
        res.send('not authorized')
    }

})
app.post('/api/login', async (req, res) => {
    let u = req.body.username
    let p = req.body.password
    //let users = [{ u: 'admin', p: 'passwordAdmin' }, { u: 'Aya', p: 'password1' }, { u: "Lana", p: "password2" }]
    let con = await connection()
    console.log(u, p)
    let result = await query(con, `select * from Users where userName="${u}"`)
    let saltedpass = p + result[0].salt
    let hashedpass = sha256(saltedpass)

    if (result[0].userPassword == hashedpass) {

        if (u === "admin") {
            userInfo = {
                userid: result[0].userId,
                name: u,
                type: 'admin'
            }
        }
        else {
            userInfo = {
                userid: result[0].userId,
                name: u,
                type: 'user'
            }
        }
        let token = jwt.sign(userInfo, appSecretKey, { expiresIn: 60 * 10 })
        //res.cookie('userToken', token, { httpOnly: true })
        console.log(token)
        res.status(200)

        res.send({ token, u })

    }

    else {
        res.status(401)
        res.send("not authorized")
    }


})

app.post('/api/logout', (req, res) => {
    // do nothing here for now but maybe we could record the action in the log
    const breareheader = req.headers['authorization']
    console.log(breareheader)
    let authToken = breareheader
    let userDetails = jwt.verify(authToken, appSecretKey)
  //  userDetails.expires=new Date(Date.now() - 1) 
    //  res.cookie('userToken', '', { expires: new Date(Date.now() - 1) })
    //res.send('ok')
})
app.listen(port, () => {
    console.log("app started")
})

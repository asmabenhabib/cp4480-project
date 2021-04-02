const puppeteer = require("puppeteer")
async function testlogin(user, pass) {
    const browser = await puppeteer.launch({
   headless: true,
   args: ['--no-sandbox']
})
    const page = await browser.newPage()
    await page.goto("http://192.168.0.110:8000")
    await page.focus('#username')
    await page.keyboard.type(user)
    await page.focus('#password')
    await page.keyboard.type(pass)
    let loginButton = await page.$('#login-button')
    await loginButton.click()
    await page.waitForNavigation()
    let result = await page.url()
    testChat(result, page)

}

async function testChat(result, page) {
    if(result=='http://192.168.0.110:8000/admin.html') {
        await page.goto(result, {
    
            waitUntil: ['networkidle2', 'load']
        });
        let user = await page.$('#user1')
        await user.click()
        await page.waitForSelector('#currenMessage')
        await page.focus('#currenMessage')
        await page.keyboard.type('new Message')
        let sendMessage = await page.$('#sendMessage')
        await sendMessage.click()
        let Allchats = await page.$('#chats')
        await Allchats.click()
        await page.waitForSelector('#chat1')
        let chat = await page.$('#chat2')
        await chat.click()
        await page.waitForSelector('#currenMessage')
        await page.focus('#currenMessage')
        await page.keyboard.type('helloWorld:)')
        let sendnewMessage = await page.$('#sendMessage')
        await sendnewMessage.click()
        let AdminChat= await page.$('#chats1')
        await AdminChat.click()
        await page.waitForSelector('#userChat1')
        let Userschat = await page.$('#userChat1')
        await Userschat.click()
        let logout= await page.$('#logout-button')
        await logout.click()
        testlogin('user1', 'password1')
        
    } 

    if(result=='http://192.168.0.110:8000/mainpage.html') {
        await page.goto(result, {
    
            waitUntil: ['networkidle2', 'load']
        });
        let user = await page.$('#user2')
        await user.click()
        await page.waitForSelector('#currenMessage')
        await page.focus('#currenMessage')
        await page.keyboard.type('new Message')
        let sendMessage = await page.$('#sendMessage')
        await sendMessage.click()
        let Allchats = await page.$('#chats')
        await Allchats.click()
        await page.waitForSelector('#chat2')
        let chat = await page.$('#chat2')
        await chat.click()
        await page.waitForSelector('#currenMessage')
        await page.focus('#currenMessage')
        await page.keyboard.type('helloWorld:)')
        let sendnewMessage = await page.$('#sendMessage')
        await sendnewMessage.click()

        let logout= await page.$('#logout-button')
        await logout.click()
        
    } 
}

testlogin('admin','passwordadmin')

const puppeteer = require("puppeteer")
async function test() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto("http://127.0.0.1:4000")
    await page.focus('#username')
    await page.keyboard.type('admin')
    await page.focus('#password')
    await page.keyboard.type('passwordadmin')
    let loginButton = await page.$('#login-button')
    await loginButton.click()
    await page.waitForNavigation()
    let result = await page.url()
if(result=='http://127.0.0.1:4000/admin.html') {
    let chat = await page.$('#1')
    await chat.click()
    await page.waitForNavigation()

}  
    //console.log("We landed on the page " + result)
}

test()

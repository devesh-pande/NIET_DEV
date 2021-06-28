const puppeteer = require("puppeteer");
const id = "neforar346@0ranges.com";
const pw = "123456789";

(async function () {
    try{
        let browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
          args: ["--start-maximized"],
          executablePath:
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto("https://www.hackerrank.com/auth/login");
        await tab.type("#input-1", id);
        await tab.type("#input-2", pw);
        await tab.click(".ui-btn.ui-btn-large");
    }
    catch(err){
        console.log(err);
    }
})();
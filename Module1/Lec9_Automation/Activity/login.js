const puppeteer = require("puppeteer");
const id = "nimey14680@0ranges.com" ;
const pw = "m5r6VjMjWJiywSj" ;
let tab ; 

// puppeteer functions --> promisified functions

// Open Browser

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});

browserOpenPromise.then(function(browserInstance){
    let pagesPromise = browserInstance.pages();
    return pagesPromise;
  })
  .then(function(pages){
      let page = pages[0];
      tab = page ;
      let gotoPromise = tab.goto("https://www.hackerrank.com/auth/login");
      return gotoPromise;
  })
  .then(function(){
    let idTypePromise = tab.type("#input-1", id);
    return idTypePromise;
  })
  .then(function(){
    let pwTypePromise = tab.type("#input-2", pw);
    return pwTypePromise;
  })
  .then(function(){
    let loginPromise = tab.click(".ui-btn.ui-btn-large", pw);
    return loginPromise;
  })
  .then(function(){
    let ipkWaitPromise = tab.waitForSelector("#base-card-1-link" , {visible : true});
    return ipkWaitPromise;
  })
  .then(function(){
    let ipkClickPromise = tab.click("#base-card-1-link");
    return ipkClickPromise;
  })
  .then(function(){
    let iconsWaitPromise = tab.waitForSelector("a[data-attr1 = 'warmup']" , {visible : true});
    return iconsWaitPromise;
  })
  .then(function(){
    let iconClickPromise = tab.click("a[data-attr1 = 'warmup']");
    return iconClickPromise;
  })
  .then(function(){
    let WaitPromise = tab.waitForSelector(".js-track-click.challenge-list-item" , {visible : true});
    return WaitPromise;
  })
  .then(function(){
    let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");

    return allATagsPromise;
  })
  .then(function(allATagsPromise){
    let allQuesLinksPromise = [];
    for (let i=0 ; i<allATagsPromise.length ; i++){
      let quesLinkPromise = tab.evaluate(function(elem){
                                          return elem.getAttribute("href");
                                        } , allATagsPromise[i]);
      allQuesLinksPromise.push(quesLinkPromise);
    }

    //    allQuesLinksPromise  = [ Promise<Pending> , Promise<Pending> , Promise<Pending> , Promise<Pending>]
    let combinedPromise = Promise.all(allQuesLinksPromise);
    return combinedPromise ;    // Promise<Pending>
  })
  .then(function(allQuesLinks){
    console.log(allQuesLinks);
  })
  .catch(function(err){
      console.log("Inside catch");
      console.log(err);
  })



// (async() -> {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://example.com');
//     await page.screenshot({ path : 'example.png'});
// })();
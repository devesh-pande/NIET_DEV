const puppeteer = require("puppeteer");
const id = "nimey14680@0ranges.com" ;
const pw = "m5r6VjMjWJiywSj" ;
let tab ;
let browser ;
let solutions = require("./solutions") ;

// puppeteer functions --> promisified functions

// Open Browser

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});

browserOpenPromise.then(function(browserInstance){
    browser = browserInstance;
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
    let loginPromise = tab.click(".ui-btn.ui-btn-large");
    return loginPromise;
  })
  .then(function(){
    let ipkWaitAndClickPromise = waitAndClick("#base-card-1-link", tab);
    return ipkWaitAndClickPromise;
  })
  .then(function(){
    let iconsWaitAndClickPromise = waitAndClick("a[data-attr1 = 'warmup']", tab);
    return iconsWaitAndClickPromise;
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
      let quesLinkPromise = tab.evaluate(function(elem){ return elem.getAttribute("href");} , allATagsPromise[i]);
      allQuesLinksPromise.push(quesLinkPromise);
    }

    //    allQuesLinksPromise  = [ Promise<Pending> , Promise<Pending> , Promise<Pending> , Promise<Pending>]
    let combinedPromise = Promise.all(allQuesLinksPromise);
    return combinedPromise ;    // Promise<Pending>
  })
  .then(function(allQuesLinks){
    // Parallel
    let oneQuesSolvePromise = solveQuestion(allQuesLinks[0]);

    for (let i=1 ; i<allQuesLinks.length ; i++){
      oneQuesSolvePromise = oneQuesSolvePromise.then(function(){
        let nextQuesSolvePromise = solveQuestion(allQuesLinks[i]);
        return nextQuesSolvePromise;
      });
    }

    return oneQuesSolvePromise;
  })
  .then(function(){
    console.log("All questions Solved");
  })
  .catch(function(err){
      console.log("Inside catch");
      console.log(err);
  })




// Creating a new Promisified function for wait and click operation

function waitAndClick(selector, tab){
  return new Promise(function(scb, fcb){
    let waitPromise = tab.waitForSelector(selector , {visible : true});
    waitPromise.then(function(){
        let clickKaPromise = tab.click(selector);
        return clickKaPromise ;
    })
    .then(function(){
      scb();
    })
    .catch(function(error){
      fxb();
    })
  })
}




// Creating new Promisified function for question link and its solution

function solveQuestion(quesLink){
  return new Promise(function(scb, fcb){
    let completeLink = "https://www.hackerrank.com"+quesLink ;
    let code ;
    let tab ;
    let newTabPromise = browser.newPage();
    newTabPromise.then(function(newTab){
      tab = newTab ;
      let gotoQuesPromise = tab.goto(completeLink);
      return gotoQuesPromise;
    })
    .then(function(){
      let quesNamePromise = tab.$('.ui-icon-label.page-label');
      return quesNamePromise;
    })
    .then(function(quesNameH1Tag){
      let quesPromise = tab.evaluate(function(elem){ 
        return elem.textContent; 
      } , quesNameH1Tag);
      return quesPromise;
    })
    .then(function(quesName){
      console.log(quesName);
      for (let i=0 ; i<solutions.length ; i++){
        if (solutions[i].name == quesName){
          code = solutions[i].sol ;
          break;
        }
      }

      let waitAndClickPromise = waitAndClick('.checkbox-input', tab);
      return waitAndClickPromise;
    })
    .then(function(){
      let waitPromise = tab.waitForTimeout("1000");
      return waitPromise;
    })
    .then(function(){
      let codeTypePromise = tab.type('#input-1' , code);
      return codeTypePromise;
    })
    .then(function(){
      let ctrlKeyDown = tab.keyboard.down("Control");
      return ctrlKeyDown;
    })
    .then(function(){
      let akeyPress = tab.keyboard.press("a");
      return akeyPress;
    })
    .then(function(){
      let xkeyPress = tab.keyboard.press("x");
      return xkeyPress;
    })
    .then(function(){
      let codeBoxClickedPromise = tab.click(
        ".monaco-scrollable-element.editor-scrollable.vs"
      );
      return codeBoxClickedPromise;
    })
    .then(function(){
      let akeyPress = tab.keyboard.press("a");
      return akeyPress;
    })
    .then(function(){
      let vkeyPress = tab.keyboard.press("v");
      return vkeyPress;
    })
    .then(function(){
      let ctrlKeyUp = tab.keyboard.up("Control");
      return ctrlKeyUp;
    })
    .then(function(){
      let submitBtnClickedPromise = tab.click(
        ".ui-btn.ui-btn-normal.hr-monaco-submit"
      );
      return submitBtnClickedPromise;
    })
    .then(function(){
      return tab.waitForTimeout("5000");
    })
    .then(function(){
      return tab.close();
    })
    .then(function(){
      scb();
    })
    .catch(function(err){
      fcb(err);
    });

  });
}



// (async() -> {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://example.com');
//     await page.screenshot({ path : 'example.png'});
// })();
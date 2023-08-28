const puppeteer = require('puppeteer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

(async()=>{
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1200,
            height: 760
        },
        args: ['--window-size=1200,760'],
    });

    const page = await browser.newPage();
    await page.goto('https://es.savefrom.net/1-youtube-video-downloader-189km.html');

    // await page.waitForSelector('tp-yt-paper-button#button');
    // await page.click('.eom-buttons a.ytd-button-renderer');

    await page.waitForTimeout(1000);
    await page.type('input#sf_url', 'https://www.youtube.com/watch?v=TtUpggAG7W4&t=342s');

    await page.waitForTimeout(1000);
    await page.click('#sf_submit');



    await page.waitForTimeout(3000);
    // const { stdout } = await $('.def-btn-box').children(0).attr('href');
    // const { stdout } = await document.getElementByClassName("def-btn-box").children(0).attr('href');
    
    await page.waitForSelector('.def-btn-box .link-download');
    const enlaces = await page.evaluate(()=>{
        const elements = document.querySelectorAll('.link-download');
        // console.log(elements);return;
        const enlaces = [];
        for (let element of elements){
            enlaces.push(element.href);
        }
        console.log(enlaces);

        return enlaces;
    });
    await page.goto(enlaces[0]);
    // for (let enlace of enlaces){
    //         console.log(enlace[0])
    //         return;
            // await page.waitForTimeout(1000);
            // comando = `youtube-dl -f 'worstvideo+worstaudio' -o './videos/%(title)s.%(ext)s' ${enlace}`;
            // console.log(comando);return;
            // const { stdout } = await exec(comando);
            // console.log(stdout);
        // }
    // console.log(enlaces);return;

    // await $('.def-btn-box').children(0).attr('href');
    // await page.goto('https://es.savefrom.net/1-youtube-video-downloader-189km.html');
    // await page.click('.def-btn-box');


    // const enlaces = await page.evaluate(()=>{
    //     const elements = document.querySelectorAll('.ytd-video-renderer#video-title');
    //     // console.log(elements);
    //     const enlaces = [];
    //     for (let element of elements){
    //         enlaces.push(element.href);
    //     }
    //     return enlaces;
    // });

    // console.log(enlaces);

    // for (let enlace of enlaces){
    //     // await page.goto(enlace);
    //     // await page.waitForTimeout(1000);
    //     comando = `youtube-dl -f 'worstvideo+worstaudio' -o './videos/%(title)s.%(ext)s' ${enlace}`;
    //     console.log(comando);return;
    //     const { stdout } = await exec(comando);
    //     console.log(stdout);
    // }

    
})();
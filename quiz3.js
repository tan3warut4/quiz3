const { webkit } = require('playwright');

(async () => {
    const inputCode = process.argv.slice(2)[0];
    const browser = await webkit.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://codequiz.azurewebsites.net/');
    await page.click('//html/body/input');
    await page.waitForSelector('//html/body/p')


    const fundData = await page.$$eval('//html/body/table/tbody', (rows) => {
        return Array.from(rows, (row) => {
            const code = Array.from(row.querySelectorAll('td:nth-child(1)'), code => code.textContent.trim())
            
            const nav = Array.from(row.querySelectorAll('td:nth-child(2)'), nav => nav.textContent)
            return {
                code,
                nav
            }
          
        })
    });
    await browser.close();
    console.log(fundData[0].nav[fundData[0].code.indexOf(inputCode)])
})();
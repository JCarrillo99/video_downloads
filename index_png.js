const puppeteer = require('puppeteer');

(async () => {
  // Inicia una nueva instancia del navegador
  const browser = await puppeteer.launch();

  // Abre una nueva página
  const page = await browser.newPage();

  // Navega a example.com
  await page.goto('https://example.com');

  // Toma una captura de pantalla y guárdala en '/app/data/example.png'
  await page.screenshot({ path: '/app/data/example.png' });

  // Cierra el navegador
  await browser.close();
})();

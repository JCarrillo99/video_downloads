const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Función para esperar un número específico de milisegundos
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1200,
            height: 760
        },
        args: ['--window-size=1200,760'],
    });

    const page = await browser.newPage();

    // Capturar los mensajes de consola del navegador y mostrarlos en la consola de Node.js
    page.on('console', async (msg) => {
        const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
        console.log(...args);
    });

    await page.goto('https://es.savefrom.net/1-youtube-video-downloader-189km.html');

    // Esperar 1 segundo antes de escribir la URL del video
    await sleep(1000);

    // Escribir la URL del video de YouTube
    await page.type('input#sf_url', 'https://www.youtube.com/watch?v=4QgM3RYbsc4&ab_channel=N%C3%B8ah');

    // Esperar 1 segundo antes de enviar el formulario
    await sleep(1000);
    await page.click('#sf_submit');

    // Esperar 6 segundos a que aparezcan los enlaces de descarga
    await sleep(6000);

    // Obtener los enlaces de descarga y sus elementos padres
    const enlaces = await page.evaluate(() => {
        const elements = document.querySelectorAll('.link-download');
        const resultados = [];
        elements.forEach((element) => {
            const enlace = element.href;
            const padre = element.parentNode; // Obtener el nodo padre directo
            const infoPadre = padre ? padre.innerText : 'No se encontró el elemento padre';
            console.log(`Enlace: ${enlace}\nInformación del padre: ${infoPadre}`);
            resultados.push({ enlace, infoPadre });
        });
        return resultados;
    });

    if (enlaces.length > 0) {
        console.log("Enlaces de descarga encontrados:", enlaces);
        
        // Navegar al primer enlace de descarga
        await page.goto(enlaces[0].enlace);
        
        // Opcional: Si deseas esperar que se descargue el archivo o realizar algún procesamiento adicional
        await sleep(10000);  // Tiempo para asegurarse de que la descarga se haya iniciado o lo que sea necesario.
    } else {
        console.log('No se encontraron enlaces de descarga.');
    }

    // Cerrar el navegador después de que todo haya terminado
    // await browser.close();
})();

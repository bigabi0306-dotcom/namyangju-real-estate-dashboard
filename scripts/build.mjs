import {mkdirSync,readFileSync,writeFileSync,copyFileSync} from 'node:fs';
mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});
let html=readFileSync('web/index.html','utf8').replace('/* APP_CSS */',readFileSync('web/style.css','utf8')).replace('/* APP_JS */',readFileSync('web/app.js','utf8')).replace('LOGO_SOURCE','data:image/jpeg;base64,'+readFileSync('web/logo.jpg').toString('base64'));
writeFileSync('dist/server/index.js','const PAGE='+JSON.stringify(html)+';\n'+readFileSync('worker/index.js','utf8'));
copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
console.log('Built worker and embedded dashboard.');

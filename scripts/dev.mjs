import http from 'node:http';
import {pathToFileURL} from 'node:url';
const worker=(await import(pathToFileURL(process.cwd()+'/dist/server/index.js'))).default;
http.createServer(async(req,res)=>{try{const path=req.url==='/index.html'?'/':req.url;const out=await worker.fetch(new Request('http://localhost:4173'+path),process.env,{});res.writeHead(out.status,Object.fromEntries(out.headers));res.end(Buffer.from(await out.arrayBuffer()));}catch{res.writeHead(500);res.end('Server error');}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://localhost:4173'));

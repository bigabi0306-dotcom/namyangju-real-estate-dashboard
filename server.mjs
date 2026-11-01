import http from 'node:http';
import {readFileSync} from 'node:fs';
import worker from './backend.mjs';
let env={...process.env};
if(process.argv.includes('--stdin-keys')){
 if(process.stdin.isTTY)process.stdin.setRawMode(true);
 console.log('Ready for server keys on stdin (hidden).');
 let input='';env=await new Promise(resolve=>process.stdin.on('data',chunk=>{input+=chunk.toString();if(/[\r\n]/.test(input)){resolve({...process.env,...JSON.parse(input.trim())});process.stdin.pause();}}));
}
const server=http.createServer(async(req,res)=>{try{
 if(req.url==='/'||req.url==='/index.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(readFileSync(new URL('./index.html',import.meta.url)));return;}
 const out=await worker.fetch(new Request('http://localhost:4173'+req.url),env,{});res.writeHead(out.status,Object.fromEntries(out.headers));res.end(Buffer.from(await out.arrayBuffer()));
}catch{res.writeHead(500);res.end('Server error');}});
server.listen(4173,'127.0.0.1',()=>console.log('Dashboard: http://127.0.0.1:4173/index.html'));

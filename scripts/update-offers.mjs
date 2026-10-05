const url="https://www.kaufda.de/Angebote/Ketchup";
const r=await fetch(url,{headers:{"user-agent":"Mozilla/5.0"}});
console.log("status",r.status);
for(const [k,v] of r.headers) if(/access-control|content-type|cache-control|server|vary/i.test(k)) console.log(k+":",v);

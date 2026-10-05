for(const url of ["https://www.kaufda.de/robots.txt","https://www.kaufda.de/sitemap.xml","https://www.kaufda.de/sitemap_index.xml"]){
 try{
  const r=await fetch(url,{headers:{"user-agent":"Mozilla/5.0"}});
  const t=await r.text();
  console.log("\nURL",url,"HTTP",r.status,"BYTES",t.length);
  console.log(t.slice(0,12000));
 }catch(e){console.log("ERR",url,e.message)}
}

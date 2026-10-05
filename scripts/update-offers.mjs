const url="https://www.kaufda.de/Angebote/Ketchup";
const res=await fetch(url,{headers:{"user-agent":"Mozilla/5.0"}});
const html=await res.text();
console.log("HTTP",res.status,"bytes",html.length);
for(const needle of ["1,11","1.11","K-CLASSIC","Papa Joe","Werder","productName","price","Tomatenketchup"]){
 const i=html.indexOf(needle);
 console.log("\nNEEDLE",needle,"INDEX",i);
 if(i>=0) console.log(html.slice(Math.max(0,i-1200),i+3000));
}

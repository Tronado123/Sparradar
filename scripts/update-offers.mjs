const url="https://www.kaufda.de/Angebote/Ketchup";
const res=await fetch(url,{headers:{"user-agent":"Mozilla/5.0"}});
const html=await res.text();
console.log("HTTP",res.status,"bytes",html.length);
for(const needle of ["K-CLASSIC","Papa Joe","Werder","HEINZ","1,11","1.11","<table","Tomatenketchup"]){
 let i=html.indexOf(needle); console.log("NEEDLE",needle,"INDEX",i);
 if(i>=0) console.log("SNIP",html.slice(Math.max(0,i-1800),i+5000));
}

import fs from "node:fs/promises";

const slugs = [
  "Ketchup","Waschmittel","Kaffee","Kaffeebohnen","Filterkaffee","Milch","Hafermilch",
  "Butter","Margarine","Kaese","Joghurt","Quark","Eier","Brot","Toast","Mehl","Zucker",
  "Nudeln","Reis","Tomaten","Bananen","Aepfel","Cola","Mineralwasser","Saft","Bier",
  "Schokolade","Chips","Toilettenpapier","Kuechenrolle","Spuelmittel","Geschirrspuelmittel",
  "Zahnpasta","Shampoo","Duschgel","Deo","Katzenfutter","Hundefutter","Katzenstreu","Windeln"
];

const allowedRetailers = [
  "ALDI Nord","ALDI SÜD","Aldi Nord","Aldi Süd","Lidl","REWE","EDEKA","E center","Kaufland",
  "Penny","Netto Marken-Discount","Netto mit dem Scottie","NORMA","HIT","famila Nordwest",
  "famila Nordost","combi","Globus","nahkauf","Rossmann","dm-drogerie markt","Müller",
  "Thomas Philipps","Markant","budni"
];

function decode(s=""){
  return s
    .replace(/&#x27;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"')
    .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#(d+);/g,(_,n)=>String.fromCharCode(+n))
    .replace(/<[^>]+>/g,"").trim();
}
function priceNum(s=""){
  const m=s.match(/(\d+[.,]\d{2})/);
  return m ? Number(m[1].replace(",",".")) : null;
}
function parseTable(html, query){
  const out=[];
  const tables=[...html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/gi)].map(m=>m[1]);
  for(const table of tables){
    if(!/Produkt[\s\S]*Marke[\s\S]*Händler[\s\S]*Preis/i.test(table)) continue;
    for(const rm of table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)){
      const cells=[...rm[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m=>decode(m[1]));
      if(cells.length<4) continue;
      const [product,brand,retailer,priceText,unit="",discount=""]=cells;
      const price=priceNum(priceText);
      if(!price) continue;
      if(!allowedRetailers.some(r=>retailer.toLowerCase()===r.toLowerCase())) continue;
      out.push({query,product,brand:brand||"Ohne Marke",retailer,price,priceText,unit,discount,source:"kaufDA"});
    }
  }
  return out;
}

const all=[];
for(let i=0;i<slugs.length;i++){
  const slug=slugs[i];
  const url="https://www.kaufda.de/Angebote/"+encodeURIComponent(slug);
  const res=await fetch(url,{headers:{"user-agent":"Mozilla/5.0 (compatible; SparRadar/0.1; offer-indexer)"}});
  console.log(i+1+"/"+slugs.length,slug,res.status);
  if(res.ok){
    const html=await res.text();
    const rows=parseTable(html,slug);
    console.log(" rows",rows.length);
    all.push(...rows);
  }
  if(i<slugs.length-1) await new Promise(r=>setTimeout(r,2100));
}

const dedup=new Map();
for(const x of all){
  const k=[x.query,x.product,x.brand,x.retailer,x.price,x.unit].join("|").toLowerCase();
  if(!dedup.has(k)) dedup.set(k,x);
}
const offers=[...dedup.values()];
const payload={updatedAt:new Date().toISOString(),count:offers.length,categories:slugs.length,offers};
await fs.writeFile("offers.json",JSON.stringify(payload,null,2)+"\n");
console.log("SAVED",payload.count,"offers in",payload.categories,"categories");
if(payload.count<20) throw new Error("Too few offers parsed");

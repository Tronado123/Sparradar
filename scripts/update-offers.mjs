import fs from "node:fs/promises";

const categories = [
  ["Ketchup",["ketchup"]],
  ["Waschmittel",["waschmittel","waschpulver","waschgel","vollwaschmittel","colorwaschmittel"]],
  ["Kaffee",["kaffee","espresso","caffè","caffe","barista"]],
  ["Kaffeebohnen",["kaffeebohnen","espresso","barista"]],
  ["Filterkaffee",["filterkaffee","kaffee"]],
  ["Milch",["milch","vollmilch","haltbare milch","h-milch"]],
  ["Hafermilch",["hafer","haferdrink","barista"]],
  ["Butter",["butter"]],
  ["Margarine",["margarine"]],
  ["Käse",["käse","kaese","gouda","emmentaler","mozzarella"]],
  ["Joghurt",["joghurt","yoghurt"]],
  ["Quark",["quark"]],
  ["Eier",["eier","ei"]],
  ["Brot",["brot"]],
  ["Toast",["toast"]],
  ["Brötchen",["brötchen","broetchen"]],
  ["Mehl",["mehl"]],
  ["Zucker",["zucker"]],
  ["Nudeln",["nudeln","pasta","spaghetti"]],
  ["Reis",["reis"]],
  ["Kartoffeln",["kartoffeln"]],
  ["Tomaten",["tomaten"]],
  ["Gurken",["gurken","gurke"]],
  ["Paprika",["paprika"]],
  ["Zwiebeln",["zwiebeln","zwiebel"]],
  ["Bananen",["bananen","banane"]],
  ["Äpfel",["äpfel","apfel","aepfel"]],
  ["Orangen",["orangen","orange"]],
  ["Trauben",["trauben"]],
  ["Erdbeeren",["erdbeeren"]],
  ["Cola",["cola","coca-cola","pepsi"]],
  ["Limonade",["limonade","fanta","sprite"]],
  ["Mineralwasser",["mineralwasser","wasser"]],
  ["Saft",["saft","orangensaft","apfelsaft"]],
  ["Energy Drink",["energy","energy drink","red bull"]],
  ["Bier",["bier"]],
  ["Wein",["wein"]],
  ["Sekt",["sekt"]],
  ["Schokolade",["schokolade"]],
  ["Chips",["chips"]],
  ["Gummibärchen",["gummibärchen","fruchtgummi","gummibaerchen"]],
  ["Kekse",["kekse","gebäck","gebaeck"]],
  ["Eis",["eis","eiscreme"]],
  ["Pizza",["pizza"]],
  ["Pommes",["pommes"]],
  ["Fischstäbchen",["fischstäbchen","fischstaebchen"]],
  ["Hackfleisch",["hackfleisch"]],
  ["Hähnchen",["hähnchen","haehnchen","hähnchenbrust","haehnchenbrust"]],
  ["Schweinefleisch",["schweinefleisch","schweinebraten"]],
  ["Rindfleisch",["rindfleisch","rindersteak","rinderbraten"]],
  ["Wurst",["wurst","salami","schinken"]],
  ["Toilettenpapier",["toilettenpapier","klopapier"]],
  ["Küchenrolle",["küchenrolle","kuechenrolle"]],
  ["Taschentücher",["taschentücher","taschentuecher"]],
  ["Spülmittel",["spülmittel","spuelmittel"]],
  ["Geschirrspültabs",["geschirrspültabs","geschirrspueltabs","spülmaschinentabs","spuelmaschinentabs"]],
  ["Allzweckreiniger",["allzweckreiniger"]],
  ["Badreiniger",["badreiniger"]],
  ["Glasreiniger",["glasreiniger"]],
  ["WC-Reiniger",["wc-reiniger","wcreiniger"]],
  ["Müllbeutel",["müllbeutel","muellbeutel"]],
  ["Zahnpasta",["zahnpasta","zahncreme"]],
  ["Zahnbürste",["zahnbürste","zahnbuerste"]],
  ["Mundspülung",["mundspülung","mundspuelung"]],
  ["Shampoo",["shampoo"]],
  ["Duschgel",["duschgel"]],
  ["Deo",["deo","deodorant"]],
  ["Bodylotion",["bodylotion","körperlotion","koerperlotion"]],
  ["Handcreme",["handcreme"]],
  ["Gesichtscreme",["gesichtscreme"]],
  ["Rasierer",["rasierer","rasierklingen"]],
  ["Rasierschaum",["rasierschaum","rasiergel"]],
  ["Damenhygiene",["tampons","binden","slipeinlagen"]],
  ["Windeln",["windeln"]],
  ["Feuchttücher",["feuchttücher","feuchttuecher"]],
  ["Babynahrung",["babynahrung","babybrei"]],
  ["Katzenfutter",["katzenfutter"]],
  ["Hundefutter",["hundefutter"]],
  ["Katzenstreu",["katzenstreu"]],
  ["Tierleckerlis",["leckerlis","snacks hund","snacks katze"]],
  ["Müsli",["müsli","muesli"]],
  ["Cornflakes",["cornflakes","flakes"]],
  ["Haferflocken",["haferflocken"]],
  ["Honig",["honig"]],
  ["Marmelade",["marmelade","konfitüre","konfituere"]],
  ["Nutella",["nutella","nuss-nougat-creme"]],
  ["Erdnussbutter",["erdnussbutter"]],
  ["Senf",["senf"]],
  ["Mayonnaise",["mayonnaise","mayo"]],
  ["Olivenöl",["olivenöl","olivenoel"]],
  ["Sonnenblumenöl",["sonnenblumenöl","sonnenblumenoel"]],
  ["Essig",["essig"]],
  ["Salz",["salz"]],
  ["Gewürze",["gewürze","gewuerze"]],
  ["Suppen",["suppe","suppen"]],
  ["Fertiggerichte",["fertiggericht","fertiggerichte"]],
  ["Konserven",["konserve","konserven","dose"]],
  ["Tiefkühlgemüse",["tiefkühlgemüse","tiefkuehlgemuese"]],
  ["Tiefkühlobst",["tiefkühlobst","tiefkuehlobst"]],
  ["Frischkäse",["frischkäse","frischkaese"]],
  ["Sahne",["sahne","schlagsahne"]],
  ["Pudding",["pudding"]],
  ["Proteinprodukte",["protein","high protein"]],
  ["Vegane Produkte",["vegan","pflanzlich"]],
  ["Tofu",["tofu"]],
  ["Haushaltsfolie",["frischhaltefolie","alufolie"]],
  ["Backpapier",["backpapier"]],
  ["Batterien",["batterien"]],
  ["Kerzen",["kerzen"]],
  ["Waschmaschinenreiniger",["waschmaschinenreiniger"]],
  ["Weichspüler",["weichspüler","weichspueler"]],
  ["Fleckenentferner",["fleckenentferner"]],
  ["Klarspüler",["klarspüler","klarspueler"]],
  ["Spülmaschinensalz",["spülmaschinensalz","spuelmaschinensalz"]]
];

const allowedRetailers = [
  "ALDI Nord","ALDI SÜD","Aldi Nord","Aldi Süd","Lidl","REWE","EDEKA","E center","Kaufland",
  "Penny","Netto Marken-Discount","Netto mit dem Scottie","NORMA","HIT","famila Nordwest",
  "famila Nordost","combi","Globus","nahkauf","Rossmann","dm-drogerie markt","Müller",
  "Thomas Philipps","Markant","budni","METRO","Selgros"
];

function slugify(label){
  return label.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ß/g,"ss").replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function decode(s=""){
  return s
    .replace(/&#x27;/g,"'").replace(/&amp;/g,"&").replace(/&quot;/g,'"')
    .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n))
    .replace(/<[^>]+>/g,"").trim();
}
function norm(s=""){
  return decode(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ß/g,"ss");
}
function priceNum(s=""){
  const m=s.match(/(\d+[.,]\d{2})/);
  return m ? Number(m[1].replace(",",".")) : null;
}
function parseTable(html, query, aliases, scope){
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
      if(!allowedRetailers.some(r=>norm(retailer)===norm(r))) continue;
      const hay=norm(product+" "+brand);
      const relevant=aliases.some(a=>hay.includes(norm(a)));
      if(!relevant) continue;
      out.push({query,product,brand:brand||"Ohne Marke",retailer,price,priceText,unit,discount,source:"kaufDA",scope});
    }
  }
  return out;
}

const all=[];
let localPages=0, fallbackPages=0;
for(let i=0;i<categories.length;i++){
  const [label,aliases]=categories[i];
  const slug=slugify(label);
  const candidates=[
    ["Marl","https://www.kaufda.de/Marl-Westf/Angebote/"+encodeURIComponent(slug)],
    ["Deutschland","https://www.kaufda.de/Angebote/"+encodeURIComponent(slug)]
  ];
  let rows=[];
  for(const [scope,url] of candidates){
    const res=await fetch(url,{headers:{"user-agent":"Mozilla/5.0 (compatible; SparRadar/0.2; offer-indexer)"}});
    console.log(i+1+"/"+categories.length,label,scope,res.status);
    if(res.ok){
      const html=await res.text();
      rows=parseTable(html,label,aliases,scope);
      if(rows.length){
        if(scope==="Marl") localPages++; else fallbackPages++;
        console.log(" rows",rows.length,"scope",scope);
        break;
      }
    }
    await new Promise(r=>setTimeout(r,2100));
  }
  all.push(...rows);
  if(i<categories.length-1) await new Promise(r=>setTimeout(r,2100));
}

const dedup=new Map();
for(const x of all){
  const k=[x.query,x.product,x.brand,x.retailer,x.price,x.unit].join("|").toLowerCase();
  if(!dedup.has(k)) dedup.set(k,x);
}
const offers=[...dedup.values()];
const payload={
  updatedAt:new Date().toISOString(),
  count:offers.length,
  categories:categories.length,
  localPages,
  fallbackPages,
  location:"Marl, Nordrhein-Westfalen",
  offers
};
await fs.writeFile("offers.json",JSON.stringify(payload,null,2)+"\n");
console.log("SAVED",payload.count,"offers",payload.categories,"categories","local",localPages,"fallback",fallbackPages);
if(payload.count<100) throw new Error("Too few offers parsed");

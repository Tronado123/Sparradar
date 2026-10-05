const url = "https://www.kaufda.de/Marl-Westf/Angebote/Ketchup";
const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 SparRadarTest/1.0" } });
console.log("HTTP", res.status, res.headers.get("content-type"));
const html = await res.text();
console.log("bytes", html.length);
for (const needle of ["K-CLASSIC","Tomatenketchup","Kaufland","1,11"]) {
  const i = html.indexOf(needle);
  console.log("NEEDLE", needle, "INDEX", i);
  if (i >= 0) console.log(html.slice(Math.max(0,i-800), i+1800));
}
if (!res.ok) process.exit(2);

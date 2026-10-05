const urls = [
  "https://www.kaufda.de/Angebote/Ketchup",
  "https://www.kaufda.de/Marl-Westf/Angebote/Katzenstreu"
];

for (const url of urls) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 SparRadarTest/1.0" } });
  console.log("URL", url, "HTTP", res.status, res.headers.get("content-type"));
  const html = await res.text();
  console.log("bytes", html.length);
  for (const needle of ["K-CLASSIC","Tomatenketchup","Kaufland","Katzenstreu","Marl"]) {
    const i = html.indexOf(needle);
    console.log("NEEDLE", needle, "INDEX", i);
    if (i >= 0) console.log(html.slice(Math.max(0,i-500), i+1200));
  }
}

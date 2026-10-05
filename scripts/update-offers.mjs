const token = process.env.APIFY_TOKEN;
if (!token) {
  console.error("APIFY_TOKEN secret is missing");
  process.exit(1);
}

const ACTOR = "nerdrx~de-supermarket-offers";
const input = {
  chains: ["aldi-sued", "aldi-nord", "penny", "edeka", "lidl", "rewe"],
  keywords: [],
  maxItems: 500,
  maxPerChain: 200,
  proxyConfiguration: { useApifyProxy: false }
};

async function api(path, options = {}) {
  const url = new URL("https://api.apify.com/v2/" + path);
  url.searchParams.set("token", token);
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

const started = await api(`acts/${ACTOR}/runs`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(input)
});

const runId = started?.data?.id;
if (!runId) throw new Error("Apify did not return a run id");

let run;
for (let i = 0; i < 90; i++) {
  const current = await api(`actor-runs/${runId}`);
  run = current.data;
  console.log("Apify run:", run.status);
  if (run.status === "SUCCEEDED") break;
  if (["FAILED", "ABORTED", "TIMED-OUT"].includes(run.status)) {
    throw new Error(`Apify run ended with ${run.status}`);
  }
  await new Promise(r => setTimeout(r, 10000));
}

if (!run || run.status !== "SUCCEEDED") {
  throw new Error("Apify run did not finish within 15 minutes");
}

const datasetId = run.defaultDatasetId;
const dataUrl = new URL(`https://api.apify.com/v2/datasets/${datasetId}/items`);
dataUrl.searchParams.set("token", token);
dataUrl.searchParams.set("clean", "true");
dataUrl.searchParams.set("format", "json");

const res = await fetch(dataUrl);
if (!res.ok) throw new Error(`Dataset error ${res.status}`);
const items = await res.json();

const payload = {
  updatedAt: new Date().toISOString(),
  count: Array.isArray(items) ? items.length : 0,
  offers: Array.isArray(items) ? items : []
};

await import("node:fs/promises").then(fs =>
  fs.writeFile("offers.json", JSON.stringify(payload, null, 2) + "\n")
);

console.log(`Saved ${payload.count} offers`);

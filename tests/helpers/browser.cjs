// Prefer a regular Playwright installation; allow the bundled desktop runtime as fallback.
const candidates=[process.env.BEAR_PLAYWRIGHT_MODULE,'playwright','/Users/lilei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'].filter(Boolean);
let loaded;
for(const candidate of candidates){let resolved;try{resolved=require.resolve(candidate);}catch(error){if(error.code==='MODULE_NOT_FOUND')continue;throw error;}loaded=require(resolved);break;}
if(!loaded)throw Error('Playwright not found. Install it in your test environment or set BEAR_PLAYWRIGHT_MODULE to its module path.');
module.exports=loaded;

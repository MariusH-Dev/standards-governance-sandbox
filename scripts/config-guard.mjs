// Post-merge re-check: red when the tool configuration on the default branch was weakened.
import { readFileSync } from "node:fs";
const problems = [];
const ts = JSON.parse(readFileSync("tsconfig.json", "utf8"));
if (ts.compilerOptions?.strict !== true) problems.push("tsconfig: strict is not true");
const eslint = readFileSync("eslint.config.mjs", "utf8");
if (!/no-floating-promises":\s*"error"/.test(eslint)) problems.push("eslint: no-floating-promises is not error");
const dc = readFileSync(".dependency-cruiser.cjs", "utf8");
for (const name of ["domain-not-to-infra", "no-circular"]) {
  if (!dc.includes(name)) problems.push(`dependency-cruiser: rule ${name} is missing`);
}
if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("tool configuration intact");

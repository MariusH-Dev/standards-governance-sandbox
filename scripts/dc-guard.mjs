// Reads `depcruise -T json` on stdin and judges one rule. Closes the gaps of the plain exit code:
// exit-code wraparound at 256 errors, 0 modules cruised, environment issues.
const rule = process.argv[2];
let raw = "";
for await (const chunk of process.stdin) raw += chunk;
const s = JSON.parse(raw).summary;
const problems = [];
const hits = s.violations.filter((v) => v.rule.name === rule);
if (hits.length > 0) problems.push(`${hits.length} violations of ${rule}`);
if (s.totalCruised === 0) problems.push("0 modules cruised");
for (const issue of s.environment?.issues ?? []) problems.push(`environment issue: ${issue.name}`);
if (problems.length > 0) {
  console.error(problems.join("; "));
  process.exit(1);
}

import { readFile, appendFile } from 'node:fs/promises';

const summary = process.env.GITHUB_STEP_SUMMARY;
const write = async text => {
  if (summary) await appendFile(summary, text);
  else console.log(text);
};
try {
  const results = JSON.parse(await readFile('lighthouse-mobile.json','utf8'));
  const score = key => Math.round((results.categories?.[key]?.score || 0) * 100);
  const metric = key => results.audits?.[key]?.numericValue;
  const tbt = metric('total-blocking-time');
  const lcp = metric('largest-contentful-paint');
  const cls = metric('cumulative-layout-shift');
  const fcp = metric('first-contentful-paint');
  const pass = value => value ? '✅' : '⚠️';
  const table = [
    '## La Patata — Lighthouse (mobile, lab test)',
    '| Metric | Result | Target |',
    '|---|---:|---:|',
    `| Performance | ${score('performance')}/100 | > 90 ${pass(score('performance') > 90)} |`,
    `| Total Blocking Time | ${Math.round(tbt)} ms | < 200 ms ${pass(tbt < 200)} |`,
    `| LCP | ${(lcp / 1000).toFixed(2)} s | < 2.5 s ${pass(lcp < 2500)} |`,
    `| CLS | ${cls.toFixed(3)} | < 0.1 ${pass(cls < .1)} |`,
    `| FCP | ${(fcp / 1000).toFixed(2)} s | Informational |`,
    `| Accessibility | ${score('accessibility')}/100 | 100 ideal |`,
    `| Best practices | ${score('best-practices')}/100 | 100 ideal |`,
    `| SEO | ${score('seo')}/100 | 100 ideal |`,
    '',
    'Scores are lab estimates, not a guaranteed PageSpeed Insights score.',
    'Sustained 60 FPS must be profiled using browser DevTools on representative phones.'
  ].join('\n') + '\n';
  await write(table);
} catch (error) {
  await write('## La Patata — audit not available\nLighthouse did not produce a report: ' + error.message + '\n');
}

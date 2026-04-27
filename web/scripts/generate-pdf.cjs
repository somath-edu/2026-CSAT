const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const VAULT_PATH = '/Users/imac/Desktop/Project/math_m2/vault/m2-1-final/중2 기말고사 대비.md';
const scriptDir = __dirname;
const webDir = path.join(scriptDir, '..');
const TEMPLATES_DIR = path.join(webDir, 'src/templates');
const OUTPUT_TYP = path.join(TEMPLATES_DIR, 'output.typ');
const OUTPUT_PDF = path.join(webDir, 'public/exam.pdf');

function texToTypst(tex) {
  if (!tex) return '';
  let t = tex.trim();
  t = t.replace(/\\dfrac\{(.*?)\}\{(.*?)\}/g, '($1)/($2)')
       .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '($1)/($2)')
       .replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (_, body) => {
          const rows = body.trim().split('\\\\').map(r => r.trim()).filter(r => r).join(', ');
          return `cases(${rows})`;
       })
       .replace(/\\text\{(.*?)\}/g, '\"$1\"')
       .replace(/\\sqrt\{(.*?)\}/g, 'sqrt($1)')
       .replace(/\\times/g, ' times ')
       .replace(/\\div/g, ' div ')
       .replace(/\\left\(/g, '(').replace(/\\right\)/g, ')')
       .replace(/\\left\{/g, '{').replace(/\\right\}/g, '}')
       .replace(/\\cdot/g, ' dot ')
       .replace(/\\pi/g, ' pi ')
       .replace(/\[\d+pt\]/g, '');
  return t;
}

const content = fs.readFileSync(VAULT_PATH, 'utf-8');
const firstRankSection = content.split('## 🥈 2순위')[0];
const rawProblems = firstRankSection.split('### ').slice(1);

let typstContent = '#import "paper.typ": exam_paper, prob\n\n'; 
typstContent += '#show: exam_paper.with(\n';
typstContent += '  year: "2026년 2학년 1학기 기말대비",\n';
typstContent += '  subject: "모의고사 1회",\n';
typstContent += '  school: "제이티중학교"\n';
typstContent += ')\n\n';

rawProblems.forEach(p => {
  const lines = p.split('\n');
  const id = lines[0].trim().replace('.', '');
  let body = lines.slice(1).join('\n').split('**풀이**:')[0].trim();
  body = body.replace(/\$\$(.*?)\$\$/gs, (_, tex) => `$ ${texToTypst(tex)} $`);
  body = body.replace(/\$(.*?)\$/g, (_, tex) => `$ ${texToTypst(tex)} $`);
  body = body.replace(/\n/g, ' \n ');
  typstContent += `#prob("${id}")[${body}]\n\n`;
});

fs.writeFileSync(OUTPUT_TYP, typstContent);

try {
  execSync(`typst compile output.typ ../../public/exam.pdf`, { cwd: TEMPLATES_DIR });
  console.log(`✔ 성공: PDF 생성됨 -> web/public/exam.pdf`);
} catch (error) {
  console.error('❌ 실패:', error.message);
}

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 검사 대상 폴더 (Astro 파일들이 있는 곳)
const targetDir = path.join(__dirname, '../web/src/pages');

console.log('🔍 수학 수식 규칙 검사를 시작합니다...');

// .astro 파일들 찾기
const files = glob.sync('**/*.astro', { cwd: targetDir, absolute: true });

let errorCount = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        // 1. 단일 백슬래시 검사 (LaTeX 명령어인데 백슬래시가 하나만 있는 경우)
        // 예: \frac, \sqrt 등 (이중 백슬래시 \\가 있어야 함)
        const singleSlashMatch = line.match(/(?<!\\)\\(?![\\$ ])[a-zA-Z]+/g);
        
        if (singleSlashMatch) {
            console.error(`❌ [오류] 단일 백슬래시 발견: ${path.relative(targetDir, file)} (Line ${index + 1})`);
            console.error(`   내용: ${line.trim()}`);
            console.error(`   수정: \\\\${singleSlashMatch[0].substring(1)} 처럼 이중 백슬래시를 사용하세요.\n`);
            errorCount++;
        }

        // 2. 캡슐화 누락 검사 (기초적인 체크)
        if (line.includes('$') && !line.includes('{"$') && !line.includes('$"')) {
            if (!line.includes('`') && !line.includes('//')) { // 코드 블록이나 주석 제외
                console.warn(`⚠️ [경고] 수식 캡슐화 확인 필요: ${path.relative(targetDir, file)} (Line ${index + 1})`);
                console.warn(`   내용: ${line.trim()}\n`);
            }
        }
    });
});

if (errorCount === 0) {
    console.log('✅ 모든 수식 규칙이 정상입니다!');
} else {
    console.log(`\n🚨 총 ${errorCount}개의 오류가 발견되었습니다. 수정이 필요합니다.`);
    process.exit(1);
}

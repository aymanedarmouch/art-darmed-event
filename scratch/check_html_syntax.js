const fs = require('fs');
const path = require('path');
const vm = require('vm');

const files = ['room-souk.html', 'room-atlas.html', 'room-artisans.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  // Simple regex to extract script contents
  const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
  let match;
  let scriptCount = 0;
  
  while ((match = scriptRegex.exec(content)) !== null) {
    scriptCount++;
    const jsCode = match[1];
    try {
      // Create a script object to compile the code
      new vm.Script(jsCode, { filename: `${file} [script ${scriptCount}]` });
      console.log(`✓ ${file} [script ${scriptCount}] compiled successfully.`);
    } catch (err) {
      console.error(`✗ Error compiling script in ${file}:`);
      console.error(err.message);
      process.exit(1);
    }
  }
});

console.log('All files verified successfully!');

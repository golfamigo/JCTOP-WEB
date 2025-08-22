const fs = require('fs');
const path = require('path');

console.log('🔍 Checking for common UI issues in JCTOP Web...\n');

// Check if responsive meta tags are present
const indexPath = path.join(__dirname, 'web-build', 'index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  console.log('✅ index.html found');
  
  if (html.includes('viewport')) {
    console.log('✅ Viewport meta tag present');
  } else {
    console.log('❌ Missing viewport meta tag for responsive design');
  }
}

// Check for common React Native Web issues
const checkFile = (filePath, fileName) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for web-incompatible components
    if (content.includes('KeyboardAvoidingView') && !content.includes('Platform.OS')) {
      issues.push('KeyboardAvoidingView without Platform check');
    }
    
    // Check for missing flex styles
    if (content.includes('ScrollView') && !content.includes('contentContainerStyle')) {
      issues.push('ScrollView might need contentContainerStyle for web');
    }
    
    // Check for fixed dimensions
    const fixedWidthMatches = content.match(/width:\s*\d{3,}/g);
    const fixedHeightMatches = content.match(/height:\s*\d{3,}/g);
    if (fixedWidthMatches || fixedHeightMatches) {
      issues.push('Fixed dimensions found (might not be responsive)');
    }
    
    if (issues.length > 0) {
      console.log(`\n⚠️  ${fileName}:`);
      issues.forEach(issue => console.log(`   - ${issue}`));
    }
  }
};

// Check main layout files
console.log('\n📱 Checking responsive design issues:');
checkFile(path.join(__dirname, 'src/app/_layout.tsx'), '_layout.tsx');
checkFile(path.join(__dirname, 'src/app/(tabs)/_layout.tsx'), '(tabs)/_layout.tsx');

// Check for missing web-specific styles
console.log('\n🎨 Checking for web-specific style issues:');
const componentsDir = path.join(__dirname, 'src/components');
const checkComponents = (dir) => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        checkComponents(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('StyleSheet.create') && !content.includes('Platform.select')) {
          // Check for potential web issues
          if (content.includes('shadow') && !content.includes('boxShadow')) {
            console.log(`⚠️  ${file}: Uses iOS shadows without web boxShadow`);
          }
        }
      }
    });
  }
};
checkComponents(componentsDir);

// Check navigation structure
console.log('\n🧭 Checking navigation structure:');
const appDir = path.join(__dirname, 'src/app');
const routes = [];
const findRoutes = (dir, prefix = '') => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.startsWith('_')) {
        findRoutes(filePath, `${prefix}/${file}`);
      } else if ((file === 'index.tsx' || file === 'index.ts') && !file.startsWith('_')) {
        routes.push(prefix || '/');
      }
    });
  }
};
findRoutes(appDir);
console.log('Found routes:', routes.join(', '));

console.log('\n📊 Summary:');
console.log('- Check browser console for JavaScript errors');
console.log('- Verify EXPO_PUBLIC_API_URL is correct');
console.log('- Ensure backend CORS allows frontend origin');
console.log('- Test on mobile viewport (Chrome DevTools)');
console.log('\n💡 Common fixes:');
console.log('1. Add "flex: 1" to root containers');
console.log('2. Use percentage widths instead of fixed pixels');
console.log('3. Add web-specific styles with Platform.select');
console.log('4. Ensure ScrollView has proper contentContainerStyle');
const fs = require('fs')
const path = require('path')

/**
 * Bootstrap Cleanup Script
 * Dọn dẹp các files Bootstrap cũ và temporary files sau khi migrate sang Tailwind
 */

function cleanupBootstrapFiles() {
  console.log('🧹 Starting Bootstrap cleanup process...\n')

  const srcPath = path.join(__dirname, '..', 'src')
  let deletedCount = 0
  let skippedCount = 0
  
  // 1. Xóa Bootstrap CSS files
  const bootstrapAssets = [
    path.join(srcPath, 'assets', 'css', 'bootstrap.min.css'),
    path.join(srcPath, 'assets', 'scss', 'bootstrap.scss'),
    path.join(srcPath, 'assets', 'admin-bootstrap.css'),
    path.join(srcPath, 'assets', 'admin-theme.css'),
  ]

  console.log('📂 Cleaning up Bootstrap asset files...')
  bootstrapAssets.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        console.log(`✓ Deleted: ${path.relative(srcPath, filePath)}`)
        deletedCount++
      } else {
        console.log(`- Not found: ${path.relative(srcPath, filePath)}`)
        skippedCount++
      }
    } catch (error) {
      console.log(`✗ Error deleting ${filePath}: ${error.message}`)
    }
  })

  // 2. Xóa Bootstrap SCSS directory nếu tồn tại
  const scssBootstrapDir = path.join(srcPath, 'assets', 'scss', 'bootstrap')
  if (fs.existsSync(scssBootstrapDir)) {
    try {
      fs.rmSync(scssBootstrapDir, { recursive: true, force: true })
      console.log(`✓ Deleted directory: assets/scss/bootstrap/`)
      deletedCount++
    } catch (error) {
      console.log(`✗ Error deleting Bootstrap SCSS directory: ${error.message}`)
    }
  }

  // 3. Xóa temporary Tailwind files (đã copy rồi)
  console.log('\n📝 Cleaning up temporary Tailwind files...')
  function findAndDeleteTailwindFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        findAndDeleteTailwindFiles(fullPath)
      } else if (entry.isFile() && entry.name.includes('-Tailwind.vue')) {
        try {
          fs.unlinkSync(fullPath)
          console.log(`✓ Deleted temp file: ${path.relative(srcPath, fullPath)}`)
          deletedCount++
        } catch (error) {
          console.log(`✗ Error deleting ${fullPath}: ${error.message}`)
        }
      }
    }
  }

  findAndDeleteTailwindFiles(srcPath)

  // 4. Tùy chọn: Giữ lại backup files (để user quyết định)
  console.log('\n📋 Bootstrap backup files status:')
  function findBackupFiles(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        findBackupFiles(fullPath, files)
      } else if (entry.isFile() && entry.name.includes('-Bootstrap-Backup.vue')) {
        files.push(path.relative(srcPath, fullPath))
      }
    }
    
    return files
  }

  const backupFiles = findBackupFiles(srcPath)
  console.log(`Found ${backupFiles.length} Bootstrap backup files:`)
  backupFiles.slice(0, 5).forEach(file => console.log(`  - ${file}`))
  if (backupFiles.length > 5) {
    console.log(`  ... and ${backupFiles.length - 5} more`)
  }

  console.log('\n✅ Cleanup completed!')
  console.log(`📊 Summary:`)
  console.log(`  - Deleted: ${deletedCount} files/directories`)
  console.log(`  - Skipped: ${skippedCount} files (not found)`)
  console.log(`  - Backup files: ${backupFiles.length} kept for safety`)

  console.log('\n💡 Recommendations:')
  console.log('  1. Test your application thoroughly')
  console.log('  2. If everything works fine, you can delete backup files with:')
  console.log('     npm run cleanup:backups')
  console.log('  3. Commit your changes to git')
}

function cleanupBackupFiles() {
  console.log('🗑️  Removing Bootstrap backup files...\n')
  
  const srcPath = path.join(__dirname, '..', 'src')
  let deletedCount = 0

  function findAndDeleteBackups(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        findAndDeleteBackups(fullPath)
      } else if (entry.isFile() && entry.name.includes('-Bootstrap-Backup.vue')) {
        try {
          fs.unlinkSync(fullPath)
          console.log(`✓ Deleted: ${path.relative(srcPath, fullPath)}`)
          deletedCount++
        } catch (error) {
          console.log(`✗ Error deleting ${fullPath}: ${error.message}`)
        }
      }
    }
  }

  findAndDeleteBackups(srcPath)
  
  console.log(`\n✅ Deleted ${deletedCount} backup files`)
  console.log('💾 Make sure to commit your Tailwind migration!')
}

// Script execution
const command = process.argv[2]

if (command === 'backups') {
  cleanupBackupFiles()
} else if (command === 'help') {
  console.log('🧹 Bootstrap Cleanup Script')
  console.log('')
  console.log('Usage:')
  console.log('  node scripts/cleanup-bootstrap.cjs         # Clean Bootstrap files (keep backups)')
  console.log('  node scripts/cleanup-bootstrap.cjs backups # Remove backup files too')
  console.log('  node scripts/cleanup-bootstrap.cjs help    # Show this help')
} else {
  cleanupBootstrapFiles()
}

module.exports = { cleanupBootstrapFiles, cleanupBackupFiles }
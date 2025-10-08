const fs = require('fs')
const path = require('path')

// Bootstrap to Tailwind class mappings
const classMap = {
  // Layout & Display
  'container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  'container-fluid': 'w-full px-4',
  'row': 'flex flex-wrap',
  'col': 'flex-1',
  'col-12': 'w-full',
  'col-6': 'w-1/2',
  'col-4': 'w-1/3',
  'col-3': 'w-1/4',
  'col-md-6': 'md:w-1/2',
  'col-lg-4': 'lg:w-1/3',
  'd-flex': 'flex',
  'd-none': 'hidden',
  'd-block': 'block',
  'd-inline': 'inline',
  'd-inline-block': 'inline-block',
  
  // Flexbox
  'justify-content-center': 'justify-center',
  'justify-content-between': 'justify-between',
  'justify-content-around': 'justify-around',
  'justify-content-end': 'justify-end',
  'justify-content-start': 'justify-start',
  'align-items-center': 'items-center',
  'align-items-start': 'items-start',
  'align-items-end': 'items-end',
  'flex-wrap': 'flex-wrap',
  'flex-column': 'flex-col',
  
  // Spacing
  'm-0': 'm-0',
  'm-1': 'm-1',
  'm-2': 'm-2',
  'm-3': 'm-3',
  'm-4': 'm-4',
  'm-5': 'm-5',
  'mb-2': 'mb-2',
  'mb-3': 'mb-3',
  'mb-4': 'mb-4',
  'mb-5': 'mb-5',
  'mt-2': 'mt-2',
  'mt-3': 'mt-3',
  'mt-4': 'mt-4',
  'mt-5': 'mt-5',
  'p-2': 'p-2',
  'p-3': 'p-3',
  'p-4': 'p-4',
  'p-5': 'p-5',
  'px-3': 'px-3',
  'py-2': 'py-2',
  'py-3': 'py-3',
  'py-4': 'py-4',
  
  // Cards
  'card': 'bg-white rounded-lg shadow-md border border-gray-200',
  'card-body': 'p-6',
  'card-header': 'px-6 py-4 bg-gray-50 border-b border-gray-200',
  'card-footer': 'px-6 py-4 bg-gray-50 border-t border-gray-200',
  'card-title': 'text-lg font-semibold text-gray-900',
  
  // Buttons
  'btn': 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200',
  'btn-primary': 'bg-blue-600 hover:bg-blue-700 text-white',
  'btn-secondary': 'bg-gray-600 hover:bg-gray-700 text-white',
  'btn-success': 'bg-green-600 hover:bg-green-700 text-white',
  'btn-danger': 'bg-red-600 hover:bg-red-700 text-white',
  'btn-warning': 'bg-yellow-600 hover:bg-yellow-700 text-white',
  'btn-info': 'bg-blue-500 hover:bg-blue-600 text-white',
  'btn-light': 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300',
  'btn-dark': 'bg-gray-800 hover:bg-gray-900 text-white',
  'btn-outline-primary': 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  'btn-sm': 'px-3 py-1.5 text-sm',
  'btn-lg': 'px-6 py-3 text-lg',
  
  // Forms
  'form-control': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  'form-group': 'mb-4',
  'form-label': 'block text-sm font-medium text-gray-700 mb-2',
  'form-check': 'flex items-center',
  'form-check-input': 'mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
  'form-check-label': 'text-sm text-gray-700',
  
  // Tables
  'table': 'w-full',
  'table-responsive': 'overflow-x-auto',
  'table-hover': 'hover:bg-gray-50',
  'thead': 'bg-gray-50',
  'th': 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
  'td': 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
  
  // Alerts
  'alert': 'p-4 rounded-lg border',
  'alert-success': 'bg-green-50 border-green-200 text-green-800',
  'alert-danger': 'bg-red-50 border-red-200 text-red-800',
  'alert-warning': 'bg-yellow-50 border-yellow-200 text-yellow-800',
  'alert-info': 'bg-blue-50 border-blue-200 text-blue-800',
  
  // Badges
  'badge': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  'badge-primary': 'bg-blue-100 text-blue-800',
  'badge-success': 'bg-green-100 text-green-800',
  'badge-danger': 'bg-red-100 text-red-800',
  'badge-warning': 'bg-yellow-100 text-yellow-800',
  
  // Text
  'text-center': 'text-center',
  'text-left': 'text-left',
  'text-right': 'text-right',
  'text-primary': 'text-blue-600',
  'text-secondary': 'text-gray-600',
  'text-success': 'text-green-600',
  'text-danger': 'text-red-600',
  'text-warning': 'text-yellow-600',
  'text-muted': 'text-gray-500',
  'fw-bold': 'font-bold',
  'fw-semibold': 'font-semibold',
  'fw-normal': 'font-normal',
  
  // Background
  'bg-primary': 'bg-blue-600',
  'bg-secondary': 'bg-gray-600',
  'bg-success': 'bg-green-600',
  'bg-danger': 'bg-red-600',
  'bg-warning': 'bg-yellow-600',
  'bg-light': 'bg-gray-100',
  'bg-white': 'bg-white',
  
  // Borders
  'border': 'border',
  'border-0': 'border-0',
  'rounded': 'rounded',
  'rounded-lg': 'rounded-lg',
  
  // Modal classes
  'modal': 'fixed inset-0 z-50 flex items-center justify-center p-4',
  'modal-dialog': 'bg-white rounded-lg shadow-xl max-w-lg w-full',
  'modal-content': 'bg-white rounded-lg shadow-xl',
  'modal-header': 'flex justify-between items-center p-6 border-b border-gray-200',
  'modal-body': 'p-6',
  'modal-footer': 'flex justify-end space-x-3 p-6 border-t border-gray-200',
  'modal-title': 'text-lg font-semibold text-gray-900',
  
  // Utilities
  'w-100': 'w-full',
  'h-100': 'h-full',
  'position-relative': 'relative',
  'position-absolute': 'absolute',
  'position-fixed': 'fixed',
  'top-0': 'top-0',
  'bottom-0': 'bottom-0',
  'left-0': 'left-0',
  'right-0': 'right-0'
}

function replaceBootstrapClasses(content) {
  let result = content
  
  // Replace class attributes
  result = result.replace(/class="([^"]*)"/g, (match, classes) => {
    const classArray = classes.split(/\s+/)
    const newClasses = classArray.map(cls => {
      // Remove any leading/trailing whitespace
      cls = cls.trim()
      if (!cls) return ''
      
      // Check for direct mapping
      if (classMap[cls]) {
        return classMap[cls]
      }
      
      // Keep unknown classes as-is (might be custom or Tailwind already)
      return cls
    }).filter(cls => cls) // Remove empty strings
    
    return `class="${newClasses.join(' ')}"`
  })
  
  return result
}

function migrateSingleFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`)
    
    const content = fs.readFileSync(filePath, 'utf8')
    const migratedContent = replaceBootstrapClasses(content)
    
    // Create backup
    const backupPath = filePath.replace('.vue', '-Bootstrap-Backup.vue')
    fs.writeFileSync(backupPath, content)
    
    // Write migrated content
    fs.writeFileSync(filePath, migratedContent)
    
    console.log(`✓ Migrated: ${filePath}`)
    console.log(`✓ Backup created: ${backupPath}`)
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message)
  }
}

function findVueFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      findVueFiles(fullPath, files)
    } else if (entry.isFile() && entry.name.endsWith('.vue') && !entry.name.includes('Backup') && !entry.name.includes('Tailwind')) {
      files.push(fullPath)
    }
  }
  
  return files
}

// Main migration function
function migrateToTailwind() {
  console.log('🚀 Starting Bootstrap to Tailwind CSS migration...\n')
  
  const srcPath = path.join(__dirname, '..', 'src')
  const vueFiles = findVueFiles(srcPath)
  
  // Skip files that are already migrated
  const skipFiles = [
    'Login.vue',
    'AdminLayout.vue', 
    'AdminCategories.vue',
    'Header.vue'
  ]
  
  const filesToMigrate = vueFiles.filter(file => {
    const fileName = path.basename(file)
    return !skipFiles.includes(fileName)
  })
  
  console.log(`Found ${filesToMigrate.length} files to migrate:\n`)
  
  filesToMigrate.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`)
  })
  
  console.log('\n📝 Starting migration...\n')
  
  filesToMigrate.forEach(migrateSingleFile)
  
  console.log('\n✅ Migration completed!')
  console.log('\n📋 Summary:')
  console.log(`- Processed ${filesToMigrate.length} files`)
  console.log('- Backup files created with "-Bootstrap-Backup.vue" suffix')
  console.log('- Original files updated with Tailwind classes')
  console.log('\n🔍 Please review the migrated files and test your application!')
  console.log('💡 You may need to manually adjust some complex layouts or custom styles.')
}

// Run migration
if (require.main === module) {
  migrateToTailwind()
}

module.exports = { migrateToTailwind, replaceBootstrapClasses }
import { execSync } from 'child_process'

const buildPackages = (packages) => {
  const packagesName = packages.map(packageName => `@express-boot/${packageName}`)

  packagesName.forEach(pgk => {
    console.log(`Building ${pgk}`)
    execSync(`yarn workspace ${pgk} build`, {stdio: 'inherit'})
  })

  console.log("✅ Build completed successfully!");
}

buildPackages(['starter-log', 'starter-core', 'starter-web', 'starter-swagger'])
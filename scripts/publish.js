import { execSync } from 'child_process';
import path from 'path';

const publishPackages = (versionType, packages) => {
  const packagesDir = path.resolve(__dirname, '../packages');
  packages.forEach(pkg => {
    const packagePath = path.join(packagesDir, pkg);
    console.log(`Processing package: ${pkg}`);
    try {
      const versionCommand = prereleaseId
        ? `npm version ${versionType} --preid=${prereleaseId}`
        : `npm version ${versionType}`;
      // Increase version
      console.log(`🚀 Bumping version: npm version ${versionType}`);
      execSync(`${versionCommand}`, { cwd: packagePath, stdio: 'inherit' });

      // console.log("📌 Pushing changes to Git...");
      // execSync("git push --follow-tags", { stdio: "inherit" });
      // // Publish package
      // console.log("📦 Publishing to npm...");
      // execSync('npm publish --access public', { cwd: packagePath, stdio: 'inherit' });

      // console.log("✅ Done!");
    } catch (error) {
      console.error(`Failed to publish ${pkg}:`, error.message);
    }
  });
};

const versionType = process.argv[2]; // patch, minor, or major
const prereleaseId = process.argv[3];

if (!['patch', 'minor', 'major', 'prerelease'].includes(versionType)) {
  console.error('Usage: node publish.js <patch|minor|major|prerelease> [prerelease-id]');
  process.exit(1);
}

publishPackages(versionType, ['starter-log', 'starter-core']);

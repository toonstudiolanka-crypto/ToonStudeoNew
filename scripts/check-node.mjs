const [major, minor] = process.versions.node.split(".").map(Number);
const ok = major > 20 || (major === 20 && minor >= 9);

if (!ok) {
  console.warn("");
  console.warn("WARNING: Node.js 20.9.0+ recommended for Next.js 16.");
  console.warn(`         Current version: v${process.versions.node}`);
  console.warn("         In Hostinger: Settings & Redeploy → set Node.js to 20.x");
  console.warn("");
}

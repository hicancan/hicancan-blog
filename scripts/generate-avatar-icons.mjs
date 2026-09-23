import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const avatar = fileURLToPath(new URL('../src/assets/avatar.png', import.meta.url));
const publicFile = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

for (const [name, size] of [
  ['favicon.png', 64],
  ['apple-touch-icon.png', 180],
  ['social-avatar.png', 512],
]) {
  await sharp(avatar).resize(size, size).png({ compressionLevel: 9 }).toFile(publicFile(name));
}

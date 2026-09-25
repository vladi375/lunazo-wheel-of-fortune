import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const build = join(root, 'dist');
const assets = join(build, 'assets');
const assetEntries = await readdir(assets, { withFileTypes: true });

for (const variant of ['1', '2']) {
    const site = join(root, 'deploy', `wheel-v${variant}`);
    const siteAssets = join(site, 'assets');

    await rm(site, { recursive: true, force: true });
    await mkdir(siteAssets, { recursive: true });
    await cp(
        join(build, `wheel-v${variant}`, 'index.html'),
        join(site, 'index.html'),
    );

    for (const icon of [
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
    ]) {
        await cp(join(build, icon), join(site, icon));
    }

    for (const entry of assetEntries) {
        if (entry.isFile()) {
            await cp(join(assets, entry.name), join(siteAssets, entry.name));
        }
    }

    for (const directory of ['fonts', 'shared', 'wheel', `wheel-v${variant}`]) {
        await cp(join(assets, directory), join(siteAssets, directory), {
            recursive: true,
        });
    }

    console.log(`Built deploy/wheel-v${variant}/`);
}

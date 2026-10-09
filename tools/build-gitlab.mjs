import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'deploy', 'lunazo');
const dist = join(output, 'dist');
const sites = ['wheel-v1-ar', 'wheel-v1-co', 'wheel-v2-ar', 'wheel-v2-co'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(root, 'dist'), dist, { recursive: true });
await cp(join(root, 'tools', 'lunazo-index.php'), join(output, 'index.php'));

for (const site of sites) {
    const page = join(dist, site, 'index.html');
    await writeFile(join(dist, site, 'index.php'), await readFile(page));
    await rm(page);

    const entry = join(output, site);
    await mkdir(entry, { recursive: true });
    await writeFile(
        join(entry, 'index.php'),
        `<?php\n$target = __DIR__ . '/../dist/${site}/index.php';\nif (is_file($target)) {\n    include $target;\n} else {\n    http_response_code(404);\n    echo 'Landing build not found';\n}\n`,
    );
}

// The root preview page is not one of the four published landings.
await rm(join(dist, 'index.html'));
console.log('Built deploy/lunazo/ for /lunazo/wheel-v{1,2}-{ar,co}/');

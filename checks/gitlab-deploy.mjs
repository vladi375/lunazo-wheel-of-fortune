import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test from 'node:test';

const root = process.env.WHEEL_DEPLOY_ROOT
    ? pathToFileURL(resolve(process.env.WHEEL_DEPLOY_ROOT) + sep)
    : new URL('../deploy/lunazo/', import.meta.url);
const sites = ['wheel-v1-ar', 'wheel-v1-co', 'wheel-v2-ar', 'wheel-v2-co'];

test('the /lunazo/ front-controller entry is included', async () => {
    const entry = await readFile(new URL('index.php', root), 'utf8');
    assert.match(entry, /\/lunazo\//);
    assert.match(entry, /dist\//);
});

for (const site of sites) {
    test(`${site} has a PHP entry and loadable build assets`, async () => {
        const entry = await readFile(new URL(`${site}/index.php`, root), 'utf8');
        assert.match(entry, new RegExp(`dist/${site}/index\\.php`));

        const html = await readFile(new URL(`dist/${site}/index.php`, root), 'utf8');
        assert.match(html, new RegExp(`<html lang="es-${site.endsWith('-ar') ? 'AR' : 'CO'}">`));
        assert.match(html, /src="\/lunazo\/dist\/assets\/[^\"]+\.js"/);
        assert.match(html, /href="\/lunazo\/dist\/assets\/[^\"]+\.css"/);

        for (const [, path] of html.matchAll(/["'](\/lunazo\/dist\/(?:assets\/[^"']+|[^"']+\.(?:ico|png)))["']/g)) {
            await stat(join(fileURLToPath(root), path.replace('/lunazo/', '')));
        }
    });
}

test('CSS public asset references resolve inside the deployed directory', async () => {
    const assetDir = new URL('dist/assets/', root);
    const cssName = (await readdir(assetDir)).find((name) => name.endsWith('.css'));
    assert.ok(cssName);
    const css = await readFile(new URL(cssName, assetDir), 'utf8');
    const paths = [...css.matchAll(/\/lunazo\/dist\/assets\/[\w./-]+/g)].map(([path]) => path);
    assert.ok(paths.length > 0);
    for (const path of paths) {
        await stat(join(fileURLToPath(root), path.replace('/lunazo/', '')));
    }
});

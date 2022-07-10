import fs from 'fs';
import fetch from 'node-fetch';
import jsdoc from 'jsdoc-api';

// Fill this in to test a response locally, with fetching.
const STUB = ``; // fs.readFileSync('/PATH/TO/MONOREPO/wromo/packages/wromo/src/@types/wromo.ts', {encoding: 'utf-8'});

const HEADER = `---
# NOTE: This file is auto-generated from 'scripts/docgen.mjs'
# Do not make edits to it directly, they will be overwritten.

layout: ~/layouts/MainLayout.wromo
title: Configuration Reference
i18nReady: true
setup: |
  import Since from '../../../components/Since.wromo';
---

The following reference covers all supported configuration options in Wromo. To learn more about configuring Wromo, read our guide on [Configuring Wromo](/en/guides/configuring-wromo/).

\`\`\`js
// wromo.config.mjs
import { defineConfig } from 'wromo/config'

export default defineConfig({
  // your configuration options here...
})
\`\`\`
`;

const FOOTER = ``;

/**
 * The simple demo does not rely on the TypeScript compiler API; instead, it parses the
 * source file directly.  It uses the default parser configuration.
 */
export async function run() {
    const inputBuffer = STUB || await fetch('https://raw.githubusercontent.com/Wromo/wromo/main/packages/wromo/src/%40types/wromo.ts').then(r => r.text());

    // Get all `@docs` JSDoc comments in the file. 
    const allComments = [...inputBuffer.matchAll(/\/\*\*\s*\n([^\*]|\*[^\/])*@docs([^\*]|\*[^\/])*\*\//g)];
    const allCommentsInput = allComments.map(m => m[0]).filter(c => c.includes('* @docs')).join('\n\n');

    console.log(jsdoc);
    console.log(allCommentsInput);
    console.log(jsdoc.explainSync({ source: allCommentsInput }))

    const allParsedComments = jsdoc.explainSync({ source: allCommentsInput }).filter(data => data.tags);

    let result = ``;

    for (const comment of allParsedComments) {
        if (comment.kind === 'heading') {
            result += (`## ${comment.name}\n\n`);
            if (comment.description) {
                result += comment.description.trim() + '\n\n';
            }
            continue;
        }
        const cliFlag = comment.tags.find(f => f.title === 'cli');
        const typerawFlag = comment.tags.find(f => f.title === 'typeraw');
        if (!comment.name) {
            throw new Error(`Missing @docs JSDoc tag: @name`);
        }
        if (!comment.type && !typerawFlag) {
            throw new Error(`Missing @docs JSDoc tag: @type or @typeraw`);
        }
        const typesFormatted = typerawFlag
            ? typerawFlag.text.replace(/\{(.*)\}/, '$1')
            : comment.type.names.join(' | ');
        result += [
            `### ${comment.longname}`,
            ``,
            `<p>`,
            ``,
            [
                `**Type:** \`${typesFormatted}\``,
                cliFlag ? `**CLI:** \`${cliFlag.text}\`` : undefined,
                comment.defaultvalue ? `**Default:** ${comment.defaultvalue}` : undefined,
                comment.version ? `<Since v="${comment.version}" />` : undefined
            ].filter(l => l !== undefined).join('<br>\n'),
            `</p>`,
            ``,
            comment.description && comment.description.trim(),
            comment.see ? `**See Also:**\n${comment.see.map(s => `- ${s}`.trim()).join('\n')}` : undefined,
            `\n\n`,
        ].filter(l => l !== undefined).join('\n');
    }

    result = result.replace(/https:\/\/docs\.wromo\.build\//g, '/');

    console.log(result);
    fs.writeFileSync('src/pages/en/reference/configuration-reference.md', HEADER + result + FOOTER, 'utf8');
}

run();

import type { Heading, Text } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import fs from 'node:fs';
import * as path from 'node:path';

type Page = {
  name: string;
  title: string;
  chapters: string[];
  content: string;
}

async function findPages () {
  const pages: Page[] = [];
  await fs.promises.rm('docs', { recursive: true, force: true });
  await fs.promises.mkdir('docs', { recursive: true });

  const direntList = await fs.promises.readdir('.', { withFileTypes: true });

  for (let dirent of direntList) {
    let page: Page = {
      name: dirent.name.startsWith('1-') ? 'index' : dirent.name,
      title: '',
      chapters: [],
      content: '',
    };
    if (dirent.isDirectory() && /^\d+-/.test(dirent.name)) {
      const files = await fs.promises.readdir(dirent.name);
      files.filter(file => file.endsWith('.md'))
        .sort((a, b) => {
          if (/^\d+-/.test(a)) {
            if (/^\d+-/.test(b)) {
              return a.localeCompare(b);
            } else {
              return -1;
            }
          }
          if (/^\d+-/.test(b)) {
            return 1;
          }
          return a.localeCompare(b);
        })
        .forEach(file => {
          page.chapters.push(path.join(dirent.name, file));
        });

      let chapterContents: string[] = [];

      for (let chapter of page.chapters) {
        chapterContents.push(await fs.promises.readFile(chapter, 'utf-8'));
      }

      page.content = chapterContents.join('\n\n\n')

      const ast = fromMarkdown(page.content);
      const heading = ((ast.children[0] as Heading).children[0] as Text)
        .value
        .replace(/\{#[^}]+}/, '')
        .trim();

      page.title = heading;

      await fs.promises.writeFile(path.join('docs', page.name + '.md'), page.content);

      pages.push(page);
    }
  }

  return pages;
}

async function buildSidebar (pages: Page[]) {
  const sidebar = pages.map(page => {
    return {
      link: page.name === 'index' ? '/' : ('/' + page.name),
      text: page.title,
    };
  });

  const template = `import { type DefaultTheme } from 'vitepress';

type Sidebar = DefaultTheme.Config['sidebar'];

const sidebar: Sidebar = ${JSON.stringify(sidebar, null, 2)};

export default sidebar;`;

  await fs.promises.writeFile('.vitepress/sidebar.generated.ts', template);

  await fs.promises.mkdir('./docs/public/image', { recursive: true });
  await fs.promises.cp('./image', './docs/public/image', { recursive: true });
}

findPages().then(buildSidebar);
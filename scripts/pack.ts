import fs from 'node:fs';
import * as path from 'node:path';

type Page = {
  name: string;
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
      name: dirent.name,
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

      page.content = chapterContents.join('\n\n\n');

      await fs.promises.writeFile(path.join('docs', page.name + '.md'), page.content);

      pages.push(page);
    }
  }

  await fs.promises.copyFile('index.md', 'docs/index.md');

  return pages;
}

async function buildSidebar (pages: Page[]) {
  const sidebar = pages.map(page => {
    return {
      link: '/' + page.name,
      text: page.name,
    };
  });

  const template = `import { type DefaultTheme } from 'vitepress';

type Sidebar = DefaultTheme.Config['sidebar'];

const sidebar: Sidebar = ${JSON.stringify(sidebar, null, 2)};

export default sidebar;`;

  await fs.promises.writeFile('.vitepress/sidebar.generated.ts', template);
}

findPages().then(buildSidebar);
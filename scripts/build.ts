import { execSync } from 'child_process'
import fs from 'fs-extra'
import pkg from '../package.json'
import sets from './sets'

const e = (cmd: string) => execSync(cmd, { stdio: 'inherit' })

for (const set of sets) {
  const name = set.name
  const displayName = set.display

  fs.removeSync('temp')
  fs.ensureDirSync('temp/dist')
  fs.ensureDirSync('temp/icons')
  fs.ensureDirSync(`build/${name}`)
  fs.emptyDirSync(`build/${name}`)

  Object.entries(set.icons).forEach(([k, v]) => {
    v = v || k
    k = k.replace('codicon:', '')
    const [id, name] = v.split(':')
    const json = require(`@iconify/json/json/${id}.json`)
    const body = json.icons[name]?.body
    const height = json.info.height
    if (!body) {
      console.error(v)
    }
    fs.writeFileSync(`temp/icons/${k}.svg`, `<svg width="${height}" height="${height}" viewBox="0 0 ${height} ${height}" xmlns="http://www.w3.org/2000/svg" fill="currentColor">${body}</svg>`, 'utf-8')
  })

  e('npx svgo -f temp/icons/ --config svgo-config.yml')
  e(`npx icon-font-generator temp/icons/*.svg
          -o temp/dist
          -n ${name}
          -p ${name}
          --csstp template/styles.hbs
          --height=1000
          --center
          --codepoints template/mapping.json
          --json false
          --types 'ttf'
          --html true
          --htmltp template/preview.hbs
`.split('\n').map(i=>i.trim()).join(' ')
  )
  e(`cp temp/dist/${name}.ttf build/${name}/${name}.ttf`)

  fs.writeJSONSync(
    `build/${name}/${name}.json`,
    {
      fonts: [
        {
          id: name,
          src: [
            {
              path: `./${name}.ttf`,
              format: 'truetype',
            },
          ],
          weight: 'normal',
          style: 'normal',
        },
      ],
      iconDefinitions: {
        files: {
          fontCharacter: '\\2710',
        },
        search: {
          fontCharacter: '\\2711',
        },
        'source-control': {
          fontCharacter: '\\2712',
        },
        'git-branch': {
          fontCharacter: '\\2712',
        },
        'debug-alt': {
          fontCharacter: '\\2713',
        },
        extensions: {
          fontCharacter: '\\2714',
        },
        account: {
          fontCharacter: '\\2715',
        },
        'settings-gear': {
          fontCharacter: '\\2716',
        },
        'new-file': {
          fontCharacter: '\\2717',
        },
        'new-folder': {
          fontCharacter: '\\2718',
        },
        refresh: {
          fontCharacter: '\\2719',
        },
        'collapse-all': {
          fontCharacter: '\\271a',
        },
        'editor-layout': {
          fontCharacter: '\\271b',
        },
        save: {
          fontCharacter: '\\271c',
        },
        'save-all': {
          fontCharacter: '\\271c',
        },
        error: {
          fontCharacter: '\\2720',
        },
        'split-horizontal': {
          fontCharacter: '\\271e',
        },
        'split-vertical': {
          fontCharacter: '\\271f',
        },
        'compare-changes': {
          fontCharacter: '\\2721',
        },
        'clear-all': {
          fontCharacter: '\\2722',
        },
        warning: {
          fontCharacter: '\\2723',
        },
        bell: {
          fontCharacter: '\\2724',
        },
        sync: {
          fontCharacter: '\\2725',
        },
        'light-bulb': {
          fontCharacter: '\\2726',
        },
        filter: {
          fontCharacter: '\\2727',
        },
        gear: {
          fontCharacter: '\\2728',
        },
        'debug-start': {
          fontCharacter: '\\2729',
        },
        'debug-stop': {
          fontCharacter: '\\272a',
        },
        'debug-pause': {
          fontCharacter: '\\409',
        },
        'debug-restart': {
          fontCharacter: '\\272b',
        },
        'debug-disconnect': {
          fontCharacter: '\\404',
        },
        'debug-step-into': {
          fontCharacter: '\\405',
        },
        'debug-step-out': {
          fontCharacter: '\\406',
        },
        'debug-step-back': {
          fontCharacter: '\\407',
        },
        'debug-step-over': {
          fontCharacter: '\\408',
        },
        'debug-continue': {
          fontCharacter: '\\40a',
        },
        trash: {
          fontCharacter: '\\40c',
        },
        add: {
          fontCharacter: '\\40d',
        },
        'close-all': {
          fontCharacter: '\\40e',
        },
        'activate-breakpoints': {
          fontCharacter: '\\40f',
        },
        'remote-explorer': {
          fontCharacter: '\\0410',
        },
        'symbol-function': {
          fontCharacter: '\\0411',
        },
        'symbol-event': {
          fontCharacter: '\\0412',
        },
        'symbol-variable': {
          fontCharacter: '\\0413',
        },
        remote: {
          fontCharacter: '\\0414',
        },
      },
    },
    { spaces: 2 }
  )

  fs.writeJSONSync(
    `build/${name}/package.json`,
    {
      name: name,
      publisher: 'antfu',
      version: pkg.version,
      displayName: `${displayName} Product Icons`,
      description: `${displayName} Product Icons for VS Code`,
      icon: 'icon.png',
      categories: ['Themes'],
      engines: {
        vscode: pkg.engines.vscode,
      },
      license: 'MIT',
      keywords: ['icon', 'theme', 'product'],
      extensionKind: ['ui'],
      contributes: {
        productIconThemes: [
          {
            id: name,
            label: `${displayName} Icons`,
            path: `./${name}.json`,
          },
        ],
      },
      repository: {
        type: 'git',
        url: 'https://github.com/antfu/vscode-icons-carbon.git',
      },
      bugs: {
        url: 'https://github.com/antfu/vscode-icons-carbon/issues',
      },
      author: {
        name: 'Anthony Fu',
      },
    },
    { spaces: 2 }
  )

  fs.copySync('README.md', `build/${name}/README.md`)
  fs.copySync('icon.png', `build/${name}/icon.png`)
}

import { Codicon, Carbon } from "./ids";

export interface IconSet {
  name: string,
  display: string,
  icons: Partial<Record<Codicon, Carbon>>
}

export const sets: IconSet[] = [
  {
    name: 'icons-carbon',
    display: 'Carbon',
    icons: {
      'codicon:files': 'carbon:folder',
      'codicon:search': 'carbon:search',
      'codicon:source-control': 'carbon:branch',
      'codicon:bug': 'carbon:debug',
      'codicon:debug': 'carbon:debug',
      'codicon:extensions': 'carbon:container-software',
      'codicon:account': 'carbon:user',
      'codicon:gear': 'carbon:settings',
      'codicon:settings-gear': 'carbon:settings-adjust',
      'codicon:new-file': 'carbon:new-tab',
      'codicon:new-folder': 'carbon:folder-add',
      'codicon:refresh': 'carbon:renew',
      'codicon:collapse-all': 'carbon:minimize',
      'codicon:save': 'carbon:save',
      'codicon:x': 'carbon:close',
      'codicon:split-horizontal': 'carbon:open-panel-right',
      'codicon:split-vertical': 'carbon:open-panel-bottom',
      'codicon:error': 'carbon:error',
      'codicon:compare-changes': 'carbon:compare',
      'codicon:clear-all': 'carbon:clean',
      'codicon:warning': 'carbon:warning-alt',
      'codicon:bell': 'carbon:chat',
      'codicon:sync': 'carbon:renew',
      'codicon:lightbulb': 'carbon:idea',
      'codicon:filter': 'carbon:filter',
      'codicon:play': 'carbon:play',
      'codicon:primitive-square': 'carbon:stop',
      'codicon:debug-restart': 'carbon:restart',
      'codicon:trash': 'carbon:delete',
      'codicon:close-all': 'carbon:close-outline',
      'codicon:symbol-event': 'carbon:flash',
      'codicon:zap': 'carbon:flash',
      'codicon:symbol-variable': 'carbon:3d-mpr-toggle',
      'codicon:check': 'carbon:checkmark',
      'codicon:checklist': 'carbon:list-checked',
      'codicon:go-to-file': 'carbon:script-reference',
      'codicon:discard': 'carbon:undo',
      'codicon:ellipsis': 'carbon:overflow-menu-horizontal'
    },
  },
]

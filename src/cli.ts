import minimist from 'minimist'
import write from './writeRouteFile'
import watch from './watchInputDir'
import build from './buildTemplate'

export const run = (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'dir', 'watch'],
    alias: { v: 'version', d: 'dir', w: 'watch' }
  })
  const dirs = ((argv.dir as string) ?? '.').split(',')

  argv.version !== undefined
    ? console.log(`v${require('../package.json').version}`)
    : argv.watch !== undefined
    ? dirs.forEach(dir => {
        write(build(dir))
        watch(dir, () => write(build(dir)))
      })
    : dirs.forEach(dir => write(build(dir)))
}

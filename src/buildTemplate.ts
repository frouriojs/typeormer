import path from 'path'
import { Config } from './getConfig'

export default ({ output }: Config) => {
  const text = '/* eslint-disable */'

  return { text, filePath: path.posix.join(output, '$template.ts') }
}

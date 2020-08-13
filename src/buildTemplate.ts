import path from 'path'
import createText from './createText'

export default (inputDir: string) => {
  const { imports, entities, migrations, subscribers } = createText(inputDir)

  return {
    text: `/* eslint-disable */${imports}

export default {
  entities: [${entities}],
  migrations: [${migrations}],
  subscribers: [${subscribers}]
}
`,
    filePath: path.posix.join(inputDir, '$orm.ts')
  }
}

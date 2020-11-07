import fs from 'fs'
import path from 'path'

export const listFiles = (targetDir: string): string[] =>
  fs.readdirSync(targetDir, { withFileTypes: true }).reduce<string[]>((prev, dirent) => {
    const target = path.posix.join(targetDir, dirent.name)
    return dirent.isFile()
      ? [...prev, targetDir.startsWith('.') ? `./${target}` : target]
      : [...prev, ...listFiles(target)]
  }, [])

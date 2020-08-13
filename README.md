# TypeORMer

> TypeORM helper

[![npm version](https://img.shields.io/npm/v/typeormer)](https://www.npmjs.com/package/typeormer)
[![Node.js CI](https://github.com/frouriojs/typeormer/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/frouriojs/typeormer/actions?query=workflow%3A%22Node.js+CI%22)
[![Codecov](https://img.shields.io/codecov/c/github/frouriojs/typeormer.svg)](https://codecov.io/gh/frouriojs/typeormer)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/frouriojs/typeormer.svg)](https://lgtm.com/projects/g/frouriojs/typeormer/context:javascript)
[![License](https://img.shields.io/npm/l/typeormer)](https://github.com/frouriojs/typeormer/blob/master/LICENSE)

## Installation

- Using [npm](https://www.npmjs.com/):

  ```sh
  $ npm install reflect-metadata typeorm typeormer
  ```

- Using [Yarn](https://yarnpkg.com/):

  ```sh
  $ yarn add reflect-metadata typeorm typeormer
  ```

## Usage

`entity/Task.ts`
```ts
import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Task {
  @PrimaryColumn()
  id: number

  @Column({ length: 100 })
  label: string

  @Column({ default: false })
  done: boolean
}
```

`subscriber/TaskSubscriber.ts`
```ts
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { Task } from '../entity/Task'

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  listenTo() {
    return Task
  }

  afterInsert(event: InsertEvent<Task>) {
    console.log(event)
  }
}
```

`ormconfig.ts`
```ts
import { ConnectionOptions } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const options: ConnectionOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  synchronize: false,
  logging: false,
  entities: ['entity/**/*.ts'],
  migrations: ['migration/**/*.ts'],
  cli: {
    migrationsDir: 'migration'
  }
}

// @ts-ignore
export = options
```

`package.json`
```json
{
  "scripts": {
    "migration:generate": "typeorm migration:generate -n Task",
    "typeormer": "typeormer"
  }
}
```

`tarminal`
```bash
$ npm run migration:generate # created migration/xxx-Task.ts
$ npm run typeormer # created $orm.ts
```

`index.ts`
```ts
import 'reflect-metadata'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import ormconfig from './ormconfig'
import options from './$orm'

const connection = await createConnection({
  ...ormconfig,
  ...options
})
```

## License

TypeORMer is licensed under a [MIT License](https://github.com/frouriojs/typeormer/blob/master/LICENSE).

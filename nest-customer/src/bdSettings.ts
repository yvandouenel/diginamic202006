export function bdSettings(Customer) {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'nest',
    password: '',
    database: 'nestdb',
    entities: [Customer],
    synchronize: true,
  }
}
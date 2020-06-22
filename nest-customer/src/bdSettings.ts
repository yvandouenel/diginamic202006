export function bdSettings(Customer) {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'nest',
    password: '51biba95',
    database: 'nestdb',
    entities: [Customer],
    synchronize: true,
  }
}
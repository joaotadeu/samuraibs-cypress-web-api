const { defineConfig } = require("cypress");
const { Pool } = require('pg');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: '1234',
        database: 'dbname',
        port: 5432
      });
      
      on('task', {
        removeUser(email) {
          return new Promise(function(resolve, reject) { // Adicionado reject para lidar com erros
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result) {
              if (error) {
                reject(error); // Rejeita a promise com o erro
              }
              resolve({ success: result.rowCount }); // Retorna o número de linhas afetadas
            });
          });
        }
      });
    },
  },
});
const { defineConfig } = require("cypress");
const { Pool } = require('pg');

module.exports = defineConfig({
  projectId: '',
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
          return new Promise((resolve, reject) => {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve({ success: result.rowCount });
            });
          });
        },
        
        encontrarToken(email) {
          return new Promise((resolve, reject) => {
            pool.query('SELECT ut.token FROM user_tokens ut INNER JOIN users u ON ut.user_id = u.id WHERE u.email = $1 ORDER BY ut.created_at;', [email], (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve({ token: result.rows[0].token }); 
            });
          });
        }

      });
    },
  },
});
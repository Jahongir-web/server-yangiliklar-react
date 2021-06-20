const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgres://ktdpymnq:viXLJR0D3e7VIwm0dezN0UqRHjBGZWm7@john.db.elephantsql.com/ktdpymnq'
})

const rows = async (query, ...params) => {

  const client = await pool.connect()

  try {
    const { rows } = await client.query(query, params)
    return rows
  } catch (error) {
    console.log(error.message)
  } finally {
    client.release()
  }
}

module.exports.rows = rows
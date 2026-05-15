import express, { type Application, type Request, type Response } from "express"
import { Pool } from "pg"
import config from "./config";


const app: Application = express();
const port = config.port

app.use(express.json());

// neondb connected string
const pool = new Pool({
  connectionString: config.connection_string
});

// initial database
const initDB = async() => {
  try{
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Database connected successfully")
  }
  catch(err) {
    console.log(err)
  }
}

initDB();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})




// post method in first time postgrase
app.post("/api/user", async(req: Request, res: Response) => {
  const {name, email, password, age} = req.body;

  try{
    const result = await pool.query(`
    INSERT INTO users(name, email, password, age) 
    VALUES($1, $2, $3, $4) 
    RETURNING *
  `, [name, email, password, age]);

  res.status(201).json({
    message: "user created",
    data: result.rows[0]
  })
  }
  catch(err: any) {
    res.status(500).json({
      message: err.message,
      error: err
    })
  }
});


// get method for ALL user
app.get("/api/user", async(req: Request, res: Response) => {
  try{
    const result = await pool.query(`
        SELECT * FROM users
      `)

      res.status(201).json({
        success: "true",
        message: "User retieved",
        data: result.rows
      })
  }
  catch(err: any) {
    res.status(500).json({
      message: err.message,
      error: err
    })
  }
});

// get method for single user
app.get("/api/user/:id", async(req: Request, res: Response) => {
  const { id } = req.params;

  try{
    const result = await pool.query(
      `SELECT * FROM users WHERE id=$1`,
        [id]);

      if(result.rows.length === 0) {
          res.status(404).json({
          success: "false",
          message: "user not found",
          data: {}
        });
      }  

      res.status(201).json({
        success: "true",
        message: "single User retieved",
        data: result.rows[0]
      });
  }
  catch(err: any) {
     res.status(500).json({
      message: err.message,
      error: err
    })
  }
});


// put method for user
app.put("/api/user/:id", async(req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;

    const result = await pool.query(
      `UPDATE users SET 
        name=COALESCE($1, name),
        password=COALESCE($2, password),
        age=COALESCE($3, age),
        is_active=COALESCE($4, is_active)

      WHERE id=$5 RETURNING *`,
      [name, password, age, is_active, id]
    );


     if(result.rows.length === 0) {
          res.status(404).json({
          success: "false",
          message: "user not found",
          data: {}
        });
      }  

    res.status(201).json({
      success: "true",
      message: "User updated",
      data: result.rows[0]
    });
});



// DELETE method for user
app.delete("/api/user/:id", async(req: Request, res: Response) => {
  const { id } = req.params;

  try{
    const result = await pool.query(`
      DELETE FROM users WHERE id=$1 
      `, [id]);


      if(result.rows.length === 0) {
          res.status(404).json({
          success: "false",
          message: "user not found",
          data: {}
        });
      }  

      res.status(201).json({
        success: "true",
        message: "User deleted",
        data: {}
      });
  }
  catch(err: any) {
     res.status(500).json({
      message: err.message,
      error: err
    })
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

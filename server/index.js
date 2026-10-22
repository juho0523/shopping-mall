import pg from 'pg'
import express from 'express'
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 8000;

const { Pool } = pg;
// 브라우저가 보안상 이유로 api 요청을 차단하는데 api 요청 차단을 방지하기 위한 라이브러리임
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
}))

// JsUser_2026! <-mysql 비밀번호
const db =  process.env.DATABASE_URL
        ? new pg.Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        })
        : new pg.Pool({
            host: "localhost",
            user: "jsuser",
            password: "JsUser_2026!",
            database: "jsdb"
        })

db.on("error", (err) => {
    console.log("PostgreSQL 연결 오류", err)
})

db.query("SELECT 1", (err) => {
    if(err){
        console.log("PostgreSQL 연결 실패", err);
        return;
    }
    console.log("PostgreSQL 연결 성공");
})

app.use(express.json())

app.get("/api/products", (req, res) => {
    
    const sql = 'SELECT * FROM product'
    db.query(sql, (err, result) =>{
        if(err){
            console.log("상품 조회 에러", err)
            res.status(500).send("상품 조회 중 오류가 발생했습니다")
            return
        }
        res.json(result.rows)
    })
})

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id
    const sql = 'SELECT * FROM product WHERE id = $1'
    db.query(sql, [productId], (err, results) =>{
        if(err){
            console.log("상품 조회 에러", err)
            res.status(500).send("상품 조회 중 오류가 발생했습니다")
            return
        }
        res.json(results.rows[0])
    })
})
app.delete('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const sql = 'DELETE FROM product WHERE id = $1'
        const result = await db.query(sql, [productId])

        if (result.rowCount === 0) {
            return res.status(404).send('상품을 찾을 수 없습니다')
        }

        res.send('상품이 성공적으로 삭제되었습니다')
    } catch (err) {
        console.error('상품 삭제 에러:', err)
        res.status(500).send('상품 삭제 중 오류가 발생했습니다')
    }
})

// 상품 수정
app.put('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const { productName, price, description } = req.body

        const sql = `
            UPDATE product
            SET product_name = $1,
                price = $2,
                description = $3
            WHERE id = $4
        `

        const result = await db.query(sql, [
            productName,
            price,
            description,
            productId
        ])

        if (result.rowCount === 0) {
            return res.status(404).send('상품을 찾을 수 없습니다')
        }

        res.send('상품이 성공적으로 수정되었습니다')
    } catch (err) {
        console.error('상품 수정 에러:', err)
        res.status(500).send('상품 수정 중 오류가 발생했습니다')
    }
})

app.post("/api/products", (req, res) => {
    const {productName, price, description} = req.body
    const sql = 'INSERT INTO product(product_name, price, description) VALUES ($1, $2, $3)'
    db.query(sql, [productName, price, description], (err, results) => {
        if(err){
            console.error("상품 등록 에러", err)
            res.status(500).send("상품 등록 중 오류가 발생했습니다")
            return;
        }
        res.status(201).send("상품이 성공적으로 등록되었습니다")
    })
})


// 회원 목록 조회
app.get('/api/users', async (req, res) => {
    try {
        const sql = 'SELECT * FROM users'
        const result = await db.query(sql)

        res.json(result.rows)
    } catch (err) {
        console.error('회원 목록 조회 에러:', err)
        res.status(500).send('회원 목록 조회 중 오류가 발생했습니다')
    }
})

// 회원가입
app.post('/api/users', async (req, res) => {
    try {
        const { username, password, email } = req.body

        const sql = `
            INSERT INTO users (username, password, email)
            VALUES ($1, $2, $3)
        `

        await db.query(sql, [username, password, email])

        res.status(201).send('회원가입 성공')
    } catch (err) {
        console.error('회원가입 에러:', err)
        res.status(500).send('회원가입 중 오류가 발생했습니다')
    }
})

// 특정 회원 조회
app.get('/api/users/:username', async (req, res) => {
    try {
        const username = req.params.username
        const sql = 'SELECT * FROM users WHERE username = $1'
        const result = await db.query(sql, [username])

        if (result.rows.length === 0) {
            return res.status(404).send('회원을 찾을 수 없습니다')
        }

        res.json(result.rows[0])
    } catch (err) {
        console.error('회원 조회 에러:', err)
        res.status(500).send('회원 조회 중 오류가 발생했습니다')
    }
})


app.get('/', (req, res) => {
    res.send("<h1>서버 DB 연동</h1>")
})



app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})
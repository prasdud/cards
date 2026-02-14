import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
    return c.json({
        status: 'healthy',
        time: new Date().toISOString()
    })
})

export default app

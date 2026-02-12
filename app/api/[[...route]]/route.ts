import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.get('/ping', (c) => c.text('pong'))
app.get('/hello', (c) => c.json({ message: 'Hello from Hono!' }))

export const GET = handle(app)
export const POST = handle(app)

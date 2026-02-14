import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.get('/health', (c) => c.json({ status: 'Healthy at ' + new Date().toISOString() }))

export const GET = handle(app)
export const POST = handle(app)

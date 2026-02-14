import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import health from './health'

const app = new Hono().basePath('/api')

// health
app.route('/health', health)

// individual cards
app.route('/create_card_json', create_card_json)
app.route('/get_card_json', get_card_json)

app.route('/create_card_link', get_card_link)
app.route('/get_card_json', get_card)
app.route('/get_card_json', get_card)
app.route('/get_card_json', get_card)


// rolodex
app.route('')

export const GET = handle(app)
export const POST = handle(app)


import { Hono } from "hono"

export const cardsRouter = new Hono()

cardsRouter.get("/", c => c.json({ cards: [] }))
cardsRouter.get("/:id", c => c.json({ id: c.req.param("id") }))


import { Hono } from "hono"

export const authRouter = new Hono()

authRouter.post("/login", c => c.json({ ok: true }))

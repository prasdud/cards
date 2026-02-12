
import { Hono } from "hono"
import { cardsRouter } from "./cards"
import { authRouter } from "./auth"

export const app = new Hono()

app.route("/cards", cardsRouter)
app.route("/auth", authRouter)

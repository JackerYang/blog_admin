import { post } from "../axios"

export const login = params => post("/sys/login", params)
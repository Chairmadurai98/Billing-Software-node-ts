import dotenv from "dotenv";

dotenv.config()

const { PORT = 3000, MONGOURI = '' } = process.env
export const Constants = {
    PORT,
    MONGOURI,
}
import dotenv from "dotenv";

dotenv.config()

const { PORT = 3000, MONGOURIV1 = '', MONGOURIV2= '' } = process.env
export const Constants = {
    PORT,
    MONGOURIV1,
    MONGOURIV2,
}
import { Request, Response } from "express"
import { CustomResponse } from "../../../_utils/helpers"
import { essentialList } from "./_utils"



export const essentialGetAll = async (req: Request, res: Response) => {
    try {
        const { includes = ['Product'] }: { includes: EssentialListTypeV2[] } = req.query as never
        const data : EssentialListResTypeV2 = {}
        if(includes && Number(includes.length) > 0 ){
            const essentialData = await Promise.all(includes.map(inc=> essentialList[inc]()))
            essentialData.forEach((essential, index)=>{
                data[includes[index]] = essential as never
            })
        }

        CustomResponse.success({
            res,
            data
        })
        
    } catch (error) {
        CustomResponse.error({
            res,
            error
        })
    }
}
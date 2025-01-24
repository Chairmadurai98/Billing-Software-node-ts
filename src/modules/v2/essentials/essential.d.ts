type EssentialListTypeV2 = "Product"

type EssentialListTypeAsyncV2  = {
    [key in EssentialListTypeV2] : () => Promise<unknown | null>
}


type EssentialListResTypeV2  = {
    [key in EssentialListTypeV2]?: unknown
}
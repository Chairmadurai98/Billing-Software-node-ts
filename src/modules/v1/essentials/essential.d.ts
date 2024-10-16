type EssentialListType = "Product" | "Category"

type EssentialListTypeAsync  = {
    [key in EssentialListType] : () => Promise<unknown | null>
}


type EssentialListResType  = {
    [key in EssentialListType]?: unknown
}
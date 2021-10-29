

import { object, number, string, TypeOf } from 'zod'

const payload = {
    body: object({
        title: string({
            required_error: "Title is required"
        }),
        description: string({
            required_error: "Description is required"
        }).min(20, "Description should be atleast 20 characters long."),
        price: number({
            required_error: "Price is required"
        }),
        image: string({
            required_error: "Image is required"
        })
    })
}

const params = {
    params: object({
        productId: string({
            required_error: "Product Id is required"
        })
    })
}

export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...payload,
    ...params
})

export const getProductSchema = object({
    ...params
})

export const deleteProductSchema = object({
    ...params
})

export type createProductInput = TypeOf<typeof createProductSchema>
export type updateProductInput = TypeOf<typeof updateProductSchema>
export type getProductInput = TypeOf<typeof getProductSchema>
export type deleteProductInput = TypeOf<typeof deleteProductSchema>

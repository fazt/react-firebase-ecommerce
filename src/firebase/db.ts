import { db } from './config'
import { collection, addDoc } from 'firebase/firestore'

interface Product {
    // id: string
    name: string
    price: number
    description: string
}

export const createProduct = async (product: Product) =>
    await addDoc(collection(db, 'products'), product)
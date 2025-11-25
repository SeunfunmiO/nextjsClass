export interface User {
    id: number
    name: string
    department: string
    age: number
    address?: Address
}
export type Address = {
    number: number
    street: string
    city: string
    country: string
}

export type UserProfile = User & {
    phone: string
    email: string
    password: string
}
// export interface UserProfile extends User {
//     phone: string
//     email: string
//     password: string
// }

// export type BasicUser = Pick<UserProfile, 'name' | 'phone'>
export type BasicUser = Omit<UserProfile, 'password'>

export interface Product {
    id: number
    image: string
    title: string
    category: string
    price: number
    rating: number
}

export interface jwtPayload {
    _id?:string
    iat?:number
    exp? : string
    success:boolean
}
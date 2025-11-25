import { model, models, Schema } from "mongoose"



interface IUser {
    email: string
    password: string
    firstname: string
    lastname: string
    photo: string
    aboutme: string
    location: string
    website: string
    occupation: string
    createdAt: Date
}


const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    aboutme: {
        type: String
    },
    location: {
        type: String
    },
    occupation: {
        type: String
    },
    website: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const UserModel = models.User<IUser> || model("User", UserSchema)

export default UserModel
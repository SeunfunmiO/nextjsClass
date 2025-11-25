// const age: undefined | number;
// const name: string | undefined;
// const isOld: boolean | undefined

import { User} from "../utils/type"

// const students: string[] = ["Felix", "Cynthia", "Gentle"];
// const users: ["Felix", "Cynthia", "Gentle"];
// const members: Array<string> = ["Felix", "Cynthia", "Gentle"];
// const scores: number[] = [1, 2, , 3, 4, 5];
// const man: User = {
//     name: "Felix",
//     department: 'Software Engineering',
//     age: 18
// }

// const member: {
//     name: string,
//     department: string,
//     age: number
// } = {
//     name: "Felix",
//     department: 'Software Engineering',
//     age: 18
// }
//use client

const newUser: User[] = [
    {
        id: 1,
        name: "Felix",
        department: "Software Engineering",
        age: 18
    },
    {
        id: 2,
        name: "Cynthia",
        department: "Cyber Security",
        age: 16
    }
]

// const getUser = (phone: UserProfile['phone']) => {
//     const userId = newUser.find((each) => each.id === id)
//     return userId
// }
//returning the type of user | scope of type=()=>
// const getUser: () => User = () => {}
// const getUser: (id: number) => User | undefined = (id: number) => {
//     const userId = newUser.find((each) => each.id === id)
//     return userId
//     // const user: User = {
//     //     id: 1,
//     //     name: "Felix",
//     //         department: 'Software Engineering',
//     //         age: 18
//     // }
//     // return user
// }

// user.age = 12

const page = () => {
    return (
        <div>
            {
                newUser.map((user, index) => (
                    <div key={index} className="flex items-center gap-3 px-6 py-2">
                        <p>{index + 1}</p>
                        <p className="text-2xl font-bold">Name: {user.name}</p>
                        <p className="text-semibold text-lg">Department: {user.department},</p>
                        <small className="text-zinc-900">Age:{user.age}</small>
                    </div>
                ))
            }


        </div>
    )
}

export default page
"use server"

// export const addProduct = async (form: FormData) => {
//     const title = form.get("title") as string;
//     const price = form.get("price") as string;

//     console.log({
//         title,
//         price: parseFloat(price)
//     });

// }

export const addProduct = async (form: { title: string, price: string }) => {
    console.log({
        title: form.title,
        price: parseFloat(form.price)
    });

}
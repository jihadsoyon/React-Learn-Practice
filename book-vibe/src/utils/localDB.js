
const getAllReadListFromLocalDB = () => {
const allReadList = localStorage.getItem("storedBooks");
console.log(allReadList, "readlist from localDB")

if(allReadList) return JSON.parse(allReadList);
return [];


}

const addReadListToLocalDB = (book) => {
const allBooks = getAllReadListFromLocalDB();
const isAllreadyExist = allBooks.find(bk => bk.bookId === book.bookId)

if(!isAllreadyExist){
    // Ei data ta local db te add korte chay
    allBooks.push(book);
    localStorage.setItem("storedBooks", JSON.stringify(allBooks))
}

}

const getAllWishListFromLocalDB = () => {
const allWishList = localStorage.getItem("wishList");
console.log(allWishList, "wishlist from localDB")

if(allWishList) return JSON.parse(allWishList);
return [];

}


const addWishListToLocalDB = (book) => {
const allWish = getAllWishListFromLocalDB();
const isAllreadyExists = allWish.find(bk => bk.bookId === book.bookId)

if(!isAllreadyExists){
    // Ei data ta local db te add korte chay
    allWish.push(book);
    localStorage.setItem("wishList", JSON.stringify(allWish))
}

}













export {getAllReadListFromLocalDB, addReadListToLocalDB, getAllWishListFromLocalDB, addWishListToLocalDB}














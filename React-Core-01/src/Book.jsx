export default function Book({book}){
  console.log('book', book)
  return <li>Name: {book.name} Price: {book.price}</li>
}
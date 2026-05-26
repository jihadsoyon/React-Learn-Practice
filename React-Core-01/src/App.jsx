import './App.css'
import ToDo from './todo'
import Actor from './actor'
import Singer from './singer'
import Library from './library'

function App() {

const actors = ['Bappa Raj', 'Omar Sunny', "Salman Shah", 'Jashim', 'Anwar', 'Rajjak'];

const singers = [
  {id: 1, name: 'Dr. Mahfuz', age: 1},
  {id: 2, name: 'Tahsan', age: 45},
  {id: 3, name: 'Shuvro Deb', age: 57}
]

const books = [
  {id: 1, name: 'Physics', price: 250},
  {id: 2, name: 'Chemistry', price: 250},
  {id: 3, name: 'Math', price: 250},
  {id: 4, name: 'Biology', price: 250},
  
]



  // const time = 50;
  return (
    <>
     <h1>React Core Concept</h1>
     <Library books={books}></Library>

     {
      singers.map(singer => <Singer key={singer.id} singer={singer}></Singer>)
     }

    {/* {
      actors.map(actor => <Actor actor={actor}></Actor>)
    }  */}



    </>
  )
}




export default App

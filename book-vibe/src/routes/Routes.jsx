import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/homepage/Homepage";
import Books from "../pages/books/Books";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import BookDetails from "../pages/BookDetails/BookDetails";
import PagesToRead from "../pages/PagesToRead/PagesToRead";  // Import নতুন

export const router = createBrowserRouter([{
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Homepage />,
    },
    {
      path: "/books",
      element: <Books />,
    },
    {
      path: "/pages-to-read",  // নতুন route
      element: <PagesToRead />,
    },
    {
      path: '/bookDetails/:bookId',
      element: <BookDetails />,
      loader: () => fetch("/booksData.json") 
    }
  ],
  errorElement: <ErrorPage />
},


])
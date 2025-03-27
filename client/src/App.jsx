import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Admin, Appointment, ErrorPage, HomeLayOut, Landing, Login, MyBookings, Register } from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/bookings",
        element: <MyBookings/>,
      },
      {
        path: "/appointments",
        element: <Appointment/>,
      },
      {
        path: "/admin",
        element: <Admin/>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
])

function App(){
  return <RouterProvider router={router} />
}

export default App
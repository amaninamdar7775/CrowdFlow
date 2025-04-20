import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login'
import Malls from './components/Malls';
import Railway from './components/Railway';
import LiveStatus from './components/LiveStatus';
import Metro from './components/Metro';
import Bus from './components/Bus';
import AboutUs from './components/AboutUs';
import Error from './components/Error';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import ScrollToTop from './components/ScrollToTop';

function Root() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Error />,
    children: 
    [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/shopping/malls",
        element: <Malls />,
      },
      {
        path: "/stations/railway",
        element: <Railway />,
      },
      {
        path: "/stations/metro",
        element: <Metro />,
      },
      {
        path: "/stations/bus",
        element: <Bus />,
      },
      {
        path: "/live-status",
        element: <LiveStatus />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      }
    ]
  }
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

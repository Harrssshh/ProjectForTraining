import React from 'react'
import { createBrowserRouter} from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'
import UnProtected from '../components/UnProtected'
import Protected from '../components/Protected'
import Cart from '../components/Cart'
import Dashboard from '../components/Dashboard'
import Order from '../components/Order'
import MyOrder from '../components/MyOrder'
import Profile from '../components/Profile'
import OpenRoute from '../components/OpenRoute'
import GoogleAuth from '../components/GoogleAuth'
import Signup from '../components/Signup'

const Router = createBrowserRouter([
    {
        element:<OpenRoute/>,
        children:[
            {
                path : "/",
                element : <Home/>
            },
            {
                path:'/cart',
                element:<Cart/>    
            },
            {
                path:'/googleauth',
                element:<GoogleAuth/>
            }
        ]
    },
    {
        element:<UnProtected/>,
        children:[
            {
                path:"/signup",
                element:<Signup />
            },
            {
                path:"/login",
                element: <Login/>
            }
        ]
    },
    {
        element:<Protected allowedRole={["admin"]}/>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard/>
            }
        ]
    },
    {
        element:<Protected allowedRole={["User"]}/>,
        children:[
            {
                path:'/order',
                element:<Order/>
            },{
                path :'/myorder',
                element :<MyOrder/>
            }
        ]
    },
    {
        element:<Protected allowedRole={["User","Admin"]}/>,
        children:[
           {
                path :'/profile',
                element :<Profile/>
            }
        ]
    }
])

export default Router
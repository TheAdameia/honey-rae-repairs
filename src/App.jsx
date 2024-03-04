import "./App.css"
import { CustomerList } from "./components/customers/CustomerList.jsx"
import { TicketList } from "./components/tickets/TicketList.jsx"
import { StaffList } from "./components/staff/StaffList.jsx"
import { Routes, Route } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar.jsx"
import { Outlet } from "react-router-dom"
import { Welcome } from "./welcome/Welcome.jsx"

export const App = () => {
  return (<Routes>
    <Route path="/" element=
      {
        <>
          <NavBar />
          <Outlet /> {/* child routes render where Outlet is called */}
        </>
      }
    >
      <Route index element={<Welcome />} /> {/* the "index" route allows you to add an element that is only rendered on the parent
      page, which in this case is the home page of the site. If I were to put "Welcome" between NavBar and Outlet, it would render
      on every page.*/}
      <Route path="tickets" element={<TicketList />} />
      <Route path="customers" element={<CustomerList />} />
      <Route path="staff" element={<StaffList />} />
    </Route>
  </Routes>
  )
}
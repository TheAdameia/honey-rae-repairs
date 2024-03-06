import "./App.css"
import { CustomerList } from "./components/customers/CustomerList.jsx"
import { TicketList } from "./components/tickets/TicketList.jsx"
import { StaffList } from "./components/staff/StaffList.jsx"
import { Routes, Route } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar.jsx"
import { Outlet } from "react-router-dom"
import { Welcome } from "./welcome/Welcome.jsx"
import { CustomerDetails } from "./components/customers/CustomerDetails.jsx"
import { StaffDetails } from "./components/staff/StaffDetails.jsx"

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
      <Route path="customers">
        <Route index element={<CustomerList />} /> {/* if the element was left in the parent route, it would also render on every subpage
        similar to the Welcome issue that was averted earlier. */}
        <Route path=":customerId" element={<CustomerDetails />} />
      </Route>
      <Route path="staff">
        <Route index element={<StaffList />} />
        <Route path=":staffId" element={<StaffDetails />} />
      </Route>
    </Route>
  </Routes>
  )
}
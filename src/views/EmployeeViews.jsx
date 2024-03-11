import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav"
import { Welcome } from "../welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { CustomerList } from "../components/customers/CustomerList"
import { CustomerDetails } from "../components/customers/CustomerDetails"
import { StaffList } from "../components/staff/StaffList"
import { StaffDetails } from "../components/staff/StaffDetails"
import { EmployeeForm } from "../components/forms/EmployeeEdit"



export const EmployeeViews = ({ currentUser }) => {
    return (
    <Routes>
      <Route path="/" element=
          {
            <>
              <EmployeeNav />
              <Outlet /> {/* child routes render where Outlet is called */}
            </>
          }
        >
          <Route index element={<Welcome />} /> {/* the "index" route allows you to add an element that is only rendered on the parent
          page, which in this case is the home page of the site. If I were to put "Welcome" between NavBar and Outlet, it would render
          on every page.*/}
          <Route path="tickets" element={<TicketList currentUser={currentUser}/>} />
          <Route path="customers">
            <Route index element={<CustomerList />} /> {/* if the element was left in the parent route, it would also render on every subpage
            similar to the Welcome issue that was averted earlier. */}
            <Route path=":customerId" element={<CustomerDetails />} />
          </Route>
          <Route path="staff">
            <Route index element={<StaffList />} />
            <Route path=":staffId" element={<StaffDetails />} />
          </Route>
          <Route path="profile" element={<EmployeeForm currentUser={currentUser}/>}/>
        </Route>
      </Routes>
    )
}
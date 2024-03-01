import "./App.css"
import { CustomerList } from "./components/customers/CustomerList.jsx"
import { TicketList } from "./components/tickets/TicketList.jsx"
import { StaffList } from "./components/staff/StaffList.jsx"

export const App = () => {
  return <>
    {/* <TicketList /> */}
    <CustomerList />
    <StaffList />
  </>
}
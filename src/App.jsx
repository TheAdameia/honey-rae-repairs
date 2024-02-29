import "./App.css"
import { CustomerList } from "./components/customers/CustomerList.jsx"
import { TicketList } from "./components/tickets/TicketList.jsx"

export const App = () => {
  return <>
    {/* <TicketList /> */}
    <CustomerList />
  </>
}
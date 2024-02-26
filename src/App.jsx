import { useEffect, useState } from "react";
import { getAllTickets } from "./services/ticketService";
import "./App.css"

export const App = () => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])

  useEffect(() => {
    getAllTickets().then(ticketsArray => {
      setAllTickets(ticketsArray)
      console.log("tickets set")
    })
  }, []) //runs on the initial render of the component because the dependency array is empty

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    }
    else (
      setFilteredTickets(allTickets)
    )
  }, [showEmergencyOnly, allTickets]) //runs when the "showEmergencyOnly" or "allTickets" state changes, triggered by button press
  //it is very important to list allTickets as a dependency here because if it is not, the list will not render
  //on initial page load as allTicks is generated asynchronously

  return (<div className="tickets-container">
    <h2>Tickets</h2>
    <div>
      <button className="filter-btn btn-primary" onClick={() => {setShowEmergencyOnly(true)}}>Emergency</button>
      <button className="filter-btn btn-secondary" onClick={() => {setShowEmergencyOnly(false)}}>Show Everything</button>
    </div>
    <article className="tickets">
      {filteredTickets.map((ticket) => {
        return (
          <section className="ticket" key={ticket.id}>
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
              <div>
                <div className="ticket-info">emergency</div>
                <div>{ticket.emergency ? "yes" : "no"}</div>
              </div>
            </footer>
          </section>
        )
      })}
    </article>
  </div>
  )
}
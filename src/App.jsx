import { useEffect, useState } from "react";
import { getAllTickets } from "./services/ticketService";
import "./App.css"

export const App = () => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])
  // The variables inside these arrays are called state variables, because they are the "state" that is watched
  // and used to provide data for our HTML render. These state variables are set by feeding a value into the function
  // named inside the array. The argument for useState is the default value of the state variable.

  // we have "filteredTickets" in addition to "allTickets" because we need two copies of the data: one as our master copy,
  // and one that we can modify for our HTML render.

  // useEffect works with the following syntax: "useEffect(() => {}, [])". Basic es6 arrow key function syntax with two arguments:
  // a function that determines *what* happens and a "dependency array" that contains whatever values you want it to listen to as
  // triggers. This can be nothing, which causes it to only run on initial render; or it can be state value(s), in which case it
  // triggers when those value(s) change.

  useEffect(() => {
    getAllTickets().then(ticketsArray => {
      setAllTickets(ticketsArray)
      console.log("tickets set")
    })
  }, []) //runs on the initial render of the component because the dependency array is empty
  //the ticketsArray is passed into allTickets (passed into state) by means of setAllTickets

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    }
    else (
      setFilteredTickets(allTickets)
    )
  }, [showEmergencyOnly, allTickets]) //runs when the "showEmergencyOnly" or "allTickets" state changes, triggered by button press
  // it is very important to list allTickets as a dependency here because if it is not, the list will not render until a button is
  // pressed.

  // vv note how much simpler the JSX syntax is for event listeners! You can put them directly into your hidden state.
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
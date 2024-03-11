import { useEffect, useState } from "react"
import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState ({})

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    setCurrentUser(honeyUserObject)
  }, [])

  return (currentUser.isStaff) ? <EmployeeViews currentUser={currentUser} /> : <CustomerViews currentUser={currentUser} />
}

// for prop drilling, it's important to note that the prop drill (currentUser in this case) goes INSIDE the element defined.
// otherwise, nothing gets passed!
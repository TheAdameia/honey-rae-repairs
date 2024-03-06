import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerByUserId } from "../../services/CustomerServices"
import "./Customers.css"

export const CustomerDetails = () => {
    // we are going to look at /customers/#. The path is path="/customers/:customerId".
    // What useParams does is it returns an object from the "parameters" from the URL. I do not have
    // a particularly solid grasp on this yet.

    // I KNOW NOW, useParams is fed from the path=":whatever" in app.jsx

    const [customer, setCustomer] = useState({})
    const { customerId } = useParams()

    useEffect(() => {
        getCustomerByUserId(customerId).then((data) => {
            const customerObject = data[0]
            setCustomer(customerObject)
        })
    }, [customerId])

    return (
        <section className="customer">
            <header className="customer-header">{customer.user?.fullName}</header> {/*optional chaining used 
            here because that is undefined on the first render */}
            <div>
                <span className="customer-info">Email : </span>
                {customer.user?.email}
            </div>
            <div>
                <span className="customer-info">Address : </span>
                {customer.address}
            </div>
            <div>
                <span className="customer-info">Phone Number : </span>
                {customer.phoneNumber}
            </div>
        </section>
    )
}
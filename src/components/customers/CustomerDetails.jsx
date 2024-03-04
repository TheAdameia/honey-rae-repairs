import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    // we are going to look at /customers/#. The path is path="/customers/:customerId".
    // What useParams does is it returns an object from the "parameters" from the URL. I do not have
    // a particularly solid grasp on this yet.

    const {customerId } = useParams()
}
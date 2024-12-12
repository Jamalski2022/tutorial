import { useState } from "react"

const CompanyForm = ({existingCompany = {}, updateCallback}) => {
    const [name, setName] = useState(existingCompany.name || "");
    const [address, setAddress] = useState(existingCompany.address || "");

    const updating = Object.entries(existingCompany).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = { name, address }
        const url = `http://127.0.0.1:5000/${updating ? `update_company/${existingCompany.id}` : "create_company"}`
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        } else{
            updateCallback()
        }
    }

    return (
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Company Name:</label>
            <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>

        <div>
            <label htmlFor="address">Address:</label>
            <input 
                type="text" 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
            />
        </div>

        <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
    );
};

export default CompanyForm
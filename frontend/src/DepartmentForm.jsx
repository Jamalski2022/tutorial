import { useState } from "react"

const DepartmentForm = ({existingDepartment = {}, updateCallback, companies = []}) => {
    const [name, setName] = useState(existingDepartment.name || "");
    const [description, setDescription] = useState(existingDepartment.description || "");
    const [companyId, setCompanyId] = useState(existingDepartment.companyId || "");

    const updating = Object.entries(existingDepartment).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = { name, description, companyId }
        const url = `http://127.0.0.1:5000/${updating ? `update_department/${existingDepartment.id}` : "create_department"}`
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
            <label htmlFor="name">Department Name:</label>
            <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>

        <div>
            <label htmlFor="description">Description:</label>
            <textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <div>
            <label htmlFor="company">Company:</label>
            <select 
                id="company" 
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                required
            >
                <option value="">Select Company</option>
                {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                        {company.name}
                    </option>
                ))}
            </select>
        </div>

        <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
    );
};

export default DepartmentForm
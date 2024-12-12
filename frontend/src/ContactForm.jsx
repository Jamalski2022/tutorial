// import { useState } from "react"

// const ContactForm = ({existingContact = {}, updateCallback}) => {
//     const [firstName, setFirstName] = useState(existingContact.firstName || "");
//     const [lastName, setLastName] = useState(existingContact.lastName || "");
//     const [email, setEmail] = useState(existingContact.email || "");

//     const updating = Object.entries(existingContact).length !== 0

//     const onSubmit = async (e) => {
//         e.preventDefault()

//         const data = {
//             firstName,
//             lastName,
//             email
//         }
//         const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
//         const options = {
//             method: updating ? "PATCH" : "POST",
//             headers:{
//                 "Content-type": "application/json"
//             },
//             body:JSON.stringify(data)
//         }
//         const response = await fetch(url, options)
//         if (response.status !== 201 && response.status !==200){
//             const data = await response.json()
//             alert(data.message)
//         } else{
//             updateCallback()
//         }

//     }
    
//     return (<form onSubmit={onSubmit}>
//         <div>
//             <label htmlFor="firstName">First Name:</label>
//             <input 
//                 type="text" 
//                 id="firstName" 
//                 value={firstName} 
//                 onChange={(e) => setFirstName(e.target.value)}/>
//         </div>

//         <div>
//             <label htmlFor="lastName">Last Name:</label>
//             <input 
//                 type="text" 
//                 id="lastName" 
//                 value={lastName} 
//                 onChange={(e) => setLastName(e.target.value)}/>
//         </div>

//         <div>
//             <label htmlFor="email">Email:</label>
//             <input 
//                 type="text" 
//                 id="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)}/>
//         </div>
//         <button type="submit">{updating ? "Update" : "Create"}</button>
//     </form>
//     );
// };

// export default ContactForm

import { useState, useEffect } from "react"

const ContactForm = ({
  existingContact = {}, 
  updateCallback, 
  companies = [], 
  departments = []
}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const [companyId, setCompanyId] = useState(existingContact.companyId || "");
    const [departmentId, setDepartmentId] = useState(existingContact.departmentId || "");

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email,
            companyId,
            departmentId
        }
        const url = `http://127.0.0.1:5000/${updating ? `update_contact/${existingContact.id}` : "create_contact"}`
        const options = {
            method: updating ? "PATCH" : "POST",
            headers:{
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
            <label htmlFor="firstName">First Name:</label>
            <input 
                type="text" 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
        </div>

        <div>
            <label htmlFor="lastName">Last Name:</label>
            <input 
                type="text" 
                id="lastName" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
                required
            />
        </div>

        <div>
            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
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

        <div>
            <label htmlFor="department">Department (Optional):</label>
            <select 
                id="department" 
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
            >
                <option value="">Select Department</option>
                {departments
                    .filter(dept => dept.companyId === parseInt(companyId))
                    .map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.name}
                        </option>
                    ))
                }
            </select>
        </div>

        <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
    );
};

export default ContactForm
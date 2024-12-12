import React from "react"

const DepartmentList = ({departments, updateDepartment, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_department/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
    <div>
        <h2>Departments</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Company</th>
                    <th>Contacts</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {departments.map((department) => (
                    <tr key={department.id}>
                        <td>{department.name}</td>
                        <td>{department.description || 'N/A'}</td>
                        <td>{department.companyName}</td>
                        <td>{department.contactCount}</td>
                        <td>
                            <button onClick={() => updateDepartment(department)}>Update</button>
                            <button onClick={() => onDelete(department.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default DepartmentList
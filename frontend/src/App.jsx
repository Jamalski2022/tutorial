// import { useState, useEffect } from 'react'
// import ContactList from './ContactList'
// import './App.css'
// import ContactForm from './ContactForm'


// function App() {
//   const [contacts, setContacts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentContact, setCurrentContact] = useState({})

//   useEffect(() => {
//     fetchContacts()
//   }, [])

//   const fetchContacts = async () => {
//     const response = await fetch("http://127.0.0.1:5000/contacts");
//     const data = await response.json();
//     setContacts(data.contacts);

//   };

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setCurrentContact({})
//   }

//   const openCreateModal = () => {
//     if (!isModalOpen) setIsModalOpen(true)
//   }

//   const openEditModale = (contact) => {
//     if (isModalOpen) return
//     setCurrentContact(contact)
//     setIsModalOpen(true)
//   }

//   const onUpdate = () => {
//     closeModal()
//     fetchContacts()
//   }

//   return ( 
//   <>
//   <ContactList contacts={contacts} updateContact={openEditModale} updateCallback={onUpdate}/>
//   <button onClick={openCreateModal}>Create New Contact</button>
//   {
//     isModalOpen && <div className='modal'>
//       <div className='modal-content'>
//         <span className='close' onClick={closeModal}>&times;</span>
//       <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
//       </div>
      
//     </div>
//   }
  
//   </>
//   );
// }

// export default App


import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import CompanyList from './CompanyList'
import DepartmentList from './DepartmentList'
import ContactForm from './ContactForm'
import CompanyForm from './CompanyForm'
import DepartmentForm from './DepartmentForm'
import './App.css'

function App() {
  // State for different entities
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  // Modal states
  const [activeEntity, setActiveEntity] = useState('contacts');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  // Fetch functions for different entities
  useEffect(() => {
    fetchContacts();
    fetchCompanies();
    fetchDepartments();
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const fetchCompanies = async () => {
    const response = await fetch("http://127.0.0.1:5000/companies");
    const data = await response.json();
    setCompanies(data.companies);
  };

  const fetchDepartments = async () => {
    const response = await fetch("http://127.0.0.1:5000/departments");
    const data = await response.json();
    setDepartments(data.departments);
  };

  // Modal control functions
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentItem({})
  }

  const openCreateModal = (entity) => {
    setActiveEntity(entity);
    setIsModalOpen(true);
  }

  const openEditModal = (item, entity) => {
    setActiveEntity(entity);
    setCurrentItem(item);
    setIsModalOpen(true);
  }

  const onUpdate = () => {
    closeModal();
    // Refresh based on active entity
    switch(activeEntity) {
      case 'contacts':
        fetchContacts();
        break;
      case 'companies':
        fetchCompanies();
        break;
      case 'departments':
        fetchDepartments();
        break;
    }
  }

  // Render appropriate form based on active entity
  const renderForm = () => {
    switch(activeEntity) {
      case 'contacts':
        return <ContactForm 
          existingContact={currentItem} 
          updateCallback={onUpdate}
          companies={companies}
          departments={departments}
        />;
      case 'companies':
        return <CompanyForm 
          existingCompany={currentItem} 
          updateCallback={onUpdate}
        />;
      case 'departments':
        return <DepartmentForm 
          existingDepartment={currentItem} 
          updateCallback={onUpdate}
          companies={companies}
        />;
      default:
        return null;
    }
  }

  return ( 
  <div className="app-container">
    <div className="navigation">
      <button onClick={() => openCreateModal('contacts')}>Manage Contacts</button>
      <button onClick={() => openCreateModal('companies')}>Manage Companies</button>
      <button onClick={() => openCreateModal('departments')}>Manage Departments</button>
    </div>

    {activeEntity === 'contacts' && (
      <ContactList 
        contacts={contacts} 
        updateContact={(contact) => openEditModal(contact, 'contacts')} 
        updateCallback={onUpdate}
      />
    )}

    {activeEntity === 'companies' && (
      <CompanyList 
        companies={companies} 
        updateCompany={(company) => openEditModal(company, 'companies')} 
        updateCallback={onUpdate}
      />
    )}

    {activeEntity === 'departments' && (
      <DepartmentList 
        departments={departments} 
        updateDepartment={(department) => openEditModal(department, 'departments')} 
        updateCallback={onUpdate}
      />
    )}

    {isModalOpen && (
      <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          {renderForm()}
        </div>
      </div>
    )}
  </div>
  );
}

export default App
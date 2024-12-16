# tutorial

# Contact Sync Manager/tutorial

## Project Overview

Contact Sync Manager is a comprehensive web application that enables efficient management of contacts, companies, and departments across organizations.

## Project Structure

### Backend (Python Flask)

```
backend/
│
├── config.py           # Configuration settings
├── main.py             # Main application entry point
├── models.py           # Database models and schema
├── mydatabase.db       # SQLite database
├── requirements.txt    # Python dependencies
│
├── instance/           # Instance-specific files
├── migrations/         # Database migration scripts
└── __pycache__/        # Compiled Python files
```

### Frontend (React)

```
frontend/
│
├── public/             # Public assets
├── src/                # Source code
│   ├── app.css         # Global styles
│   ├── app.jsx         # Main React application component
│   ├── companyform.jsx # Company creation form
│   ├── companylist.jsx # List of companies
│   ├── contactform.jsx # Contact creation form
│   ├── contactlist.jsx # List of contacts
│   ├── departmentform.jsx  # Department creation form
│   ├── departmentlist.jsx  # List of departments
│   ├── index.css       # Index styling
│   ├── loginform.jsx   # User login component
│   ├── main.jsx        # Entry point for React app
│   └── signupform.jsx  # User signup component
│
├── .gitignore          # Git ignore configuration
├── eslint.config.js    # ESLint configuration
├── index.html          # Main HTML file
├── package-lock.json   # Locked dependency versions
└── package.json        # Project metadata and dependencies
```

## Prerequisites

- Python 3.8+
- Node.js 14+
- pip
- npm

## Forking the Repository

### 1. Fork the Repository

1. Navigate to the GitHub repository page
2. Click the "Fork" button in the top right corner of the page
3. Select your GitHub account as the destination

### 2. Clone Your Forked Repository

```bash
git clone git@github.com:Jamalski2022/tutorial.git
cd contact-sync-manager
```

## Setup and Installation

### Backend Setup

1. Navigate to the backend directory

```bash
cd backend
```

2. Create a virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Run database migrations

```bash
flask db upgrade
```

5. Start the Flask server

```bash
python main.py
```

### Frontend Setup

1. Navigate to the frontend directory

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

## Deployment

### Backend Deployment

- Backend is deployed on Render:
  [Contact Sync Manager Backend]

### Frontend Deployment

- Frontend is deployed on Render:
  [Contact Sync Manager Frontend]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

Project Links:

- [Backend Repository]
- [Frontend Repository]

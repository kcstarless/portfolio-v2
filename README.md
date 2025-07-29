# Portfolio v2

A full-stack developer portfolio built with React, Redux Toolkit, Material-UI, and a Node.js/Express backend.

---

## Features

- **Dynamic Project Showcase:**  
  Add, edit, and delete projects with images, tech stack, demo links, and GitHub URLs.

- **Tech Stack Management:**  
  Searchable, filterable, and level-tagged technology stack with Devicon multicolor icons.

- **Authentication:**  
  Redux-managed authentication for secure project and tech stack editing.

- **Responsive UI:**  
  Built with Material-UI (MUI) and custom theming for a polished, mobile-friendly experience.

- **Notifications:**  
  Custom notification context for user feedback on all actions.

- **Loading States:**  
  Dialogs and forms show loading spinners during async operations.

- **Backend Validation:**  
  Node.js/Express backend with Mongoose validation and error handling.

- **Testing:**  
  Comprehensive backend tests using Jest.

---

## Tech Stack

- **Frontend:**  
  - React (with functional components and hooks)
  - Redux Toolkit (state management, async thunks)
  - Material-UI (MUI) for UI components and theming
  - Devicon for technology icons
  - Vite for fast development and builds

- **Backend:**  
  - Node.js & Express
  - MongoDB & Mongoose
  - JWT authentication
  - Multer for image uploads

- **Testing:**  
  - Jest (backend)

---

## Folder Structure

```
client/
  src/
    components/
      Sidebar.jsx
      ProjectCard.jsx
      Projects.jsx
      forms/
      header/
      sidebar/
    contexts/
    hooks/
    services/
    store/
    styles/
    utils/
server/
  controllers/
  middleware/
  models/
  requests/
  tests/
  uploads/
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kcstarless/portfolio-v2.git
   cd portfolio-v2
   ```

2. **Install dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables:**  
   Copy `.env.example` to `.env` in both `client` and `server` folders and fill in the required values.

4. **Run the development servers:**
   - **Backend:**
     ```bash
     cd server
     npm run dev
     ```
   - **Frontend:**
     ```bash
     cd client
     npm run dev
     ```

5. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port Vite shows).

---

## Customization

- **Theme:**  
  Edit `client/src/styles/theme.js` to adjust colors, typography, and global styles.

- **Tech Stack Icons:**  
  Add or modify icons in `client/src/utils/deviconList.js`.

- **Profile Info:**  
  Update your profile, skills, and about text in `Sidebar.jsx`.

---

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run test` — Run backend tests (in `server/`)

---

## License

MIT

---

## Author

David Gim  
[Live demo site](https://davidgim.fly.dev/)

---

## Acknowledgements

- [Material-UI](https://mui.com/)
- [Devicon](https://devicon.dev/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
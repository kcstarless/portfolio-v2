import Layout from './components/Layout'
import Projects from './pages/Projects'
import './styles/App.css'

function App() {
  console.log("🟢 App component rendering...")
  return (
    <>
      <Layout>
        <Projects />
      </Layout>
    </>
  )
}

export default App

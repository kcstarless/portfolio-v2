import '../styles/layout.css'

const Layout = ({ children }) => {
    return(
        <div className="layout">
            <header>Header</header>
            <aside>Sidebar</aside>
            <main>
                {children}
            </main>
            <footer>@2025 David Gim</footer>
        </div>
    )
}

export default Layout
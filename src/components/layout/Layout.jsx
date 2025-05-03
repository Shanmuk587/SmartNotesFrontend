import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-6">
        <div className="container-custom mx-auto">
          {children}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container-custom mx-auto">
          <p className="text-center text-gray-500 text-sm">
            
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
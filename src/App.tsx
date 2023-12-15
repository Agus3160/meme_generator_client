import NavBar from "./components/NavBar"
import MemeGenerator from "./pages/MemeGenerator"

function App() {

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center my-5 " style={{minHeight: 'calc(100vh - 104px)', boxSizing: 'border-box', overflow: 'auto' }}>
        <MemeGenerator />
      </div>
    </>
  )
}

export default App

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <h1>Hello</h1>
            </Layout>
        } />

        <Route path="/search" element={
          <Layout>
            <h1>Search</h1>
            </Layout>
        } />

        <Route path="/register" element={
          <Layout>
           <Register />
          </Layout>
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
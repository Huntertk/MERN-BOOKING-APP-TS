import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";

const App = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <h1>Home Page</h1>
          </Layout>
        } />
        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>
        } />

        <Route path="/sign-in" element={
          <Layout>
            <SignIn />
          </Layout>
        } />
        <Route path="/search" element={
          <Layout>
            <h1>Search Page</h1>
          </Layout>
        } />

        {
          isLoggedIn && (
            <>
              <Route path="/add-hotel" element={
                <Layout>
                  <AddHotel />
                </Layout>
              } />
               <Route path="/my-hotels" element={
                <Layout>
                  <MyHotels />
                </Layout>
              } />
            </>
          )
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
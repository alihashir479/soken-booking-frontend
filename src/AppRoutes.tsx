import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import ProtectedRoute from "./components/ProtectedRoute";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout showHero>
            <Search />
          </Layout>
        }
      />
      <Route
        path="/detail/:hotelId"
        element={
          <Layout showHero>
            <Detail />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />} >
        <Route
          path="/add-hotel"
          element={
            <Layout>
              <AddHotel />
            </Layout>
          }
        />
        <Route
          path="/my-hotels"
          element={
            <Layout>
              <MyHotels />
            </Layout>
          }
        />
        <Route
          path="/edit-hotel/:id"
          element={
            <Layout>
              <EditHotel />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

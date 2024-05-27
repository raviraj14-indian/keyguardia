import { Suspense, useEffect } from "react";
import { NavBar } from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";
import { Flowbite } from "flowbite-react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.min.css";

// Importing Pages ----------------------------->
import HomePage from "./pages/HomePage";
// Auth Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// Protected Pages
import DashboardPage from "./pages/DashboardPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import AuthRoutes from "./pages/AuthRoutes";
import VerifyMfaPage from "./pages/VerifyMfaPage";
import SetupMfaPage from "./pages/SetupMfaPage";
import NotFound from "./pages/NotFound";

const customTheme = {
  button: {
    color: {
      primary: "bg-primary hover:bg-primary-darker text-white dark:text-black",
    },
  },
};

function App() {
  const { user, login } = useAuth();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    login(userData);
  }, []);

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <div className="flex flex-col bg-slate-300 min-h-screen dark:bg-slate-900 items-center">
          <BrowserRouter>
            {/* <AuthProvider> */}
            <NavBar />
            <main className="flex-1 w-full items-center mx-auto px-4 ">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route exact path="/" element={<HomePage />} />

                  {/* Auth Routes */}
                  <Route element={<AuthRoutes />}>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                  </Route>

                  {/* Private Routes */}
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/setup-mfa" element={<SetupMfaPage />} />
                  </Route>

                  {/* Public Routes */}
                  <Route path="/verify-mfa" element={<VerifyMfaPage />} />
                  <Route
                    exact
                    path="/verify-email"
                    element={<VerifyEmailPage />}
                  />
                  <Route
                    path="/verify-email/:token"
                    element={<VerifyEmailPage />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            {/* </AuthProvider> */}
          </BrowserRouter>
          <ToastContainer />
          <Footer />
        </div>
      </Flowbite>
    </>
  );
}

export default App;

import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Navbar from './components/layout/Navbar';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { authClient } from './lib/auth';
import AuthProvider from './context/AuthContext';

 
function App() {

  return (
    <>
    <NeonAuthUIProvider authClient={authClient} defaultTheme="dark">
      <AuthProvider>
      <BrowserRouter>
      <div className= "min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
           <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path = '/auth/:pathname' element={<Auth />} />
          <Route path = '/account/:pathname' element={<Account />} />
        </Routes>
        </main>
        </div>
      </BrowserRouter>  
      </AuthProvider>
    </NeonAuthUIProvider>   
    </>
  )
}

export default App

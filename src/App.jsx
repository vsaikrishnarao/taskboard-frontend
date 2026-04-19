// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import BoardListPage from './pages/BoardListPage'
// import BoardPage from './pages/BoardPage'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<BoardListPage />} />
//         <Route path="/boards/:boardId" element={<BoardPage />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import BoardListPage from './pages/BoardListPage'
import BoardPage from './pages/BoardPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Navbar />
              <BoardListPage />
            </ProtectedRoute>
          } />
          <Route path="/boards/:boardId" element={
            <ProtectedRoute>
              <Navbar />
              <BoardPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
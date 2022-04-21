import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './contexts/auth';
import { userIsAuth } from './localStorages/auth';

import Layout from './components/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PostPage from './pages/PostPage';
import PrivatePage from './pages/PrivatePage';
import PublicPage from './pages/PublicPage';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();

    let { userIsChecked, loggedUser } = useAuth();

    if (loggedUser !== null || (!userIsChecked && userIsAuth()))
        return children;

    return <Navigate
        to="/login"
        replace
        state={{
            from: location,
            message: "You are not authorized to access this page."
        }}
    />;
}

const PagesRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/public" element={<PublicPage />} />
                <Route path="/private" element={<RequireAuth><PrivatePage /></RequireAuth>} />
                <Route path="/post" element={<RequireAuth><PostPage /></RequireAuth>} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default PagesRoutes;
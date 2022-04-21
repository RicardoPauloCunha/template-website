import Menu from './components/Menu';
import { AuthContextProvider } from './contexts/auth';
import PagesRoutes from './routes';
import GlobalStyles from './styles/global';

const App = () => {
    return (
        <AuthContextProvider>
            <GlobalStyles />
            <PagesRoutes />
            <Menu />
        </AuthContextProvider>
    )
}

export default App;

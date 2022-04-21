import { useEffect, useState } from 'react';
import { NavLink as Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import { getLoggedUser, handlerLogout } from '../../localStorages/auth';

import { Button, Collapse, NavLink, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem } from 'reactstrap';
import { NavbarProfile } from './styles';

const Menu = () => {
    const navigate = useNavigate();
    const { loggedUser, defineLoggedUser } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        defineLoggedUser(getLoggedUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    const logout = () => {
        defineLoggedUser(null);
        handlerLogout();
        navigate("/");
    }

    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="md"
                fixed="top"
            >
                <NavbarBrand
                    to="/"
                    tag={Link}
                >
                    Template Website
                </NavbarBrand>

                <NavbarToggler
                    onClick={() => toggleIsOpen()}
                />

                <Collapse
                    navbar
                    isOpen={isOpen}
                >
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink
                                to="/public"
                                tag={Link}
                            >
                                Public
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                to="/private"
                                tag={Link}
                            >
                                Private
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                to="/post"
                                tag={Link}
                            >
                                Post
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <NavbarProfile>
                        {loggedUser
                            ? <>
                                <NavbarText>
                                    {loggedUser.name}
                                </NavbarText>

                                <Button
                                    onClick={() => logout()}
                                >
                                    Sair
                                </Button>
                            </>
                            : <Button
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                        }
                    </NavbarProfile>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Menu;
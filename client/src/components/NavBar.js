import React, { useContext } from 'react';
import { Context } from '../index';
import { Nav, Navbar , Button, Container} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite';
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                    <NavLink style={{color: 'white', marginLeft: '10px'}} to={SHOP_ROUTE}>Электроника</NavLink>
                {user.isAuth ?
                <Nav style={{marginLeft: 'auto'}} className="ml-auto">
                    <Button 
                        variant={"outline-light"} 
                        onClick={() => history.push(ADMIN_ROUTE)}
                    >
                        Админ Панель
                    </Button> 
                    <Button 
                        variant={"outline-light"} 
                        onClick={() => logOut()} 
                        style={{marginLeft: "14px"}}
                    >
                        Выйти
                    </Button>
                </Nav>
                :
                <Nav style={{marginLeft: 'auto'}} className="ml-auto">
                    <Button 
                        variant={"outline-light"} 
                        onClick={() => history.push(LOGIN_ROUTE)}
                    >
                        Авторизация
                    </Button>
                </Nav>
                }
            
            </Container>  
      </Navbar>
    );
});

export default NavBar;
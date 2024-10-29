import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../Photos/logo_athena 3.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/authProvider';

function Header({ textBar1, textBar2, textBar3, textBar4, onTextBar2Click }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pages = [textBar1, textBar2, textBar3, textBar4];
    const settings = ['Sua Conta', 'Sair'];

    const { logado, Logout } = useContext(AuthContext); // Obtém o estado de login
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleUserMenuClick = (setting) => {
        if (setting === 'Sair') {
            Logout();
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else if (setting === 'Sua Conta') {
            navigate('/user/Perfil', { replace: true });
        }
        handleCloseUserMenu();
    };

    return (
        <AppBar position="static" style={{ borderBottom: "2px solid black", paddingTop: 5, paddingBottom: 5, backgroundColor: "#394255" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={Logo} style={{ maxWidth: 250 }} alt="Logo" />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        if (page === 'Instruções') {
                                            onTextBar2Click();
                                        } else if (page === 'Home') {
                                            navigate('/home/professor');
                                        } else if (page === 'Cadastrar uma Tarefa') {
                                            navigate('/cadastrotarefas');
                                        } else if (page === 'Tarefas') {
                                            navigate('/dashboard/tarefas/aluno');
                                        } else if (page === 'DASHBOARD') {
                                            navigate('/dashboard/tarefas/professor');
                                        } else if (page === 'HOME') {
                                            navigate('/home/aluno');
                                        } else if (page === 'Minhas tarefas') {
                                            navigate('/dashboard/tarefas/aluno');
                                        } else if (page === 'dashboard') {
                                            navigate('/dashboard/aluno');
                                        } else if (page === 'Avaliar Tarefas') {
                                            navigate('/notas/professor');
                                        }
                                    }}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    if (page === 'Instruções') {
                                        onTextBar2Click();
                                    } else if (page === 'Home') {
                                        navigate('/home/professor');
                                    } else if (page === 'home') {
                                        navigate('/');
                                    } else if (page === 'Cadastrar uma Tarefa') {
                                        navigate('/cadastro/tarefas');
                                    } else if (page === 'Tarefas') {
                                        navigate('/dashboard/tarefas/aluno');
                                    } else if (page === 'Recados') {
                                        navigate('/aviso/diretor');
                                    } else if (page === 'DASHBOARD') {
                                        navigate('/dashboard/tarefas/professor');
                                    } else if (page === 'Cadastrar tarefas') {
                                        navigate('/cadastro/tarefas');
                                    } else if (page === 'HOME') {
                                        navigate('/home/aluno');
                                    } else if (page === 'Minhas tarefas') {
                                        navigate('/dashboard/tarefas/aluno');
                                    } else if (page === 'dashboard') {
                                        navigate('/dashboard/aluno');
                                    } else if (page === 'Avaliar Tarefas') {
                                        navigate('/notas/professor');
                                    }
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: 'center', alignItems: "center", gap: 10 }}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon sx={{ fontSize: 50, color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '50px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {logado && settings.map((setting, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => handleUserMenuClick(setting)}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                            {!logado && (
                                <MenuItem
                                    onClick={() => navigate('/login')} // Navega para a página de login se o usuário não estiver logado
                                >
                                    <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;

import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Home as HomeIcon } from '@material-ui/icons';
import { Link as LogOut, Modal, Card, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Cookie from 'js-cookie';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';
import API from '../api';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect, useSelector } from 'react-redux';
import {
  showModal,
  closeModal,
  showSignInModal,
  showSignUpModal,
} from '../store/actions/modalAction';
import { addKey } from '../store/actions/countAction';
import SignIn from '../view/SignIn/index';
import SignUp from '../view/SignUp/index';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const SearchAppBar = (props) => {
  const { isShowSideBar, isAdmin, key } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLogin, setIsLogin] = useState('Đăng nhập');
  const modal = useSelector((state) => state.modal);
  const [total, setTotal] = useState(props.counts.total);
  const [keyword, setkeyword] = useState('');
  const handleIsLogin = () => {
    setIsLogin('Đăng xuất');
  };

  const handleSignUp = async () => {
    if (isLogin === 'Đăng nhập') {
      props.showModal();
    } else {
    Cookie.remove('token');
      const res = await API.auth.logOut();
      console.log(res);
      localStorage.removeItem('order');
      window.location = '/';
    }
  };

  const handleShowOrders = () => {
    window.location = '/order/cart';
  };
  const handleAccount = () => {
    props.history.push('/me');
  };
  const handleSearch = async () => {
    await props.addKey(keyword);
    props.history.push(`/search/${keyword}?page=1`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await API.account.getProfile();
        if (result.status === true) {
          handleIsLogin();
        }
        if (result.data.data.role === 'ADMIN') {
          isAdmin();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const backToHome = () => {
    window.location = '/';
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleClickLogin = async () => {
    await props.showSignInModal();
  };
  const handleClickSignUp = async () => {
    await props.showSignUpModal();
  };
  const handleChange = (e) => {
    setkeyword(e.target.value);
    console.log(keyword);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => props.history.push('/order/detail')}>
        Thông tin đơn hàng
      </MenuItem>

      <MenuItem onClick={(() => handleMenuClose, handleAccount)}>
        Thông tin cá nhân
      </MenuItem>

      <MenuItem onClick={(() => handleMenuClose, handleSignUp)}>
        {' '}
        {isLogin}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  let bodyModal = '',
    colorLogIn = '',
    colorBoderLogin = '',
    colorSignUp = '',
    colorBoderSignUp = '';

  const isBody = props.modal.isBodySignIn;
  if (isBody === true) {
    bodyModal = <SignIn></SignIn>;
    colorSignUp = '';
    colorBoderSignUp = 'rgb(255, 255, 255)';
    colorLogIn = 'rgb(27, 168, 255)';
    colorBoderLogin = 'rgb(27, 168, 255)';
  } else {
    bodyModal = <SignUp></SignUp>;
    colorLogIn = '';
    colorBoderLogin = 'rgb(255, 255, 255)';
    colorSignUp = 'rgb(27, 168, 255)';
    colorBoderSignUp = 'rgb(27, 168, 255)';
  }
  return (
    <div style={{ display: 'flex' }}>
      <Modal
        open={props.modal.isOpen}
        onClose={props.closeModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            height: '80%',
            width: '60%',
            display: 'flex',
            // backgroundImage:`url(static/images/avatars/bg_modal.png)`
          }}
        >
          <div style={{ width: '40%' }}></div>
          <div style={{ width: '60%' }}>
            <Card style={{ display: 'flex', height: '6%' }}>
              <Box
                onClick={handleClickLogin}
                style={{
                  cursor: 'pointer',
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: `${colorLogIn}`,
                  borderBottom: `4px solid ${colorBoderLogin}`,
                }}
              >
                <Typography>Đăng nhập</Typography>
              </Box>
              <Box
                onClick={handleClickSignUp}
                style={{
                  width: '50%',
                  display: 'flex',
                  cursor: 'pointer',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: `${colorSignUp}`,
                  borderBottom: `4px solid ${colorBoderSignUp}`,
                }}
              >
                <Typography>Tạo tài khoản</Typography>
              </Box>
            </Card>
            {bodyModal}
          </div>
        </Card>
      </Modal>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={isShowSideBar}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            classes={classes.menuButton}
            color="inherit"
            edge="start"
            aria-label="open drawer"
            onClick={backToHome}
          >
            <HomeIcon style={{ color: 'white' }}></HomeIcon>
          </IconButton>

          <div className={classes.search}>
            <InputBase
              onChange={handleChange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
            <IconButton
              size="medium"
              onClick={handleSearch}
              style={{ color: '#fff', height: '100%', width: '100%' }}
            >
              <SearchIcon></SearchIcon>
            </IconButton>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="" color="inherit">
              <Badge badgeContent={props.counts.total} color="secondary">
                <ShoppingCartIcon onClick={handleShowOrders}></ShoppingCartIcon>
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    counts: state.counts,
    product: state.product,
    modal: state.modal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    closeModal: () => dispatch(closeModal()),
    showSignInModal: () => dispatch(showSignInModal()),
    showSignUpModal: () => dispatch(showSignUpModal()),
    addKey: (key) => dispatch(addKey(key)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchAppBar),
);

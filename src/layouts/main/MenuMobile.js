import PropTypes from "prop-types";
import {Icon} from "@iconify/react";
import {useState, useEffect} from "react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import {NavLink as RouterLink, useLocation, useNavigate} from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import {alpha, styled, useTheme} from "@mui/material/styles";
import {
  Box,
  List,
  Link,
  Drawer,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography, Grid, ListItem
} from "@mui/material";
// components
import Logo from "../../assets/km-horizontal-logo.svg";
import NavSection from "../../components/NavSection";
import Scrollbar from "../../components/Scrollbar";
import {MIconButton} from "../../components/@material-extend";
// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2.5;

const ListItemStyle = styled(ListItemButton)(({theme}) => ({
  ...theme.typography.body1,
  height: ITEM_SIZE,
  textTransform: "capitalize",
  paddingLeft: theme.spacing(PADDING),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
};

function MenuMobileItem({item, isOpen, onOpen}) {
  const {title, path, icon, children} = item;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          {/* <ListItemIcon>{icon}</ListItemIcon> */}
          <ListItemText disableTypography primary={title}/>
          <Box
            component={Icon}
            icon={isOpen ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{width: 16, height: 16, ml: 1}}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{display: "flex", flexDirection: "column-reverse"}}>
            <NavSection
              navConfig={children}
              sx={{
                "& .MuiList-root:last-of-type .MuiListItemButton-root": {
                  height: 200,
                  backgroundSize: "92%",
                  backgroundPosition: "center",
                  bgcolor: "background.neutral",
                  backgroundRepeat: "no-repeat",
                  backgroundImage:
                    "url(/static/illustrations/illustration_dashboard.png)",
                  "& > *:not(.MuiTouchRipple-root)": {display: "none"},
                },
                "& .MuiListSubheader-root": {
                  pl: PADDING,
                  display: "flex",
                  alignItems: "center",
                  "&:before": {
                    ml: "6px",
                    mr: "22px",
                    width: 8,
                    height: 2,
                    content: "''",
                    borderRadius: 2,
                    bgcolor: "currentColor",
                  },
                },
                "& .MuiListItemButton-root": {
                  pl: PADDING,
                  "&:before": {display: "none"},
                  "&.active": {color: "primary.main", bgcolor: "transparent"},
                },
                "& .MuiListItemIcon-root": {
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  "&:before": {
                    width: 4,
                    height: 4,
                    content: "''",
                    borderRadius: "50%",
                    bgcolor: "currentColor",
                  },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  if (title === "Documentation") {
    return (
      <ListItemStyle href={path} target="_blank" component={Link}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title}/>
      </ListItemStyle>
    );
  }

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      end={path === "/"}
      sx={{
        "&.active": {
          color: "primary.main",
          fontWeight: "fontWeightMedium",
          backgroundColor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
        },
      }}
    >
      {/* <ListItemIcon>{icon}</ListItemIcon> */}
      <ListItemText disableTypography primary={title}/>
    </ListItemStyle>
  );
}

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuMobile({isOffset, isHome, navConfig}) {
  const {pathname} = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const navigate = useNavigate();

  function openUrl(url) {
    window.open(url, '_blank', '')
  }

  function handleFooterLinks(url) {
    navigate(url);
    handleOpen();
  }


  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          color: "text.primary",
        }}
      >
        <Icon icon={menu2Fill}/>
      </MIconButton>

      <Drawer
        open={drawerOpen}
        anchor="right"
        onClose={handleDrawerClose}
        ModalProps={{keepMounted: true}}
        PaperProps={{sx: {pb: 3, width: 260}}}
      >
        <Scrollbar>
          <Link component={RouterLink} to="/" sx={{display: "inline-flex"}}>
            {/*<Logo sx={{ mx: PADDING, my: 3 }} />*/}
            <img src={Logo} alt="kamiranime logo"/>
          </Link>

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
              />
            ))}
          </List>
        </Scrollbar>

        <Box width="100%" px={3} pt={3} borderTop={5} borderColor={theme.palette.primary.main}>

          <Typography
            variant='h5'
            sx={{ pl: 2, py: 1 }}
            onClick={() => handleFooterLinks('/contactanos')}
            color='primary.dark'>Contactanos
          </Typography>

          <Typography
            variant='h5'
            sx={{ pl: 2, py: 2 }}
            onClick={() => handleFooterLinks('/preguntas-frecuentes')}
            color='primary.dark'>Preguntas
            frecuentes
          </Typography>

          <List>
            <ListItem>
              <Typography variant='h5' color='primary.dark'>Siguenos</Typography>
            </ListItem>
            <ListItem><Link onClick={() => openUrl('https://tiktok.com')}>Tiktok</Link></ListItem>
            <ListItem><Link onClick={() => openUrl('https://instagram.com')}>Instagram</Link></ListItem>
            <ListItem><Link onClick={() => openUrl('https://facebook.com')}>Facebook</Link></ListItem>
          </List>
          {/*<Typography variant="caption">Teléfono</Typography>*/}
          {/*<Box*/}
          {/*  sx={{*/}
          {/*    display: "flex",*/}
          {/*    alignItems: "center",*/}
          {/*    cursor: "pointer",*/}
          {/*    mt: "3px",*/}
          {/*    mb: 2,*/}
          {/*    "&:hover": { opacity: 0.7 },*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <SvgIconStyle src={`/static/icons/icon-phone.svg`} sx={{ mr: 1 }} />*/}
          {/*  <Typography variant="caption">+56 2 0000 000</Typography>*/}
          {/*</Box>*/}

          {/*<Typography variant="caption">Dirección</Typography>*/}
          {/*<Box*/}
          {/*  sx={{*/}
          {/*    display: "flex",*/}
          {/*    alignItems: "center",*/}
          {/*    cursor: "pointer",*/}
          {/*    mt: "3px",*/}
          {/*    mb: 2,*/}
          {/*    "&:hover": { opacity: 0.7 },*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <SvgIconStyle src={`/static/icons/icon-map.svg`} sx={{ mr: 1 }} />*/}
          {/*  <Typography variant="caption">Psje. Nombre ejemplo</Typography>*/}
          {/*</Box>*/}

          {/*<Typography variant="caption">LinkedIn</Typography>*/}
          {/*<Box*/}
          {/*  sx={{*/}
          {/*    display: "flex",*/}
          {/*    alignItems: "center",*/}
          {/*    cursor: "pointer",*/}
          {/*    mt: "3px",*/}
          {/*    "&:hover": { opacity: 0.7 },*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <SvgIconStyle src={`/static/icons/icon-linkedin.svg`} sx={{ mr: 1 }} />*/}
          {/*  <Typography variant="caption">/gotec</Typography>*/}
          {/*</Box>*/}
        </Box>
      </Drawer>
    </>
  );
}

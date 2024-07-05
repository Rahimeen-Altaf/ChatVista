import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "../../constants/color";
import { useNavigate } from "react-router-dom";
import { Suspense, useState, lazy } from "react";
import {
  Add as AddIcon,
  Group as GroupIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const navigate = useNavigate();

  const handleMobile = () => {
    setIsMobile(prev => !prev);
  };

  const openSearch = () => {
    setIsSearch(prev => !prev);
  };

  const openNewGroup = () => {
    setIsNewGroup(prev => !prev);
  };

  const openNotification = () => {
    setIsNotification(prev => !prev);
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };

  const logoutHandler = () => {
    console.log("logoutHandler");
  };

  return (
    <>
    <Box sx={{ flexGrow: 1 }} height={"4rem"}>
      <AppBar
        position="static"
        sx={{
          bgcolor: orange,
        }}
        >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            >
            ChatVista
          </Typography>

          <Box
            sx={{
              display: { xs: "block", sm: "none" },
            }}
            >
            <IconButton color="inherit" onClick={handleMobile}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <IconBtn title="Search" icon={<SearchIcon />} onClick={openSearch} />
            <IconBtn title="New Group" icon={<AddIcon />} onClick={openNewGroup} />
            <IconBtn title="Manage Groups" icon={<GroupIcon />} onClick={navigateToGroup} />
            <IconBtn title="Notifications" icon={<NotificationsIcon />} onClick={openNotification} />
            <IconBtn title="Logout" icon={<LogoutIcon />} onClick={logoutHandler} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

    {isSearch && (
      <Suspense fallback={<div>Loading...</div>}>
        <SearchDialog />
      </Suspense>
    )}

    {isNotification && (
      <Suspense fallback={<div>Loading...</div>}>
        <NotificationDialog />
      </Suspense>
    )}

    {isNewGroup && (
      <Suspense fallback={<div>Loading...</div>}>
        <NewGroupDialog />
      </Suspense>
    )}
</>
  );
};

// eslint-disable-next-line react/prop-types
const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;

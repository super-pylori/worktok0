// Material Dashboard 2 React layouts
import Home from "layouts/home";
import Watch from "layouts/watch";
import Recording from "layouts/recording";
import Upload from "layouts/upload";

// @mui icons
// https://mui.com/material-ui/material-icons/
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/home",
    component: <Home />,
  },
  {
    type: "collapse",
    name: "Watch",
    key: "watch",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/watch",
    component: <Watch />,
  },
  {
    type: "collapse",
    name: "Recording",
    key: "recording",
    icon: <Icon fontSize="small">videocam</Icon>,
    route: "/recording",
    component: <Recording />,
  },
  {
    type: "collapse",
    name: "Upload",
    key: "upload",
    icon: <Icon fontSize="small">upload</Icon>,
    route: "/upload",
    component: <Upload />,
  },
];

export default routes;

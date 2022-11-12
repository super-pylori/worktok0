// Material Dashboard 2 React layouts
import Upload from "layouts/upload";
import Home from "layouts/home";
import Watch from "layouts/watch";

// @mui icons
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
    name: "Upload",
    key: "upload",
    icon: <Icon fontSize="small">upload</Icon>,
    route: "/upload",
    component: <Upload />,
  },
];

export default routes;

import {
  IoHomeOutline,
  IoHome,
  IoPeopleOutline,
  IoPeople,
  IoDocumentTextOutline,
  IoDocumentText,
  IoBusinessOutline,
  IoBusiness,
} from "react-icons/io5";

export const AdminSidebarData = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <IoHomeOutline />,
    activeIcon: <IoHome />,
  },
  {
    name: "Users",
    link: "/people",
    icon: <IoPeopleOutline />,
    activeIcon: <IoPeople />,
  },
  {
    name: "Hospital",
    link: "/hospital",
    icon: <IoBusinessOutline />,
    activeIcon: <IoBusiness />,
  },
  {
    name: "Reports",
    link: "/admin-reports",
    icon: <IoDocumentTextOutline />,
    activeIcon: <IoDocumentText />,
  },
];

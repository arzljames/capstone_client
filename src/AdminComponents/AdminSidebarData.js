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

import { HiOutlineIdentification, HiIdentification } from "react-icons/hi";

export const AdminSidebarData = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <IoHomeOutline />,
    activeIcon: <IoHome />,
  },
  {
    name: "User",
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
    name: "Specialization",
    link: "/specialization",
    icon: <HiOutlineIdentification />,
    activeIcon: <HiIdentification />,
  },
  {
    name: "Report",
    link: "/admin-reports",
    icon: <IoDocumentTextOutline />,
    activeIcon: <IoDocumentText />,
  },
];

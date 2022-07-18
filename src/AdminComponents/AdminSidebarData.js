//Admin siderbar navigation data
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
    link: "/admin/dashboard",
    icon: <IoHomeOutline />,
    activeIcon: <IoHome />,
  },
  {
    name: "Doctors",
    link: "/admin/doctors",
    icon: <IoPeopleOutline />,
    activeIcon: <IoPeople />,
  },
  {
    name: "Hospital",
    link: "/admin/hospital",
    icon: <IoBusinessOutline />,
    activeIcon: <IoBusiness />,
  },
  {
    name: "Specialization",
    link: "/admin/specialization",
    icon: <HiOutlineIdentification />,
    activeIcon: <HiIdentification />,
  },
  {
    name: "Report",
    link: "/admin/report",
    icon: <IoDocumentTextOutline />,
    activeIcon: <IoDocumentText />,
  },
];

import {
  IoHomeOutline,
  IoHome,
  IoMedkitOutline,
  IoMedkit,
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoDocumentTextOutline,
  IoDocumentText,
} from "react-icons/io5";




export const SidebarData = [
  {
    name: "Dashboard",
    link: "/",
    icon: <IoHomeOutline />,
    activeIcon: <IoHome />,
  },
  {
    name: "Consult",
    link: "/consultation",
    link2: "/consultation/patients",
    link3: "/consultation/outgoing",
    link4: "/consultation/archived",
    link5: "/consultation/case",
    link6: "/consultation/archived",
    icon: <IoMedkitOutline />,
    activeIcon: <IoMedkit />,
  },

  {
    name: "Report",
    link: "/reports",
    link2: "reports",
    icon: <IoDocumentTextOutline />,
    activeIcon: <IoDocumentText />,
  },
];

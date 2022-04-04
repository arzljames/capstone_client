import {
    IoMedkitOutline,
    IoMedkit,
    IoChatbubbleEllipsesOutline,
    IoChatbubbleEllipsesSharp,
    IoAtCircleOutline,
    IoAtCircle,
  } from "react-icons/io5";
  
  export const SidebarData = [
    {
      name: "Consult" ,
      link: "/consultation",
      link2:"/consultation/patients",
      link3:"/consultation/outgoing",
      link4:"/consultation/incoming",
      link5:"/consultation/case",
      icon: <IoMedkitOutline />,
      activeIcon: <IoMedkit />,
    },
    {
      name: "Chat",
      link: "/chat",
      icon: <IoChatbubbleEllipsesOutline />,
      activeIcon: <IoChatbubbleEllipsesSharp />,
    },

    
   
  ];
  
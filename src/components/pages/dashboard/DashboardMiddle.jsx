import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import smart from "./assets/smart.png";
import dentist from "./assets/dentist.svg";
import shedule from "./assets/shedule.svg";
import opinion from "./assets/opinion.svg";
import { useNavigate } from "react-router-dom";
const DashboardMiddle = () => {
  const navigate = useNavigate();
  const tabsData = [
    {
      img: smart,
      title: "Smart Scan",
      blue: "FREE",
      detail:
        "Take photos of your mouth and teeth to instantly see any detected issues*",
      extra:
        "*For informational purposes only. Findings are not reviewed by a licensed dentist and do not constitute a dental diagnosis.",
      route: "/dashboard/smart-scan",
    },
    {
      img: dentist,
      title: "See a dentist now",
      blue: "$59",
      detail:
        "Get 24/7 care with a licensed dentist for conditions like toothaches, broken tooth, infections, and more.",
      extra: "",
      route: "/dashboard/see-dentist",
    },
    {
      img: shedule,
      title: "Schedule virtual appointment",
      blue: "$59",
      detail:
        "No rush? No problem. Select a date and time for a virtual dental visit that works for your schedule.",
      extra: "",
      route: "/dashboard/appointment-shedule",
    },
    {
      img: opinion,
      title: "Get a second opinion",
      blue: "$59",
      detail:
        " A licensed dentist will review your records and create a second opinion report.",
      extra: "",
      route: "/dashboard/instruction",
    },
  ];
  return (
    <div className=" container flex items-center justify-center flex-col w-full my-10 gap-5 p-4 h-auto">
      {tabsData.map((tab, index) => (
        <div
          key={index}
          className="flex items-center justify-center gap-2 w-full bg-white rounded-lg p-5  h-auto cursor-pointer flex-col md:flex-row"
          onClick={() => navigate(tab.route)}
        >
          <div className=" w-full flex items-center justify-start gap-2 flex-col md:flex-row">
            <img src={tab.img} alt="" className=" w-20" />
            <div className=" flex items-start justify-start flex-col  w-full  p-2">
              <p className=" text-base text-gray-600 font-bold">
                {tab.title}
                <span className=" mx-1 text-primarybg">{tab.blue}</span>
              </p>
              <p className=" text-sm text-gray-500 font-semibold">
                {tab.detail}
              </p>
              <p className=" text-xs font-semibold italic text-gray-500">
                {tab.extra && tab.extra}
              </p>
            </div>
          </div>

          <div className=" bg-primarybg  w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ">
            <ArrowForwardIosIcon
              fontSize="small"
              className=" text-white    rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMiddle;

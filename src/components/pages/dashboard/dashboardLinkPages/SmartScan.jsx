import smart from "../assets/smart.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LockIcon from "@mui/icons-material/Lock";

const SmartScan = () => {
  return (
    <div className=" flex items-start justify-start  w-full  flex-col  min-h-screen h-full  bg-[#eeeeee] px-5">
      <div className="   w-full mt-8 min-h-screen container ">
        <p className=" text-3xl font-semibold my-5">Smart Scan</p>
        <div className=" flex items-center justify-center flex-col w-full bg-white h-full gap-5 p-5 rounded-xl ">
          <img src={smart} alt="" className=" w-24" />
          <p className=" text-xl font-semibold text-primarybg w-full md:w-1/2 mx-auto leading-relaxed text-center break-words ">
            Smart Scan uses artificial intelligence to detect suspicions issues
            with your mouth and teeth.
          </p>

          {/* how works */}
          <div className=" flex items-center justify-center flex-col gap-5 w-full md:w-1/2">
            <p className=" text-xl font-semibold text-gray-700">How it works</p>
            <div className=" flex items-start justify-start flex-col w-full  gap-5 p-2">
              <div className=" flex items-center justify-center gap-2">
                <div className=" bg-[#e0c84b]  w-6 h-6 rounded-full flex items-center justify-center  ">
                  <ArrowForwardIosIcon fontSize="" className=" text-white" />
                </div>
                <p className=" text-sm font-bold text-gray-600">
                  Capture images with our guided prompts​
                </p>
              </div>
              <div className=" flex items-center justify-center gap-2">
                <div className=" bg-[#e0c84b]  w-6 h-6 rounded-full flex items-center justify-center  ">
                  <ArrowForwardIosIcon fontSize="" className=" text-white" />
                </div>
                <p className=" text-sm font-bold text-gray-600">
                  Receive a report with the Smart Scan's findings*​
                </p>
              </div>
            </div>
          </div>

          {/* lock */}
          <div className=" flex items-start justify-start w-full md:w-1/2 text-[#605fa4] gap-2">
            <LockIcon />
            <p className=" text-sm font-medium break-words ">
              <strong className=" px-2">We take your privacy seriously.</strong>
              All images are secure, confidential, and never shared with anyone.
              HIPAA Compliant
            </p>
          </div>
          <br />
          <div className=" flex items-center justify-center w-full md:w-1/2">
            <p className=" text-xs italic text-gray-500 font-semibold ">
              *For informational purposes only. Findings are not reviewed by a
              licensed dentist and do not constitute a dental diagnosis.
            </p>
          </div>
          <br />

          {/* QR code */}
          <div className=" flex items-center justify-center w-full md:w-1/2 flex-col gap-5">
            <p className=" text-xl font-semibold  text-[#605fa4]">
              You will need a phone to continue​
            </p>
            <p className=" text-sm font-semibold  text-[#605fa4]">
              Scan this QR code to open your dental.com account on your phone to
              continue with Smart Scan.​
            </p>
            <div className=" sm:w-96 sm:h-96 w-52 h-52  bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartScan;

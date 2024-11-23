import React from "react";
import { MapPin } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <div id="contact" className="flex flex-col justify-start my-10">
        <hr />
      <h1 className="text-3xl font-bold my-10">Contact</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row px-8 gap-4 items-center">
          <MapPin size={32} />
          <p>
            แจ้งวัฒนะ 14 แขวง ทุ่งสองห้อง เขต หลักสี่, Bangkok, Thailand,
            Bangkok
          </p>
        </div>
        <div className="flex flex-row px-8 gap-4 items-center">
          <Phone size={32} />
          <p>+66 85 565 1020</p>
        </div>
        <div className="flex flex-row px-8 gap-4 items-center">
          <Mail size={32} />
          <p>siamcrispyrice2013@hotmail.co.th</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

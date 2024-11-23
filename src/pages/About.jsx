import React from "react";
import wideLogo from "../assets/siamcrispyrice-logo.png";
import aboutUs from "../assets/About-us.jpg";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-start h-auto w-full">
      <h1 className="text-3xl font-bold p-8">เกี่ยวกับเรา</h1>
      <img src={wideLogo} alt="logo" className="max-w-[380px]" />
      <div className="flex flex-row justify-between my-10 gap-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-lg">
            ทำไมกระยาสารทต้องเหนียวและติดฟัน
            <br />
            เราสามารถทำให้มันกรอบและอร่อยกว่าเดิมได้มั้ย ?
          </p>
          <div className="my-10 rounded-lg border overflow-hidden">
            <iframe
              width="360"
              height="203"
              src="https://www.youtube.com/embed/zM57P7wJ-K8?si=h_wAtW_X-NExaHag"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex flex-col text-start">
            <p>
              จากความชอบทานกระยาสารท และ ความสงสัยเล็ก ๆจนนำไปสู่ ข้าวกรอบสยาม
              ข้าวไรซ์เบอรี่อบกรอบแบรนด์แรกของประเทศไทยที่นำข้าวไรซ์เบอร์รี่มาอบกรอบ
              โดยได้ไอเดียมาจาก“ขนมกระยาสารท” แต่ไม่ใช่กระยาสารท
              <br />
              <br />
              ขนมของเราทั้งกรอบ อร่อย ละลายในปาก ได้คุณประโยชน์จาก
              ข้าวไรซ์เบอร์รี่และธัญพืช แบบเต็มปากเต็มคำ !
            </p>
          </div>
        </div>
        <img
          src={aboutUs}
          alt="about-us"
          className="w-auto max-w-[380px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default About;

import React, { useState } from "react";
import banner from "../assets/banner.png";
import arma from "../assets/arma.png";
import PagePromotion from "../components/PagePromotion";
import PageNews from "../components/PageNews";

const Home = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div>
      <div className="fixed top-20 left-0 m-4">
        <ul className="flex flex-col gap-2">
          <li>
            <button
              onClick={() => handleScrollTo("information")}
              className={`text-left ${
                activeSection === "" || activeSection === "information" ? "text-red-500 font-bold" : ""
              }`}
            >
              Information
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollTo("promotion")}
              className={`text-left ${
                activeSection === "promotion" ? "text-red-500 font-bold" : ""
              }`}
            >
              Promotion
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollTo("news")}
              className={`text-left ${
                activeSection === "news" ? "text-red-500 font-bold" : ""
              }`}
            >
              News & Activities
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollTo("contact")}
              className={`text-left ${
                activeSection === "contact" ? "text-red-500 font-bold" : ""
              }`}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
      <div id="information">
        <div className="flex flex-col">
          <img src={banner} alt="" className="border-none rounded-xl" />
          <div className="flex flex-row my-10 gap-10">
            <div className="flex flex-col text-start w-1/2 py-10">
              <h1 className="text-3xl font-bold">SIAM CRISPY RICE</h1>
              <h2 className="text-xl font-bold">ขนมข้าวไรซ์เบอร์รี่อบกรอบ</h2>
              <br />
              <p>
                เปิดกล่องความสุข ประโยชน์ล้นกล่องกับ
                ขนมข้าวไรซ์เบอร์รี่อบกรอบเพราะ
                ข้าวกรอบสยามเป็นขนมดีมีประโยชน์ทำมาจากข้าวไรซ์เบอร์รี่อบกรอบ
                และธัญพืชต่าง ๆซึ่งเป็นทางเลือกใหม่ของคนรักสุขภาพการันตีความ
                กรอบ อร่อย
                แบบฉุดไม่อยู่และการจัดส่งที่แพ็คสินค้าอย่างดีเยี่ยมแน่นอนลูกค้าท่านไหนที่ยังไม่เคยลอง
                ต้องลองเลย! เพราะมื้อเช้าเป็นมื้อสำคัญ
                ที่จะต้องการพลังงานเพื่อทำกิจกรรมต่าง ๆ ในแต่ละวัน
                และหลายคนคงเบื่อกับมื้อเช้าที่จำเจ จะดีกว่ามั้ย ? หากมีตัวช่วยดี
                ๆ อย่าง ข้าวกรอบสยาม ขนมข้าวไรซ์เบอร์รี่
                ขนมทางเลือกใหม่ของคนรักสุขภาพ ที่มีส่วนผสมหลัก
                เป็นข้าวไรซ์เบอร์รี่แท้ และปรุงรสด้วยธัญพืชต่าง ๆ
                ที่จะช่วยเสริมสร้างพลังงาน ให้กับคุณได้มีแรง ทำกิจกรรมต่าง ๆ
                ได้ตลอดทั้งวัน
              </p>
            </div>
            <div className="py-20 flex justify-center items-center w-1/2">
              <img src={arma} alt="" className="w-max h-auto" />
            </div>
          </div>
        </div>
      </div>
      <div id="promotion">
        <PagePromotion />
      </div>
      <div id="news">
        <PageNews />
      </div>
    </div>
  );
};

export default Home;

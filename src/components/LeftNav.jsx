import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constant";
import { Context } from "../context/contextApi";
import "./scrollbar.css";
const LeftNav = () => {
  const { selectedCategory, setSelectedCategory, mobileMenu, setMobileMenu } =
    useContext(Context);

  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    setMobileMenu(isMobile);
  }, []);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };
  // React.Fragment is nothing but an empty fragment that works as a parent
  return (
    <div
      className={`${
        isMobile && mobileMenu ? "block" : "hidden"
      } md:block w-[240px] overflow-y-auto h-full scrollbar-none py-4 bg-[#58287F] absolute md:relative z-10 transition-all ${
        mobileMenu ? "translate-x-0" : "-translate-x-240"
      }`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
                className={`${
                  selectedCategory === item.name ? "bg-white/[0.15]" : ""
                }`}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">
          &#169; : Prakash Singh
        </div>
      </div>
    </div>
  );
};

export default LeftNav;

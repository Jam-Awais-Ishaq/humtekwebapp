import LoginForm from "./LoginForm";
import Register from "./Register";
import formImg from "../../assets/form1.jpg";
import Modal from "../common/Modal";
import ForgetWrapper from "./ForgetWrapper";
import { useState } from "react";
const MainForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div
          className="
          relative 
          w-full 
          max-w-6xl 
          h-[90vh] 
          bg-white 
          shadow-xl 
          rounded-xl
          overflow-hidden 
          flex 
          flex-col 
          lg:flex-row
        "
        >
          <div className="relative w-full lg:w-1/2 overflow-hidden min-h-[500px]">
            <div
              className={`absolute inset-0 p-6 sm:p-8 transition-transform duration-700 ${isLogin ? "translate-x-0" : "-translate-x-full"
                }`}>
              <LoginForm setOpenModal={setOpenModal} switchToRegister={() => setIsLogin(false)} />
            </div>
            <div
              className={`absolute inset-0 p-6 sm:p-8 transition-transform duration-700 ${isLogin ? "translate-x-full" : "translate-x-0"
                }`}
            >
              <Register switchToLogin={() => setIsLogin(true)} />
            </div>
          </div>
          <div
            className="
            relative 
            hidden 
            lg:flex 
            w-1/2 
            bg-cover 
            bg-center
          "
            style={{ backgroundImage: `url(${formImg})` }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <h1 className="text-5xl xl:text-6xl font-bold tracking-wide">
                {isLogin ? "LOGIN" : "REGISTER"}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ForgetWrapper onCloseModal={() => setOpenModal(false)} />
      </Modal>
    </>
  );
};
export default MainForm;
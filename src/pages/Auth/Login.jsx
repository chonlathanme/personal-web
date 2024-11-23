import React from "react";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Register from "./Register";
import { BackArrowIcon } from "../../icons";

const Login = () => {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    identity: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlLogin = async (e) => {
    e.preventDefault();
    try {
      if (!input.identity.trim() || !input.password.trim()) {
        return toast.info("Please fill in all fields");
      }
      const result = await login(input);
      toast.success("Login success");
      navigate("/");
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      console.log(errMessage);
      toast.error(errMessage);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-start p-6 min-h-auto">
        <div className="flex items-center mb-4">
          <a
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-500 transition"
          >
            <BackArrowIcon className="w-8 h-8 mr-2" />
            <p className="text-lg font-semibold">BACK</p>
          </a>
        </div>

        <div className="flex justify-center items-center mb-4">
          <div className="flex flex-row w-full justify-around">
            <div className="w-[400px] h-auto flex flex-col justify-arounded p-8">
              <div className="flex flex-col justify-center items-center py-10 gap-6">
                <h1 className="text-3xl font-bold">Create an account here</h1>
                <h1>Signing up for free so you can save your favorites</h1>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-warning hover:text-white"
                onClick={() =>
                  document.getElementById("register-modal").showModal()
                }
              >
                Create new account
              </button>
            </div>
            <div className="divider divider-horizontal m-0"></div>
            <div className="w-[400px] h-auto flex flex-col justify-center p-8">
              <div className="flex flex-col">
                <div className="flex flex-col justify-center items-center py-10 gap-6">
                  <h1 className="text-3xl text-center font-bold">
                    Already have account ?
                  </h1>
                  <h1 className="text-xl font-bold">Log in</h1>
                </div>
                <form onSubmit={hdlLogin}>
                  <div className="flex flex-col items-center gap-4">
                    <input
                      type="text"
                      placeholder="E-mail or Phone number"
                      className="input input-bordered bg-transparent w-full"
                      name="identity"
                      value={input.identity}
                      onChange={hdlChange}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered bg-transparent w-full"
                      name="password"
                      value={input.password}
                      onChange={hdlChange}
                    />
                    <button className="btn bg-transparent w-full text-black hover:bg-gray-100">
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <dialog id="register-modal" className="modal">
            <div className="modal-box bg-gradient-to-r from-yellow-100 to-orange-200 rounded-lg shadow-lg">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={(e) => e.target.closest("dialog").close()}
              >
                <p className="text-black">✕</p>
              </button>
              <Register />
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Login;

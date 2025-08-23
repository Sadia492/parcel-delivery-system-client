import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import img from "@/assets/11518583_4776675-removebg-preview.png";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            to="/"
            className="flex text-primary items-center gap-2 font-medium"
          >
            <div className=" ">
              <Logo />
            </div>
            ParcelGuru
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted hidden lg:flex items-center justify-center">
        <img
          src={img}
          alt="Image"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}

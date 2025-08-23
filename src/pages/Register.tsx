import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import img from "@/assets/11522841_4757693-removebg-preview.png";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo";
export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted hidden lg:flex items-center justify-center">
        <img
          src={img}
          alt="Image"
          className="max-w-full max-h-full object-contain"
        />
      </div>
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
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

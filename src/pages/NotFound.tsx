
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#190038]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-purple-200 mb-4">عفواً، الصفحة غير موجودة</p>
        <a href="/" className="text-pink-400 hover:text-pink-300 underline">
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
};

export default NotFound;

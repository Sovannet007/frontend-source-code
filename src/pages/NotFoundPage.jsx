import { ArrowRightOutlined, HomeOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Large stylized 404 background text */}
        <div className="relative">
          <h1 className="text-9xl font-black text-slate-200 select-none">
            404
          </h1>
          <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-800 mt-8">
            Oops! Page not found
          </p>
        </div>

        <p className="mt-6 text-slate-600 leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-sm font-medium"
          >
            <ArrowRightOutlined />
            Go Back
          </button>

          <a
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-100 font-medium"
          >
            <HomeOutlined />
            Back to Home
          </a>
        </div>

        {/* Minimal Footer Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-400">
            Lost? Check our{" "}
            <a href="/help" className="text-indigo-500 hover:underline">
              Help Center
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

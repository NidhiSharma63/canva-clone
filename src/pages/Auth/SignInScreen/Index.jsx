import { EyeClosed, EyeIcon, Loader } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";
import { v4 } from "uuid";
import useAuth from "../../../api/queries/useAuth";
import { validateEmail, validatePassword } from "../../../utils/validateFields";

export default function SignIn() {
  const uniqueBrowserId = useMemo(() => v4(), []);

  const { useSigninQuery } = useAuth();
  const { mutateAsync: login } = useSigninQuery(uniqueBrowserId);
  const [isLoading, setIsLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    uniqueBrowserId,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  // single handler for all input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      if (validateEmail(value)) {
        setFormErrors((prev) => ({
          ...prev,
          email: "",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          email: "Invalid Email Address",
        }));
      }
    }

    if (name === "password") {
      if (validatePassword(value)) {
        setFormErrors((prev) => ({
          ...prev,
          password: "",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          password:
            "Password must be at least 5 chars & include a special character",
        }));
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Form Submitted:", formData);

      if (!validateEmail(formData.email)) {
        setFormErrors((prev) => ({
          ...prev,
          email: "Invalid Email Address",
        }));
        return;
      } else {
        setFormErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }

      if (!validatePassword(formData.password)) {
        setFormErrors((prev) => ({
          ...prev,
          password:
            "Password must be at least 5 chars & include a special character",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          password: "",
        }));
      }

      try {
        setIsLoading(true);
        await login(formData);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, setFormErrors]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPw ? <EyeIcon /> : <EyeClosed />}
            </button>
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>
        </div>

        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
          >
            Save
          </button>
        )}

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

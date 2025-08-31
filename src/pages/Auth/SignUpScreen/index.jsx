import { EyeClosed, EyeIcon, Loader } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";
import { v4 } from "uuid";
import useAuth from "../../../api/queries/useAuth";
import { validateEmail, validatePassword } from "../../../utils/validateFields";
const SignUp = () => {
  const { useSignupQuery } = useAuth();
  const uniqueBrowserId = useMemo(() => v4(), []);
  const { mutateAsync: signUp } = useSignupQuery(uniqueBrowserId);
  const [isLoading, setIsLoading] = useState(false);
  // ek hi object for all form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    uniqueBrowserId,
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

    if (name === "username") {
      if (value.length >= 3) {
        setFormErrors((prev) => ({
          ...prev,
          username: "",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          username: "Username must be at least 3 chars",
        }));
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Form Submitted:", formData);
      if (validateEmail(formData.email)) {
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

      if (validatePassword(formData.password)) {
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

      if (formData.username.length >= 3) {
        setFormErrors((prev) => ({
          ...prev,
          username: "",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          username: "Username must be at least 3 chars",
        }));
      }
      try {
        setIsLoading(true);
        await signUp(formData);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, signUp]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? <EyeIcon /> : <EyeClosed />}
              </button>
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          )}
        </form>

        {/* Already have account */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

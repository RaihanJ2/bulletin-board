import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/forgot-password`, { email });
      Swal.fire({
        title: "Link Sent!",
        text: "Link reset password telah dikirim ke email Anda.",
        icon: "success",
        confirmButtonColor: "#f97316",
      });
      setEmail("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to send reset link",
        icon: "error",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <span className="text-3xl font-bold text-orange-500">MyArticle</span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-orange-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                className="mt-1 block w-full rounded-lg border border-orange-300 bg-gray-50 text-gray-900
                           focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500
                           px-3 py-2 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm
                           text-sm font-medium text-white bg-orange-500 hover:bg-orange-600
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                           transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-orange-500 hover:text-orange-600"
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

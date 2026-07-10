import { Link } from "react-router-dom";
import batlogo from "../assets/batlogo.png";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#181818] p-10">

        {/* Logo */}

        <div className="flex flex-col items-center mb-10">
          <img
            src={batlogo}
            alt="BatmanTV Logo"
            className="w-20 h-20 object-contain"
          />

          <h1 className="mt-5 text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-zinc-400">
            Join BatmanTV and start sharing videos
          </p>
        </div>

        <form className="space-y-6">

          {/* Full Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-zinc-700 bg-[#121212] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-red-600"
            />
          </div>

          {/* Username */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
              className="w-full rounded-xl border border-zinc-700 bg-[#121212] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-red-600"
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-zinc-700 bg-[#121212] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-red-600"
            />
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-xl border border-zinc-700 bg-[#121212] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-red-600"
            />
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-xl border border-zinc-700 bg-[#121212] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-red-600"
            />
          </div>

          {/* Avatar */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Avatar
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-zinc-700 bg-[#121212] px-4 py-3 text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-700 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-red-700"
            />
          </div>

          {/* Cover Image */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Cover Image (Optional)
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-zinc-700 bg-[#121212] px-4 py-3 text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-700
               file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-red-700"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full rounded-xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-700"
          >
            Create Account
          </button>

        </form>

        <p className="mt-8 text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-red-500 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
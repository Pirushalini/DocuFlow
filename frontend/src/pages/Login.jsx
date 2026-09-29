function Login() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A6A6] text-2xl font-bold text-white shadow-lg shadow-slate-200/50">
            D
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#123B5D]">
            DocuFlow
          </h1>

          <p className="mt-2 text-sm text-[#263238]">
            AI-Powered Document & Workflow Management
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-8 shadow-xl shadow-slate-200/50">

          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-[#123B5D]">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-[#263238]">
              Sign in to continue to your account
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-[#263238]">
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#D9E2E8] bg-white px-4 py-3
              text-sm text-[#263238] outline-none transition
              placeholder:text-[#263238]
              focus:border-[#1677B8]
              focus:ring-4 focus:ring-[#3FA9D9]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-[#263238]">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-[#1677B8] hover:text-[#3FA9D9]"
              >
                Forgot password?
              </button>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#D9E2E8] bg-white px-4 py-3
              text-sm text-[#263238] outline-none transition
              placeholder:text-[#263238]
              focus:border-[#1677B8]
              focus:ring-4 focus:ring-[#3FA9D9]"
            />
          </div>

          {/* Sign In */}
          <button
            type="button"
            className="w-full rounded-lg bg-[#1677B8] px-4 py-3
            text-sm font-semibold text-white
            shadow-sm transition
            hover:bg-[#3FA9D9]
            hover:shadow-md
            focus:outline-none
            focus:ring-4
            focus:ring-[#3FA9D9]"
          >
            Sign In
          </button>

          {/* Footer */}
          <div className="mt-6 border-t border-[#D9E2E8] pt-5 text-center">
            <p className="text-xs text-[#263238]">
              Secure document management for modern teams
            </p>
          </div>

        </div>

        <p className="mt-6 text-center text-xs text-[#263238]">
          ©️ 2026 DocuFlow. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default Login;
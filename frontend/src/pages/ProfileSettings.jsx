import { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Save,
  KeyRound,
} from "lucide-react";

function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState("Pavee");
  const [lastName, setLastName] = useState("Piru");
  const [email, setEmail] = useState("test@example.com");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      alert("Please enter your first name and last name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    setIsEditing(false);

    alert("Profile updated successfully.");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!currentPassword.trim()) {
      alert("Please enter your current password.");
      return;
    }

    if (!newPassword.trim()) {
      alert("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    alert("Password changed successfully.");
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#123B5D]">
          Profile & Settings
        </h1>

        <p className="mt-1 text-sm text-[#6B7280]">
          Manage your profile information and account settings.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="rounded-2xl border border-[#D9E2E8] bg-white shadow-sm">

        <div className="border-b border-[#D9E2E8] p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00A6A6] text-2xl font-bold text-white">
              P
            </div>

            {/* User Information */}
            <div className="flex-1">

              <h2 className="text-lg font-semibold text-[#123B5D]">
                {firstName} {lastName}
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                {email}
              </p>

              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#1677B8]">
                <Shield size={13} />
                Employee
              </div>

            </div>

            {/* Edit Button */}
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg border border-[#D9E2E8]
                bg-white px-4 py-2.5 text-sm font-semibold
                text-[#263238] transition hover:bg-[#F4F7F9]"
              >
                Edit Profile
              </button>
            )}

          </div>

        </div>

        {/* Profile Information */}
        <form
          onSubmit={handleSaveProfile}
          className="p-6"
        >

          <div className="mb-5">

            <h3 className="text-base font-semibold text-[#123B5D]">
              Personal Information
            </h3>

            <p className="mt-1 text-sm text-[#6B7280]">
              Update your personal account information.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* First Name */}
            <div>

              <label
                htmlFor="first-name"
                className="text-sm font-medium text-[#263238]"
              >
                First Name
              </label>

              <div className="relative mt-2">

                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />

                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  disabled={!isEditing}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`w-full rounded-lg border border-[#D9E2E8]
                  py-2.5 pl-10 pr-3 text-sm text-[#263238]
                  outline-none transition ${
                    isEditing
                      ? "bg-white focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
                      : "cursor-not-allowed bg-[#F4F7F9]"
                  }`}
                />

              </div>

            </div>

            {/* Last Name */}
            <div>

              <label
                htmlFor="last-name"
                className="text-sm font-medium text-[#263238]"
              >
                Last Name
              </label>

              <div className="relative mt-2">

                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />

                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  disabled={!isEditing}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`w-full rounded-lg border border-[#D9E2E8]
                  py-2.5 pl-10 pr-3 text-sm text-[#263238]
                  outline-none transition ${
                    isEditing
                      ? "bg-white focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
                      : "cursor-not-allowed bg-[#F4F7F9]"
                  }`}
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="text-sm font-medium text-[#263238]"
              >
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-lg border border-[#D9E2E8]
                  py-2.5 pl-10 pr-3 text-sm text-[#263238]
                  outline-none transition ${
                    isEditing
                      ? "bg-white focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
                      : "cursor-not-allowed bg-[#F4F7F9]"
                  }`}
                />

              </div>

            </div>

            {/* Role */}
            <div>

              <label
                htmlFor="role"
                className="text-sm font-medium text-[#263238]"
              >
                Role
              </label>

              <div className="relative mt-2">

                <Shield
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />

                <input
                  id="role"
                  type="text"
                  value="Employee"
                  disabled
                  className="w-full cursor-not-allowed rounded-lg
                  border border-[#D9E2E8] bg-[#F4F7F9]
                  py-2.5 pl-10 pr-3 text-sm text-[#263238]"
                />

              </div>

            </div>

          </div>

          {/* Edit Actions */}
          {isEditing && (
            <div className="mt-6 flex gap-3">

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg
                bg-[#1677B8] px-4 py-2.5
                text-sm font-semibold text-white
                transition hover:bg-[#3FA9D9]"
              >
                <Save size={17} />
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg border border-[#D9E2E8]
                bg-white px-4 py-2.5 text-sm font-medium
                text-[#263238] transition hover:bg-[#F4F7F9]"
              >
                Cancel
              </button>

            </div>
          )}

        </form>

      </div>

      {/* Change Password */}
      <div className="rounded-2xl border border-[#D9E2E8] bg-white shadow-sm">

        <div className="border-b border-[#D9E2E8] p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF6FB] text-[#1677B8]">
              <KeyRound size={20} />
            </div>

            <div>

              <h2 className="text-base font-semibold text-[#123B5D]">
                Change Password
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                Update your password to keep your account secure.
              </p>

            </div>

          </div>

        </div>

        <form
          onSubmit={handleChangePassword}
          className="space-y-5 p-6"
        >

          {/* Current Password */}
          <div>

            <label
              htmlFor="current-password"
              className="text-sm font-medium text-[#263238]"
            >
              Current Password
            </label>

            <div className="relative mt-2">

              <Lock
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
              />

              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-[#D9E2E8]
                bg-white py-2.5 pl-10 pr-11 text-sm text-[#263238]
                outline-none transition
                focus:border-[#1677B8]
                focus:ring-2 focus:ring-[#1677B8]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(!showCurrentPassword)
                }
                className="absolute right-3 top-1/2
                -translate-y-1/2 text-[#6B7280]
                hover:text-[#123B5D]"
              >
                {showCurrentPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}
          <div>

            <label
              htmlFor="new-password"
              className="text-sm font-medium text-[#263238]"
            >
              New Password
            </label>

            <div className="relative mt-2">

              <Lock
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
              />

              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-[#D9E2E8]
                bg-white py-2.5 pl-10 pr-11 text-sm text-[#263238]
                outline-none transition
                focus:border-[#1677B8]
                focus:ring-2 focus:ring-[#1677B8]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(!showNewPassword)
                }
                className="absolute right-3 top-1/2
                -translate-y-1/2 text-[#6B7280]
                hover:text-[#123B5D]"
              >
                {showNewPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

            <p className="mt-1.5 text-xs text-[#6B7280]">
              Password must be at least 8 characters.
            </p>

          </div>

          {/* Confirm Password */}
          <div>

            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-[#263238]"
            >
              Confirm New Password
            </label>

            <div className="relative mt-2">

              <Lock
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
              />

              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-[#D9E2E8]
                bg-white py-2.5 pl-10 pr-11 text-sm text-[#263238]
                outline-none transition
                focus:border-[#1677B8]
                focus:ring-2 focus:ring-[#1677B8]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2
                -translate-y-1/2 text-[#6B7280]
                hover:text-[#123B5D]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          {/* Change Password Button */}
          <div className="pt-2">

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg
              bg-[#00A6A6] px-4 py-2.5
              text-sm font-semibold text-white
              transition hover:bg-[#087F8C]"
            >
              <KeyRound size={17} />
              Change Password
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProfileSettings;

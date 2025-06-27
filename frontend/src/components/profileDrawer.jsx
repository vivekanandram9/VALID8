import React from "react";

const ProfileDrawer = ({
  isOpen,
  onClose,
  username = "random02",
  email = "random02@gmail.com",
  onLogout = () => {},
}) => {
  return (
    <>
      {/* Hazy backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 inset-x-0 md:bottom-0 md:ml-auto md:w-[400px] h-auto max-h-screen  md:h-full z-50 bg-white  text-black  border   transition-transform transform ${
          isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full delay-300"
        }`}
      >
        {/* Drag handle on mobile */}
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-zinc-300 dark:bg-zinc-700 md:hidden" />

        <div className="w-full max-w-sm mx-auto px-8 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 text-[20px]">
            <h2 className="text-lg font-semibold">Profile</h2>
            <button
              onClick={onClose}
              className="text-sm px-3 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              ✕
            </button>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative shrink-0">
              <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><mask id=":Rgbfnlb:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:Rgbfnlb:)"><rect width="36" height="36" fill="#ff005b"></rect><rect x="0" y="0" width="36" height="36" transform="translate(0 0) rotate(324 18 18) scale(1)" fill="#ffb238" rx="36"></rect><g transform="translate(-4 -4) rotate(-4 18 18)"><path d="M15 19c2 1 4 1 6 0" stroke="#000000" fill="none" strokeLinecap="round"></path><rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
              <div className="absolute bottom-2 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white "></div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{username}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">{email}</p>
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />

          {/* Action Buttons */}
          <div className="space-y-2 text-sm">
            {[
              { label: "Change Name", icon: "user-cog" },
              { label: "Change Email", icon: "mail-search" },
              { label: "Change Password", icon: "lock-keyhole-open" },
              { label: "Progress", icon: "arrow-up-right" },
              { label: "Compare with friends", icon: "repeat" },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="w-full flex items-center justify-between p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 inline-block">{/* icon placeholder */}🔧</span>
                  <span>{label}</span>
                </div>
              </button>
            ))}

            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-between p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg transition text-red-600"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 inline-block">🚪</span>
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;

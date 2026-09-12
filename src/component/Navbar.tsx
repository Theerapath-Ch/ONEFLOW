"use client";

import { Blocks } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const user = session?.user;
  const initial = (user?.name?.[0] ?? user?.email?.[0] ?? "?").toUpperCase();

  return (
    <header className="mx-auto flex max-w-[1180px] items-center justify-between px-8 py-4">
      <Link href="/" className="flex items-center gap-1.5">
        <div className="relative flex h-[31px] w-[31px] justify-center">
          <Blocks size={28} strokeWidth={2} className="text-white" />
        </div>
        <span className="text-[20px] font-semibold tracking-[-0.03em] text-white">ONEFLOW</span>
      </Link>

      <div className="flex items-center gap-[18px]">
        {status === "loading" ? (
          <div className="h-8 w-[96px] animate-pulse rounded-[5px] bg-white/10" />
        ) : user ? (
          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.08] py-1 pl-1 pr-3 transition hover:bg-white/[0.12]"
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={user.name ?? "avatar"} className="h-7 w-7 rounded-full object-cover" />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF8067] text-[12px] font-bold text-[#151216]">
                  {initial}
                </span>
              )}
              <span className="max-w-[120px] truncate text-[12px] font-semibold text-white">
                {user.name ?? user.email}
              </span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-[12px] border border-white/[0.08] bg-[rgba(36,36,38,0.96)] shadow-[0_14px_40px_rgba(0,0,0,0.4)] backdrop-blur">
                <div className="px-4 py-3">
                  <p className="truncate text-[12px] font-semibold text-white">{user.name ?? "User"}</p>
                  <p className="truncate text-[11px] text-[#9A9AA1]">{user.email}</p>
                </div>
                <div className="border-t border-white/[0.08]" />
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full cursor-pointer px-4 py-2.5 text-left text-[12px] font-semibold text-[#FF6670] transition hover:bg-white/[0.06]"
                >
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="cursor-pointer rounded-[5px] bg-[#FF8067] px-[17px] py-2 text-[11px] font-bold text-[#151216] transition hover:bg-[#ff927d]"
          >
            Sign In/Up
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;

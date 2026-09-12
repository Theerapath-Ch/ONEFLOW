"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Blocks } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || data.details ? JSON.stringify(data.details) : "สมัครไม่สำเร็จ");
        setLoading(false);
        return;
      }
      // auto sign-in after register
      const signRes = await signIn("credentials", { email, password, redirect: false });
      setLoading(false);
      if (signRes?.error) {
        router.push("/login");
        return;
      }
      router.push("/");
    } catch {
      setError("เกิดข้อผิดพลาด ลองใหม่");
      setLoading(false);
    }
  }

  async function handleGoogle() {
    await signIn("google", { callbackUrl: "/" });
  }

  return (
    <div className="w-full max-w-[420px] rounded-[16px] border border-white/[0.08] bg-[rgba(36,36,38,0.82)] p-8 shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8067]">
          <Blocks size={22} className="text-[#151216]" />
        </div>
        <h1 className="text-[22px] font-bold tracking-[-0.03em] text-white">สมัครสมาชิก</h1>
        <p className="text-[12px] text-[#9A9AA1]">สร้างบัญชี Oneflow ของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.04em] text-[#D5D5D9]">ชื่อ</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อของคุณ"
            required
            minLength={2}
            className="h-10 w-full rounded-[8px] border border-white/[0.12] bg-white/[0.06] px-3 text-[13px] text-white outline-none placeholder:text-[#77777F] focus:border-[#FF8067]/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.04em] text-[#D5D5D9]">อีเมล</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="h-10 w-full rounded-[8px] border border-white/[0.12] bg-white/[0.06] px-3 text-[13px] text-white outline-none placeholder:text-[#77777F] focus:border-[#FF8067]/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.04em] text-[#D5D5D9]">รหัสผ่าน</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="อย่างน้อย 8 ตัว มีตัวอักษร+ตัวเลข"
            required
            minLength={8}
            className="h-10 w-full rounded-[8px] border border-white/[0.12] bg-white/[0.06] px-3 text-[13px] text-white outline-none placeholder:text-[#77777F] focus:border-[#FF8067]/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.04em] text-[#D5D5D9]">ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="h-10 w-full rounded-[8px] border border-white/[0.12] bg-white/[0.06] px-3 text-[13px] text-white outline-none placeholder:text-[#77777F] focus:border-[#FF8067]/60"
          />
        </div>

        {error && <p className="rounded-[8px] bg-[#FF6670]/10 px-3 py-2 text-[12px] text-[#FF6670]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex h-10 w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#FF8067] text-[13px] font-bold text-[#151216] transition hover:bg-[#ff927d] disabled:opacity-60"
        >
          {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-[11px] tracking-[0.06em] text-[#77777F]">หรือ</span>
        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      <button
        onClick={handleGoogle}
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-white/[0.12] bg-white text-[13px] font-semibold text-[#151216] transition hover:bg-[#f5f5f7]"
      >
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3A12.3 12.3 0 0 1 24 36a12 12 0 0 1 0-24 11.1 11.1 0 0 1 7.7 3l6-6A18.9 18.9 0 0 0 24 4 20 20 0 0 0 4.7 31.5l7.1 5.5A12 12 0 0 1 24 36"/><path fill="#FF3D00" d="M6.3 14.7l7.1 5.5A12 12 0 0 1 24 12a11.1 11.1 0 0 1 7.7 3l6-6A18.9 18.9 0 0 0 6.3 14.7z"/><path fill="#4CAF50" d="M24 44a20 20 0 0 0 17.3-10l-7.1-5.5A12 12 0 0 1 24 36a12 12 0 0 1-12.4-8.8l-7.1 5.5A20 20 0 0 0 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12.3 12.3 0 0 1-1.2 3.1l7.1 5.5A20 20 0 0 0 44 24a19 19 0 0 0-.4-3.5z"/></svg>
        Continue with Google
      </button>

      <p className="mt-6 text-center text-[12px] text-[#9A9AA1]">
        มีบัญชีแล้ว?{" "}
        <Link href="/login" className="font-semibold text-[#FF8067] hover:text-[#ff927d]">
          เข้าสู่ระบบ
        </Link>
      </p>
    </div>
  );
}

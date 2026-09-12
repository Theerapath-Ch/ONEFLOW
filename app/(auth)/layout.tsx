export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg flex min-h-screen flex-col bg-[#070809]">
      <div className="flex flex-1 items-center justify-center px-6 py-12">{children}</div>
    </div>
  );
}

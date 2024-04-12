import NavMenu from "@/components/NavMenu";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex bg-secondary">
      <NavMenu />
      {children}
    </div>
  );
}

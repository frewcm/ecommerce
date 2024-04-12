import Nav from "@/components/Nav";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex-grow">
      <Nav />
      {children}
    </div>
  );
}

import Navbar from "./ui/Navbar";
import Slider from "./ui/Slider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex">
      <Slider />
      <div className="flex flex-col flex-1 min-h-screen w-full p-2">
        <Navbar />
        <div className="flex-1 w-full h-full">{children}</div>
      </div>
    </main>
  );
};

export default Layout;

import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="sticky top-0 bg-purple-400 border-b rounded-b-xl">
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-3">
          <Logo />
        </div>
      </div>
    </div>
  );
};

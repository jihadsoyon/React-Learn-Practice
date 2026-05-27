import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">⚡ Mini Redux</h1>

      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
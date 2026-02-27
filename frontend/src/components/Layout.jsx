import { Link, NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/plp', 'PLP'],
  ['/cart', 'Cart'],
  ['/checkout', 'Checkout'],
  ['/login', 'Login'],
  ['/register', 'Register'],
  ['/account', 'My Account'],
];

export function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="logo">
          ANE Commerce
        </Link>
        <nav>
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}



import Link from 'next/link';
import { logout } from "@/utils/auth"
const Header = ({ user }) => {  
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p>About</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p>Contact</p>
            </Link>
          </li>
          <li>
            {user?.userName ? <a href="/">
              <form action={logout}> <input type="submit" value="logout" /> </form>
            </a> :
            <>
              <Link href="/signup">
                <p>Sign Up</p>
              </Link>
              <Link href="/login">
                <p>login</p>
              </Link>
            </>
            }
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
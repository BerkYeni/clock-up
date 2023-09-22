import { FC } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const NavbarButton: FC<{ content: string; link: string }> = ({
  content,
  link,
}) => {
  return (
    <Link to={link !== "" ? `/${link}/` : "/"}>
      <div className="p-1 text-zinc-200">{content}</div>
    </Link>
  );
};

const Root: FC = () => {
  return (
    <div className="h-screen bg-zinc-900">
      <nav className="box-border flex justify-around absolute left-0 right-0 bottom-0 bg-zinc-700">
        <NavbarButton content="MANAGE" link="manage" />
        <NavbarButton content="HOME" link="" />
        <NavbarButton content="STATISTICS" link="statistics" />
      </nav>
      <Outlet />
    </div>

    // example code for reference
    // <>
    //   <div id="sidebar">
    //     <h1>React Router Contacts</h1>
    //     <div>
    //       <form id="search-form" role="search">
    //         <input
    //           id="q"
    //           aria-label="Search contacts"
    //           placeholder="Search"
    //           type="search"
    //           name="q"
    //         />
    //         <div id="search-spinner" aria-hidden hidden={true} />
    //         <div className="sr-only" aria-live="polite"></div>
    //       </form>
    //       <form method="post">
    //         <button type="submit">New</button>
    //       </form>
    //     </div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to={`/contacts/1`}>Your Name</Link>
    //         </li>
    //         <li>
    //           <Link to={`/contacts/2`}>Your Friend</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    //   <div id="detail">
    //     <Outlet />
    //   </div>
    // </>
  );
};

export default Root;

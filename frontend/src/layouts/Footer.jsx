import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-primary text-white p-10">
      <div className="footer container mx-auto sm:footer-horizontal">
        <aside>
          <Link className="text-3xl pb-2 font-semibold text-white">
            Growseer
          </Link>
          <p>© {new Date().getFullYear()} Growseer. All rights reserved.</p>
        </aside>
        <nav>
          <h3 className="text-lg font-semibold text-white">Services</h3>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h3 className="text-lg font-semibold text-white">Company</h3>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h3 className="text-lg font-semibold text-white">Legal</h3>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </div>
  );
};

export default Footer;

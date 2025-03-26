import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-primary text-white p-10 mt-10">
      <div className="footer container mx-auto sm:footer-horizontal">
        <aside>
          <Link className="text-3xl pb-2 font-semibold text-white">
            Growseer
          </Link>
          <p>© 2025 Growseer. All rights reserved.</p>
        </aside>
        <nav>
          <h3 className="text-lg font-semibold text-white">Profil</h3>
          <a className="link link-hover">Profil Saya</a>
        </nav>
        <nav>
          <h3 className="text-lg font-semibold text-white">Pesanan</h3>
          <a className="link link-hover">Pesanan Saya</a>
        </nav>
        <nav>
          <h3 className="text-lg font-semibold text-white">Keranjang</h3>
          <a className="link link-hover">Lihat Keranjang</a>
        </nav>
      </div>
    </div>
  );
};

export default Footer;

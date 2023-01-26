import config from "@config/config.json";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ src, name }) => {
  // destructuring items from config object
  const { base_url, logo, logo_width, logo_height, logo_text, title } =
    config.site;

  return (
    <Link
      href={base_url}
      className="navbar-brand inline-flex items-center py-1"
      style={{
        height: logo_height.replace("px", "") + "px",
        width: logo_width.replace("px", "") + "px",
      }}
    >
      {src || logo ? (
        <Image
          width={logo_width.replace("px", "") * 2}
          height={logo_height.replace("px", "") * 2}
          src={src ? src : logo}
          alt={title}
          priority
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
      {" "}
      <h5>{name}</h5>
    </Link>
  );
};

export default Logo;

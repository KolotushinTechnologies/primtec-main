import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

function Cta({ cta }) {
  return (
    <section className="section px-4" style={{ paddingTop: "0px" }}>
      <div className="section container rounded-xl shadow">
        <div className="row  mx-auto items-center justify-center">
          <div
            className="mt-5 text-center md:mt-0 md:text-left md:col-6 lg:col-5"
            // style={{
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            // }}
          >
            <h2>{cta?.title}</h2>
            {cta.button.enable && (
              <Link
                className="btn btn-primary mt-4"
                href={cta.button.link}
                rel={cta.button.rel}
              >
                {cta.button.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;

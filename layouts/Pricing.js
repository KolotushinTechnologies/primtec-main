import Link from "next/link";
import Cta from "./components/Cta";
import Image from "next/image";

function Pricing({ data }) {
  const {
    frontmatter: { title, plans, call_to_action },
  } = data;
  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">{title}</h1>
          <div className="section row -mt-10 justify-center md:mt-0">
            {plans.map((plan, index) => (
              <div
                className={`col-12 md:col-4 col-recommended p-3`}
                style={{ margin: "0" }}
                key={plan.title + index}
              >
                <div className="card text-center">
                  <Image src={plan.image} alt="" width={200} height={200} />
                  <h4 className="text-dark">{plan.title}</h4>
                  <div className="mt-5">
                    <span className="text-5xl text-dark">{plan.price}&#8381;</span>
                    <span>/ {plan.count}</span>
                  </div>
                  <h5 className="mt-2 font-normal text-text">
                    {plan.subtitle}
                  </h5>
                  <ul className="mt-5">
                    {plan.features.map((feature, index) => (
                      <li className="mb-[10px] leading-5" key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    className={`btn mt-5 btn-primary`}
                    href={plan.button.link}
                    rel={plan.button.rel}
                  >
                    {plan.button.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
}

export default Pricing;

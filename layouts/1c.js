import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import { parseMDX } from "@lib/utils/mdxParser";
import shortcodes from "@shortcodes/all";
import Image from "next/image";
import Base from "@layouts/Baseof";
import { getSinglePage } from "../lib/contentParser";

const OneCPage = ({ frontmatter }) => {
  const { title, image } = frontmatter;

  return (
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="col-12 mx-auto text-center md:col-8">
              {image && (
                <Image
                  src={image}
                  height="500"
                  width="1000"
                  alt={title}
                  priority={true}
                  layout="responsive"
                  className="rounded-lg"
                />
              )}
              {markdownify(title, "h1", "h2 mb-6 mt-6 text-left")}

              <div className="content mb-16 text-left">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </article>
          </div>
        </div>
      </section>

  );
};

export default OneCPage;

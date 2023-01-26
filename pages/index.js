import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { getListPage, getSinglePage } from "../lib/contentParser";

import PaginationHome from "@components/Pagination";
import Posts from "@partials/Posts";
import { parseMDX } from "@lib/utils/mdxParser";

const { blog_folder } = config.settings;

const Home = ({ frontmatter, postIndex, posts, currentPage, pagination, nameCity }) => {
  const { banner, feature_main, feature, services_button, services, workflow, call_to_action } = frontmatter;
  const { title } = config.site;

  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // const { frontmatter, content } = postIndex;

  return (
    <Base title={title}>
      {/* Banner */}
      <section className="section pb-[80px] pt-[80px]">
        <div className="container">
          <div className="row text-center">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Поиск"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style={{
                  borderRadius: "20px"
                }}
              />
            </div>
            <div className={`service-carousel ${"md:order-2"}`}>
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={
                  services_button[0].images.length > 1 ? { clickable: true } : false
                }
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                init={services_button[0]?.images > 1 ? false : true}
              >
                {/* Slides */}
                {services_button[0]?.images.map((slide, index) => (
                  <SwiperSlide style={{ display: "flex", justifyContent: "center" }} key={index}>
                    <Image src={slide} alt="" width={1200} height={400} style={{ heigth: "auto", borderRadius: "20px" }} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          {/* Features Main */}
          <div
            className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-2"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, 170px)",
              gridColumnGap: "10px",
              gridAutoRows: "136px"
            }}
          >
            {feature_main.features.map((item, i) => (
              <div
                className="btn btn-secondary feature-card rounded-xl bg-primary p-5 pb-8 text-center cursor-pointer text-white"
                style={{
                  // display: "grid",
                  boxSizing: "border-box",
                  padding: "10px",
                  float: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // // flexWrap: "wrap",
                  flexDirection: "column",
                  backgroundColor: item.name == "Внедрение 1С" && "#ffdd00" || item.name == "CRM Битрикс24" && "#21bbef",
                }}
                key={`feature-${i}`}
              >
                <Link
                  href={
                    item.name == "Внедрение 1С" ? `/1c`
                    :
                    item.name == "CRM Битрикс24" ? `/bitrix` : "/"
                  }
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon && (
                    <Image
                      className=""
                      src={item.icon}
                      width={150}
                      height={150}
                      alt=""
                    />
                  )}
                  <div className="">
                    {markdownify(item.name, "h3", item.name == "Внедрение 1С" ? "h5 text-1c" : "h5 text-white")}
                    <p className="mt-3 text-white">{item.content}</p>
                  </div>
                </Link>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cta */}
      <Cta cta={call_to_action} />

      <section className="section px-4 section-primary-background">
        <div className="container">
          <div
            className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-2"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(1, 80px)",
              gridColumnGap: "10px",
              gridAutoRows: "136px"
            }}
          >
            <div
              className="btn btn-secondary feature-card rounded-xl bg-primary p-5 pb-8 text-center cursor-pointer text-white"
              style={{
                boxSizing: "border-box",
                padding: "10px",
                float: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "#00b760",
                backgroundImage: "url(/images/whatsapp.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="">
                <p className="mt-3 text-black">What&apos;s App</p>
              </div>
            </div>
            <div
              className="btn btn-secondary feature-card rounded-xl bg-primary p-5 pb-8 text-center cursor-pointer text-white"
              style={{
                boxSizing: "border-box",
                padding: "10px",
                float: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "#1bb5ff",
              }}
            >
              <div className="">
                <p className="mt-3 text-white">Позвонить</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="section px-4 section-primary-background">
        <div className="container">
          <div
            className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-2"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(1, 80px)",
              gridColumnGap: "10px",
              gridAutoRows: "136px"
            }}
          >
            <div
              className="btn btn-secondary feature-card rounded-xl bg-primary p-5 pb-8 text-center cursor-pointer text-white"
              style={{
                boxSizing: "border-box",
                padding: "10px",
                float: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "#ff1d1d",
              }}
            >
              <div className="">
                <p className="mt-3 text-white">YouTube</p>
              </div>
            </div>
            <div
              className="btn btn-secondary feature-card rounded-xl bg-primary p-5 pb-8 text-center cursor-pointer text-white"
              style={{
                boxSizing: "border-box",
                padding: "10px",
                float: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "#005db7",
              }}
            >
              <div className="">
                <p className="mt-3 text-white">VK</p>
              </div>
            </div>
            <div
              className="btn btn-secondary feature-card rounded-xl bg-primary p-5 pb-8 text-center cursor-pointer text-white"
              style={{
                boxSizing: "border-box",
                padding: "10px",
                float: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "#ff18ba",
              }}
            >
              <div className="">
                <p className="mt-3 text-white">Instagram</p>
              </div>
            </div>
          </div>
        </div>

      </section>


      <section className="section">
        <div className="container">
          <h1 className="text-center">Новостной Блог</h1>
          <Posts posts={currentPosts} />
          <PaginationHome
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default Home;

// get blog pagination content
export const getStaticProps = async ({ params }) => {


  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;

  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const posts = getSinglePage(`content/${blog_folder}`).sort(
    (post1, post2) =>
      new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date)
  );
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);
  const mdxContent = await parseMDX(postIndex.content);

  return {
    props: {
      pagination: pagination,
      posts: posts,
      currentPage: currentPage,
      postIndex: postIndex,
      mdxContent: mdxContent,
      frontmatter,
    },
  };
};

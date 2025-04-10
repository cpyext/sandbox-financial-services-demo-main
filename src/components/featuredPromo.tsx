import { Image } from "@yext/pages-components";
import Cta from "./cta";

const FeaturedPromo = ({ promo }: { promo: any }) => {
  return (
    <section className="flex flex-col md:h-[400px] md:flex-row md:justify-between gap-4 md:gap-16">
      <Image
        image={promo[0].c_backgroundImage}
        className="w-full md:!w-1/2 max-w-none"
      />
      <article className="flex flex-col w-full md:w-1/2 gap-8">
        <h2 className="text-2xl md:text-4xl font-bold">Featured Promotion</h2>
        <p>{promo[0].description}</p>
        <nav className="flex flex-col md:flex-row gap-4">
          <Cta
            otherStyles="px-6 py-2"
            ctaType="secondaryCta"
            cta={{ label: `Learn more`, linkType: "URL", link: "#" }}
          />
        </nav>
        <section className="flex gap-4">
          <img
            className="w-[119px] h-10"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/2560px-Download_on_the_App_Store_RGB_blk.svg.png"
            alt=""
          />
          <img
            className="w-[119px] h-10"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
            alt=""
          />
        </section>
      </article>
    </section>
  );
};

export default FeaturedPromo;

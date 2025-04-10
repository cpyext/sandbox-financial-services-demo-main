/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static HTML page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/pageLayout";
import { Image } from "@yext/pages-components";
import Cta from "../components/cta";
import Blogs from "../components/relatedSections/Blogs";
import ScrollToTop from "../components/scrollToTop";
import StarRating from "../components/starRating";
import ThreeGridLayout from "../components/relatedSections/threeGridLayout";
import ReviewsComponent, {
  ReviewResponse,
} from "../components/ReviewsComponent";
import ProfessionalSchema from "../components/schemas/ProfessionalSchema";
import { Favicon } from "../assets/images";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import FeaturedPromo from "../components/featuredPromo";
import { IoWarningOutline } from "react-icons/io5";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-professional",
    fields: [
      "id",
      "uid",
      "slug",
      "name",
      "address",
      "mainPhone",
      "c_primaryCTA",
      "c_relatedBlogs.name",
      "c_relatedBlogs.bodyV2",
      "c_relatedBlogs.shortDescriptionV2",
      "c_relatedBlogs.primaryPhoto",
      "c_relatedBlogs.c_author",
      "c_relatedBlogs.datePosted",
      "c_relatedBlogs.slug",
      "c_educationDetails",
      "c_professionalRecord",
      "description",
      "emails",
      "headshot",
      "yearsOfExperience",
      "languages",
      "certifications",
      "yextDisplayCoordinate",
      "specialities",
      "hours",
      "c_relatedLocations.name",
      "c_relatedLocations.slug",
      "c_relatedLocations.address",
      "c_relatedLocations.mainPhone",
      "c_relatedLocations.hours",
      "c_relatedLocations.yextDisplayCoordinate",
      "c_relatedLocations.meta",
      "timezone",
      "c_relatedProducts.id",
      "c_relatedProducts.c_shortDescriptionV2",
      "c_relatedProducts.primaryPhoto",
      "c_relatedProducts.slug",
      "c_relatedProducts.name",
      "c_relatedPromo.id",
      "c_relatedPromo.name",
      "c_relatedPromo.c_backgroundImage",
      "c_relatedPromo.description",
      "c_firstPartyUrl",
      "c_jobTitle",
      "c_notificationBanner",
    ],
    filter: {
      entityTypes: ["financialProfessional"],
      savedFilterIds: ["1396278582"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

/**
 * This is the main template component. The props passed in here are the direct stream document defined by `config`.
 */
const Professional: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const _cpy = document;

  const {
    name,
    address,
    mainPhone,
    description,
    slug,
    c_primaryCTA,
    c_relatedBlogs,
    c_educationDetails,
    c_professionalRecord,
    emails,
    headshot,
    yearsOfExperience,
    _site,
    languages,
    certifications,
    specialities,
    yextDisplayCoordinate,
    hours,
    id,
    c_relatedLocations,
    __meta,
    c_relatedProducts,
    c_relatedPromo,
    timezone,
    c_firstPartyUrl,
    c_jobTitle,
    c_notificationBanner,
  } = document;

  const professionalLocations = [
    {
      address: address,
      hours: hours,
      mainPhone: mainPhone,
      name: address.city,
      yextDisplayCoordinate: yextDisplayCoordinate,
      slug: "#",
    },
    ...(Array.isArray(c_relatedLocations)
      ? c_relatedLocations
      : [c_relatedLocations]),
  ];

  const email =
    (emails && emails.length >= 1 && emails[0]) || `contact@contact.com`;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<ReviewResponse | null>(null);

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/ProfessionalReviews/${id}?offset=0`);
        const resp: ReviewResponse = await response.json();
        setReviewData(resp);
      } catch (error) {
        console.error(`Error fetching user data: ${JSON.stringify(error)}`);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, []);

  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      <ProfessionalSchema document={_cpy} />
      {c_notificationBanner && c_notificationBanner.showBanner ? (
        <section
          className="w-full"
          style={{ background: c_notificationBanner.backgroundColor }}
        >
          <article className="centered-container !py-0">
            <p
              className="flex text-base  items-center  h-20 md:h-14 my-auto"
              style={{ color: c_notificationBanner.textColor }}
            >
              <IoWarningOutline className="h-6 w-6 md:h-4 md:w-4 mr-4" />
              {c_notificationBanner.bannerText}
            </p>
          </article>
        </section>
      ) : (
        <hr className="my-4" />
      )}{" "}
      <section className="centered-container flex flex-col md:h-[500px] md:flex-row md:justify-between gap-4 md:gap-0">
        <article className="flex flex-col w-full md:w-1/2 gap-3 md:gap-4">
          <h1 className="text-2xl md:text-5xl font-bold">{name}</h1>
          <p className="text-lg md:text-xl font-medium italic">{c_jobTitle}</p>
          <span className="flex items-center gap-2">
            <p className="font-bold">
              {reviewData?.response.averageRating.toFixed(2)}
            </p>
            <span className="gap-0.5 flex">
              <StarRating
                selectedStars={reviewData?.response.averageRating.toFixed(2)}
              />
            </span>
            <span className="font-normal">
              ({reviewData?.response.count} reviews)
            </span>
            <a href="#reviewsSection" className="underline md:ml-4 font-medium">
              View Reviews
            </a>
          </span>
          <p>{description}</p>
          <nav className="flex flex-col md:flex-row gap-4">
            <Cta
              ctaType="secondaryCta"
              cta={{ label: "Book appointment", linkType: "URL", link: "" }}
              hours={hours}
              name={name}
              otherStyles="border-2 font-bold px-4"
              isBookAnAppointment={true}
            />
          </nav>
        </article>
        <Image
          image={headshot}
          className="!aspect-square w-full md:!w-1/3 rounded-lg max-w-none !my-0"
        />
      </section>
      <section className="bg-accent">
        <section className="centered-container">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Professional Details
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
            <article className="flex flex-col gap-4">
              <section className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Experience</h3>
                <p>{yearsOfExperience} Years</p>
              </section>
              {c_educationDetails && (
                <section className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">Education Details</h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {c_educationDetails.map((item: any, index: number) => (
                      <li key={index}>
                        {item.degree} - {item.university}, {item.year}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {languages && (
                <section className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">Languages</h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {languages.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
            <article className="flex flex-col gap-4">
              {certifications && (
                <section className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">
                    Licenses and Certifications
                  </h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {certifications.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
              {specialities && (
                <section className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">Specialities</h3>
                  <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                    {specialities.map((item: string[], index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
            <article className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">Professional Journey</h3>
              <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                {c_professionalRecord.map((item: any, index: number) => (
                  <li key={index}>
                    {item.position}
                    {item.organisation ? ` - ${item.organisation}` : ""},{" "}
                    {item.startYear && item.startYear}
                    {item.endYear && ` - ${item.endYear}`}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </section>
      </section>
      <section className="centered-container">
        <FeaturedPromo promo={c_relatedPromo} />
      </section>
      <section className="bg-accent">
        <ThreeGridLayout
          titleAlignment="center"
          title={`Featured Products`}
          relatedItems={c_relatedProducts}
          ctaCount={1}
        />
      </section>
      <section className="centered-container md:space-y-16" id="reviewsSection">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {reviewData && (
              <>
                <header className=" space-y-2 text-center">
                  <h2 className="text-2xl md:text-4xl font-bold">
                    Recent Reviews
                  </h2>
                  <span className="flex items-center justify-center gap-2">
                    <p className="font-bold">
                      {reviewData?.response.averageRating.toFixed(2)}
                    </p>
                    <span className="gap-0.5 flex">
                      <StarRating
                        selectedStars={reviewData?.response.averageRating}
                      />
                    </span>
                    <span className="font-normal">
                      ({reviewData?.response.count} reviews)
                    </span>
                  </span>
                </header>

                <ReviewsComponent
                  reviewUrl={c_firstPartyUrl}
                  id={id}
                  reviewResponse={reviewData}
                  totalCount={reviewData.response.count}
                />
              </>
            )}
          </>
        )}
      </section>
      <section className="bg-accent">
        <Blogs
          linkedArticles={c_relatedBlogs}
          parentEntityName={name}
          title={"Insights"}
        />
      </section>
      <ThreeGridLayout
        titleAlignment="center"
        title={`My Locations`}
        relatedItems={professionalLocations}
      />
      <ScrollToTop />
    </PageLayout>
  );
};

export default Professional;

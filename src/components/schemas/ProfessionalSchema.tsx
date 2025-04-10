import { JsonLd } from "react-schemaorg";
import { FinancialService, BlogPosting, BreadcrumbList } from "schema-dts";

const ProfessionalSchema = ({ document }: any) => {
  const name = document.name;
  const description = document.description;
  const telephone = document.mainPhone;
  const email = document.emails?.[0] || "";
  const profileImage = document.headshot?.url || "";
  const specialities = document.specialities || [];
  const certifications = document.certifications || [];
  const services = document.c_servicesOffered || [];

  const workLocations: any = [];
  if (document.c_relatedLocations) {
    document.c_relatedLocations.forEach((location: any) => {
      workLocations.push({
        "@type": "Place",
        name: location.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.address.line1,
          addressLocality: location.address.city,
          addressRegion: location.address.region,
          postalCode: location.address.postalCode,
          addressCountry: location.address.countryCode,
        },
        telephone: location.mainPhone || "",
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.yextDisplayCoordinate?.latitude || "",
          longitude: location.yextDisplayCoordinate?.longitude || "",
        },
        openingHoursSpecification: document.hours
          ? buildHoursSchema(document.hours)
          : "Mo-Fr 09:00-17:00",
      });
    });
  }

  const featuredProducts: any = [];
  if (document.c_relatedProducts) {
    document.c_relatedProducts.forEach((product: any) => {
      featuredProducts.push({
        "@type": "FinancialProduct",
        name: product.name,
        description:
          product.c_shortDescriptionV2?.json?.root?.children[0]?.children[0]
            ?.text || "",
        url: `/${product.slug}`,
        image: product.primaryPhoto?.image?.url || "",
      });
    });
  }

  const serviceOffers: any = services.map((service: any) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.description || "",
    },
  }));

  const credentialsList = certifications.map((cert: any) => ({
    "@type": "EducationalOccupationalCredential",
    name: cert,
  }));

  const educationList: any = [];
  const experienceList: any = [];

  if (document.c_educationDetails) {
    document.c_educationDetails.forEach((edu: any) => {
      educationList.push({
        "@type": "EducationalOrganization",
        name: edu.university,
      });

      credentialsList.push({
        "@type": "EducationalOccupationalCredential",
        name: edu.degree,
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: edu.university,
        },
      });
    });
  }

  if (document.c_professionalRecord) {
    document.c_professionalRecord.forEach((exp: any) => {
      experienceList.push({
        "@type": "OrganizationRole",
        roleName: exp.position,
        startDate: exp.startYear,
        endDate: exp.endYear || undefined,
        namedPosition: exp.position,
        name: exp.organisation || "Self-Employed",
      });
    });
  }

  return (
    <>
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "All Locations",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: document.address.region,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: document.address.city,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: document.address.line1,
            },
          ],
        }}
      />
      <JsonLd<FinancialService>
        item={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: name,
          description: description,
          logo: profileImage,
          image: profileImage,
          telephone: telephone,
          email: email,
          areaServed: "US",
          address: {
            "@type": "PostalAddress",
            streetAddress: document.address.line1,
            addressLocality: document.address.city,
            addressRegion: document.address.region,
            postalCode: document.address.postalCode,
            addressCountry: document.address.countryCode,
          },
          location: workLocations,
          hasCredential: credentialsList,
          knowsAbout: specialities,
          makesOffer: serviceOffers,
          ...(featuredProducts.length > 0 && {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Featured Financial Products",
              itemListElement: featuredProducts,
            },
          }),
          employee: {
            "@type": "Person",
            jobTitle: document.c_jobTitle,
            alumniOf: educationList,
            hasOccupation: experienceList,
          },
        }}
      />

      {document.c_relatedBlogs &&
        document.c_relatedBlogs.map((blog: any, index: number) => (
          <JsonLd<BlogPosting>
            key={index}
            item={{
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.name,
              description:
                blog.shortDescriptionV2?.json?.root?.children[0]?.children[0]
                  ?.text || "",
              datePublished: blog.datePosted,
              author: {
                "@type": "Person",
                name: blog.c_author || name,
              },
              image: blog.primaryPhoto?.image?.url || "",
              url: `/${blog.slug}`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `/${blog.slug}`,
              },
              publisher: {
                "@type": "Organization",
                name: "Parkside Financial Services",
                logo: {
                  "@type": "ImageObject",
                  url: "https://a.mktgcdn.com/p/7ujH3tWAsjMN4TgeoCJ6ASlIQgbJRF-TJqE5TNHcG-w/1500x629.png",
                },
              },
            }}
          />
        ))}
    </>
  );
};

const buildHoursSchema = (hoursData: any) => {
  const nHrs: any = [];
  Object.keys(hoursData).forEach((day) => {
    if (hoursData[day].openIntervals) {
      nHrs.push(
        `${day.substring(0, 2).replace(/./, (c) => c.toUpperCase())} ${
          hoursData[day].openIntervals[0].start
        }-${hoursData[day].openIntervals[0].end}`
      );
    }
  });
  return nHrs;
};

export default ProfessionalSchema;

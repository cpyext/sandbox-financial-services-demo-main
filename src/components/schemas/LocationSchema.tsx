import { JsonLd } from "react-schemaorg";
import { BankOrCreditUnion, Place, FAQPage, BreadcrumbList } from "schema-dts";

const Schema = (props: any) => {
  const { document } = props;
  const name = `${document.name} in ${document.address.city}, ${document.address.region}`;
  const address = document.address;
  const telephone = document.mainPhone;
  const description = document.description;

  const itemListElement: any = [];
  if (document.services) {
    document.services.forEach((item: any) => {
      itemListElement.push({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      });
    });
  }
  if (document.c_locationServices) {
    document.c_locationServices.forEach((item: any) => {
      itemListElement.push({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.name,
        },
      });
    });
  }

  const productList: any = [];
  if (document.c_relatedProducts) {
    document.c_relatedProducts.forEach((product: any) => {
      productList.push({
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

  const faqsList: any = [];
  if (document.frequentlyAskedQuestions) {
    document.frequentlyAskedQuestions.forEach((faq: any) => {
      faqsList.push({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      });
    });
  }

  const employeeList: any = [];
  if (document.c_relatedProfessionals) {
    document.c_relatedProfessionals.forEach((professional: any) => {
      employeeList.push({
        "@type": "Person",
        name: professional.name,
        jobTitle: "Financial Advisor",
        email: professional.emails?.[0] || "",
        telephone: professional.mainPhone || "",
        image: professional.headshot?.url || "",
      });
    });
  }

  const eventsList: any = [];
  if (document.c_relatedEvents) {
    document.c_relatedEvents.forEach((event: any) => {
      eventsList.push({
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        description: event.description,
        startDate: event.time.start,
        endDate: event.time.end,
        image: event.photoGallery?.[0]?.image?.url || "",
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
      <JsonLd<BankOrCreditUnion>
        item={{
          "@context": "https://schema.org",
          "@type": "BankOrCreditUnion",
          name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          description: description,
          openingHours: document.hours
            ? buildHoursSchema(document.hours)
            : "Mo-Fr 09:00-17:00",
          telephone: telephone,
          paymentAccepted: "Cash, Credit Card, Debit Card, Mobile Payments",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Banking Services",
            itemListElement: itemListElement,
          },
          makesOffer: {
            "@type": "Offer",
            name: "Financial Products",
            itemOffered: productList,
          },
          numberOfEmployees:
            employeeList.length > 0 ? employeeList.length : undefined,
          employee: employeeList.length > 0 ? employeeList : undefined,
          event: eventsList.length > 0 ? eventsList : undefined,
        }}
      />
      {document.yextDisplayCoordinate && (
        <JsonLd<Place>
          item={{
            "@context": "https://schema.org",
            "@type": "Place",
            geo: {
              "@type": "GeoCoordinates",
              latitude: document.yextDisplayCoordinate.latitude,
              longitude: document.yextDisplayCoordinate.longitude,
            },
          }}
        />
      )}
      {faqsList.length > 0 && (
        <JsonLd<FAQPage>
          item={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqsList,
          }}
        />
      )}
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

export default Schema;

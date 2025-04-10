import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const ProfessionalReviews = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { method, pathParams, queryParams } = request;

  const { id } = pathParams;
  const { offset } = queryParams;
  try {
    const fetchReviews = await fetch(
      `https://api.yextapis.com/v2/accounts/me/reviews?api_key=${YEXT_PUBLIC_REVIEWS_KEY}&v=20210505&entityIds=${id}&offset=${offset}`
    );
    const resp = await fetchReviews.json();

    return {
      body: JSON.stringify(resp),
      headers: {},
      statusCode: 200,
    };
  } catch (err) {
    return {
      body: JSON.stringify({ error: "Internal Server Error" }),
      headers: { "Content-Type": "application/json" },
      statusCode: 500,
    };
  }
};

export default ProfessionalReviews;

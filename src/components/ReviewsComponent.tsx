import { useEffect, useState } from "react";
import StarRating from "./starRating";
import Loader from "./Loader";
import Pagination from "./Pagination";

export interface ReviewResponse {
  meta: Meta;
  response: Response;
}

export interface Meta {
  uuid: string;
  errors: any[];
}

export interface Response {
  reviews: Review[];
  nextPageToken: string;
  averageRating: number;
  count: number;
}

export interface Review {
  id: number;
  rating: number;
  content: string;
  authorName: string;
  authorEmail: string;
  url: string;
  publisherDate: number;
  locationId: string;
  accountId: string;
  publisherId: string;
  title: string;
  lastYextUpdateTime: number;
  comments: any[];
  status: string;
  externalId: string;
  flagStatus: string;
  reviewLanguage: string;
  apiIdentifier: string;
}

interface ReviewsComponentProps {
  id: string;
  reviewResponse: ReviewResponse;
  totalCount: number;
  reviewUrl: string;
}

const ReviewsComponent = ({
  id,
  reviewResponse,
  totalCount,
  reviewUrl,
}: ReviewsComponentProps) => {
  const totalPages = Math.ceil(totalCount / 10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<ReviewResponse | null>(
    reviewResponse
  );
  const [page, setPage] = useState<number>(1);

  const getOffsetCount = (page: number) => {
    return (page - 1) * 10;
  };

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/ProfessionalReviews/${id}?offset=${getOffsetCount(page)}&limit=10`
        );
        const resp: ReviewResponse = await response.json();
        setReviewData(resp);
      } catch (error) {
        console.error(`Error fetching user data: ${JSON.stringify(error)}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) getReviews();
  }, [id, page]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {reviewData && !reviewData?.meta?.errors?.length && (
            <>
              <a
                href={`${reviewUrl}`}
                className="!mt-4 !-mb-8 group justify-center rounded-full font-bold border-2 py-2 px-6 border-secondary mx-auto flex gap-1 items-center relative hover:cursor-pointer text-secondary w-full md:w-fit"
              >
                <div
                  className="rounded-full absolute inset-0 w-0 bg-secondary transition-all duration-300 ease-out group-hover:w-full"
                  aria-label="overlay"
                ></div>
                <span className="relative text-secondary group-hover:text-white">
                  Leave review
                </span>
              </a>
              {Array.isArray(reviewData?.response?.reviews) && (
                <section className="divide-y divide-gray-200 border-b border-t border-gray-200">
                  {reviewData.response.reviews.map((review) => (
                    <article
                      key={review.id}
                      className="py-6 md:py-4 lg:grid lg:grid-cols-12 lg:gap-x-8"
                    >
                      <div className="flex flex-col md:flex-row md:items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3 ">
                        <p className="font-medium ">{review.authorName}</p>
                        <time
                          dateTime={new Date(
                            review.publisherDate
                          ).toLocaleDateString()}
                          className="md:ml-4 md:border-l border-gray-200 md:pl-4 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                        >
                          {new Date(review.publisherDate).toLocaleDateString()}
                        </time>
                      </div>
                      <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4  xl:gap-x-8">
                        <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0 space-y-2">
                          <span className="flex items-center gap-2">
                            <p className="font-bold">{review.rating}</p>
                            <span className="gap-0.5 flex">
                              <StarRating selectedStars={review.rating} />
                            </span>
                          </span>

                          <div className="mt-3 space-y-6 text-sm">
                            {review.content}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}

                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    clickedPage={setPage}
                  />
                </section>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ReviewsComponent;

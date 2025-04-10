import { useSearchState } from "@yext/search-headless-react";
import { GenerativeDirectAnswer } from "@yext/search-ui-react";

const GenDAComponent = () => {
  const isGenALoading = useSearchState(
    (state) => state.generativeDirectAnswer.isLoading
  );
  const query = useSearchState((state) => state.query.input);
  return (
    <>
      {query && (
        <>
          {isGenALoading && (
            <section
              className="p-6 my-8 border border-gray-200 rounded-lg shadow-sm centered-container"
              aria-busy="true"
              aria-label="Loading content"
            >
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div
                    className="h-4 bg-slate-700 rounded w-1/4"
                    aria-hidden="true"
                  ></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className="h-2 bg-slate-700 rounded col-span-3"
                        aria-hidden="true"
                      ></div>
                      <div
                        className="h-2 bg-slate-700 rounded col-span-3"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div
                      className="h-2 bg-slate-700 rounded"
                      aria-hidden="true"
                    ></div>
                    <div
                      className="h-2 bg-slate-700 rounded"
                      aria-hidden="true"
                    ></div>
                    <div
                      className="h-2 bg-slate-700 rounded"
                      aria-hidden="true"
                    ></div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <GenerativeDirectAnswer customCssClasses={{ container: "my-8" }} />
        </>
      )}
    </>
  );
};

export default GenDAComponent;

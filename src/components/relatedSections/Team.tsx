import { Image, ImageType } from "@yext/pages-components";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { format_phone } from "../../utils/reusableFunctions";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface PersonProps {
  name: string;
  slug: string;
  headshot: ImageType;
  datePosted: string;
  shortDescriptionV2: any;
  bodyV2: any;
  id?: string;
  mainPhone?: string;
  emails?: string;
}
interface TeamProps {
  people: PersonProps[];
  parentEntityName?: string;
  title?: string;
}
const Team = ({
  people,
  parentEntityName,
  title = "Meet Our Team",
}: TeamProps) => {
  return (
    <article className="centered-container bg-primary">
      <h2
        id="Our-team-title"
        className="text-2xl md:text-4xl font-bold text-left md:text-center "
      >
        {title}
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full"
      >
        {people.map((person) => (
          <li
            key={person.name}
            className="flex flex-col items-center rounded-lg bg-primary shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)]"
          >
            <article className="mx-auto p-6 md:p-8 flex gap-4 items-center">
              {person.headshot && (
                <Image
                  loading="lazy"
                  image={person.headshot}
                  className="rounded-full !w-20 !h-20 max-w-none"
                />
              )}
              <a href={`/${person.slug}`} className="focus:outline-none">
                <span aria-hidden="true" className=" inset-0" />
                <p className="text-xl md:text-2xl font-medium">{person.name}</p>
                <p>Associate Agent</p>
              </a>
            </article>
            <hr className="w-full " />
            <article className="flex flex-col p-6 md:p-8 gap-4">
              <span className="flex gap-2 items-center">
                <HiOutlinePhone className="h-4 w-4 text-secondary" />
                <p>{format_phone(person?.mainPhone || "0000000000")}</p>
              </span>

              <span className="flex gap-2 items-center decoration-2 underline-offset-4  underline text-secondary font-bold">
                <HiOutlineMail className="h-4 w-4" /> <p>{person.emails}</p>
              </span>
              <a
                href={`/${person.slug}`}
                className="group text-secondary font-bold transition duration-300 w-fit"
              >
                <span className="flex items-center">
                  Visit Profile
                  <ChevronRightIcon className="h-4 w-4 text-secondary" />
                </span>
                <span className="block w-0 group-hover:w-full transition-all duration-500 h-0.5 bg-secondary"></span>
              </a>
            </article>
          </li>
        ))}
      </ul>
      <a
        href={`/search.html?vertical=financial-professionals&query=${parentEntityName || ""}`}
        className="group justify-center rounded-full border-2 py-2 px-6 border-secondary mx-auto flex gap-1 items-center bg-secondary relative hover:cursor-pointer text-primary font-bold w-full md:w-fit"
      >
        <div
          className="rounded-full absolute inset-0 w-0 bg-primary border-secondary transition-all duration-300 ease-out group-hover:w-full"
          aria-label="overlay"
        ></div>
        <span className="relative text-primary group-hover:text-secondary">
          See All Professionals
        </span>
      </a>
    </article>
  );
};

export default Team;

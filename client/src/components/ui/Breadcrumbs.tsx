import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Customlink from "./CustomLink";

type BreadcrumbsProps = {
  pages: { name: string; href: string; current: boolean }[];
};

export default function Breadcrumbs({ pages }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="hidden sm:flex sm:items-center space-x-4">
        <li>
          <div className="flex items-center">
            <Customlink
              to="/dashboard"
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Dashboard</span>
            </Customlink>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {page.current ? (
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {page.name}
                </span>
              ) : (
                <Customlink
                  to={page.href}
                  className="ml-4 text-sm font-medium text-indigo-500 hover:text-indigo-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </Customlink>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

"use client";

import {
  PaginationWithLinks,
  type PaginationWithLinksProps,
} from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";

const defaultProps: PaginationWithLinksProps = {
  page: 1,
  totalCount: 500,
  pageSize: 20,
};

export default function Pagination({
  title,
  ...rest
}: Partial<PaginationWithLinksProps> & { title?: string }) {
  const searchParams = useSearchParams();
  const page = rest.page || Number.parseInt(searchParams.get("page") || "1");
  const pageSize =
    rest.pageSize ||
    Number.parseInt(
      searchParams.get(
        rest.pageSizeSelectOptions?.pageSizeSearchParam || "pageSize",
      ) || "10",
    );
  return (
    <div>
      {title && (
        <h4 className="mb-3 text-sm font-medium tracking-wide">{title}</h4>
      )}
      <PaginationWithLinks
        {...defaultProps}
        page={page}
        pageSize={pageSize}
        {...rest}
      />
    </div>
  );
}

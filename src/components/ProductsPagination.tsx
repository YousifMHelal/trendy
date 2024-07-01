import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductsPagination = ({
  hasPrev,
  page,
  hasNext,
}: {
  hasPrev: boolean;
  page: number;
  hasNext: boolean;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {hasPrev && (
          <>
            <PaginationItem>
              <PaginationPrevious href={`?page=${page - 1}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=${page - 1}`}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {hasNext && (
          <>
            <PaginationItem>
              <PaginationLink href={`?page=${page + 1}`}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ProductsPagination;

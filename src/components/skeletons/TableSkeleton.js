import { Skeleton, Stack } from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <Stack w="96vw" maxWidth="1300px" m="0 auto" spacing={2.5}>
      <Skeleton height="1.25em" />
      <Skeleton height="1.25em" />
      <Skeleton height="1.25em" />
      <Skeleton height="1.25em" />
      <Skeleton height="1.25em" />
      <Skeleton height="1.25em" />
    </Stack>
  );
};
export default TableSkeleton;

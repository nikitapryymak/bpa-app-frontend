import { Skeleton, Stack } from "@chakra-ui/react";

const CardSkeleton = ({ cards = 1 }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <Stack
        borderWidth="2px"
        borderColor="brand.hoverBg"
        borderRadius="lg"
        p="1rem"
        mb="1rem"
        key={i}
      >
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ));
};
export default CardSkeleton;

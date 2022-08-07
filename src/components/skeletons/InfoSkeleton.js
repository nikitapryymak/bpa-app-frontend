import { Container, Skeleton, Stack } from "@chakra-ui/react";

const InfoSkeleton = () => {
  return (
    <Container maxWidth="1300px" mt="10rem" align="left">
      <Stack w="100%" maxWidth="1300px" m="0 auto" spacing={3}>
        <Skeleton height="1.25em" w="25%" />
        <Skeleton height="1.25em" w="25%" />
        <Skeleton height="1.25em" w="100%" />
        <Skeleton height="1.25em" w="100%" />
        <Skeleton height="1.25em" w="100%" />
        <Skeleton height="1.25em" w="100%" />
      </Stack>
    </Container>
  );
};
export default InfoSkeleton;

import { CircularProgress } from "@chakra-ui/react";

const LoadingSpinner = (props) => {
  return (
    <CircularProgress
      trackColor="gray.700"
      color="green.300"
      size={7}
      thickness={10}
      isIndeterminate
      {...props}
    />
  );
};
export default LoadingSpinner;

import { CircularProgress } from "@chakra-ui/react";

const LoadingSpinner = (props) => {
  return (
    <CircularProgress
      trackColor="brand.hoverBg"
      color="brand.green"
      size={7}
      thickness={10}
      isIndeterminate
      {...props}
    />
  );
};
export default LoadingSpinner;

import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

export const LoadingSkeleton = () => (
  <Box padding="6" boxShadow="lg">
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={12} spacing="4" />
  </Box>
)

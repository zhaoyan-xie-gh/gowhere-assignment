import { InfoAlert } from "@/components/InfoAlert";
import { Image, Text } from "@chakra-ui/react";
import { useLocationSelection } from "../contexts/location-selection-context";
import { TrafficImageCamera, TrafficImagesResponse } from "../types";

interface ScreenshotProps {
  trafficData: TrafficImagesResponse | undefined;
}
export const Screenshot = ({ trafficData }: ScreenshotProps) => {
  const { selectedLocation } = useLocationSelection();
  if (selectedLocation) {
    const {
      location: { latitude, longitude },
    } = selectedLocation;
    const cameraImages =
      trafficData?.items
        .map((item) =>
          item.cameras.find(
            ({ location: { latitude: camLat, longitude: camLong } }) =>
              camLat === latitude && camLong === longitude
          )
        )
        ?.filter((cam): cam is TrafficImageCamera => !!cam) ?? [];
    return cameraImages.length >= 1 ? (
      cameraImages.map(({ image }) => (
        <Image
          src={image}
          width="100%"
          alt={`${selectedLocation.name} Traffic Image`}
          fallbackSrc="https://via.placeholder.com/150"
        />
      ))
    ) : (
      <Text>No camera image</Text>
    );
  }
  return <InfoAlert message="Please select a location from above" />;
};

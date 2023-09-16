import { useGetTrafficImages } from "./queries/useGetTrafficImages";

export default function TrafficImages() {
  const { data } = useGetTrafficImages();

  return <div>traffic</div>;
}

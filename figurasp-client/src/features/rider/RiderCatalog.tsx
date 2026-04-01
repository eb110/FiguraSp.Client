import type { Rider } from "../../types/rider";
import RiderList from "./RiderList";

type Props = {
  riders: Rider[];
};

export default function RiderCatalog({ riders }: Props) {
  return <RiderList riders={riders} />;
}

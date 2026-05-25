import HomeClient from "@/components/home-client";
import { getDataOperationSnapshot } from "@/lib/data-operations";
import { sampleEvents, tickers } from "@/lib/sample-events";

export default function HomePage() {
  return <HomeClient events={sampleEvents} tickers={tickers} operationSnapshot={getDataOperationSnapshot()} />;
}

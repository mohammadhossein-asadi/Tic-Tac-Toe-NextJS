import { Suspense } from "react";
import TicTacToe from "./components/game";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <TicTacToe />
    </Suspense>
  );
}

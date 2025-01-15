import { Suspense } from "react";
import TicTacToe from "./components/game";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicTacToe />
    </Suspense>
  );
}

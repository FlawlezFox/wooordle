import { atom, Atom, useAtomValue } from "jotai";

let solutionPromiseAtom: Atom<Promise<string>>;

const useSolution = (length: number) => {
  solutionPromiseAtom = atom<Promise<string>>(async (_get, { signal }) => {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?length=${length}`,
      { signal }
    );

    const word = (response.json() as unknown as string[])[0];

    return word;
  });

  const solution = useAtomValue(solutionPromiseAtom);

  console.log(solution);

  return solution;
};

export default useSolution;

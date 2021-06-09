import { Klijent } from "./klijent";
import { TipRacuna } from "./tipRacuna";

export class Racun{
  id: number;
  naziv: string;
  oznaka: string;
  opis: string;
  tipRacuna: TipRacuna;
  klijent: Klijent;
}

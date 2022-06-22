export class AccidentStatisticDto {
    IdStatystyki?: number;
    IdTerytWojewodztwo?: number;
    IdTypPodmiotu?: number;
    IdRodzajWypadku?: number;
    IdPrzyczynaWypadku?: number;
    IdMiejsceWypadku?: number;
    IdRodzajZajec?: number;
    LiczbaWypadkow: number = 0;
}

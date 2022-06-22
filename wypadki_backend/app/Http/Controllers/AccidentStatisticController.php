<?php

namespace App\Http\Controllers;

use App\Models\AccidentStatistic;
use App\Models\PrzyczynaWypadku;
use App\Models\RodzajWypadku;
use App\Models\TypPodmiotu;
use App\Models\Wojewodztwo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccidentStatisticController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AccidentStatistic::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    // funkcja get zwracająca pasujące accidentStatistic
    public function find(Request $request)
    {
        $accidentStatisticsQuery = AccidentStatistic::query();
        if ($request->has('IdTypPodmiotu')) {
            $accidentStatisticsQuery->where('IdTypPodmiotu', $request->input("IdTypPodmiotu"));
        }
        if ($request->has('IdRodzajWypadku')) {
            $accidentStatisticsQuery->where('IdRodzajWypadku', $request->input("IdRodzajWypadku"));
        }
        if ($request->has('IdPrzyczynaWypadku')) {
            $accidentStatisticsQuery->where('IdPrzyczynaWypadku', $request->input("IdPrzyczynaWypadku"));
        }
        if ($request->has('IdMiejsceWypadku')) {
            $accidentStatisticsQuery->where('IdMiejsceWypadku', $request->input("IdMiejsceWypadku"));
        }
        if ($request->has('IdRodzajZajec')) {
            $accidentStatisticsQuery->where('IdRodzajZajec', $request->input("IdRodzajZajec"));
        }

        $accidentStatistics = $accidentStatisticsQuery->get();

        if ($accidentStatistics == null || count($accidentStatistics) == 0) {
            return response('', 404);
        }
        return response()->json($accidentStatistics);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $accidentStatistic = AccidentStatistic::query()
            ->where('IdTypPodmiotu', $request->IdTypPodmiotu)
            ->where('IdRodzajWypadku', $request->IdRodzajWypadku)
            ->where('IdPrzyczynaWypadku', $request->IdPrzyczynaWypadku)
            ->where('IdMiejsceWypadku', $request->IdMiejsceWypadku)
            ->where('IdRodzajZajec', $request->IdRodzajZajec)
            ->first();

        if ($accidentStatistic != null) {
            $staraLiczbaWypadkow = $accidentStatistic["LiczbaWypadkow"];
            $accidentStatistic["LiczbaWypadkow"] += $request->LiczbaWypadkow;
            $accidentStatistic->save();
            return "Zwiększono ilość wypadków dla istniejącej statystyki z $staraLiczbaWypadkow do "
                . $accidentStatistic["LiczbaWypadkow"] . "."
                . "\n$accidentStatistic";
        }

        $accidentStatistic = new AccidentStatistic();

        $wojewodztwo = Wojewodztwo::query()->find($request->IdTerytWojewodztwo);
        if ($wojewodztwo == null) {
            return response("Nie ma województwa o id $request->IdTerytWojewodztwo.")
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $accidentStatistic["IdTerytWojewodztwo"] = $request->IdTerytWojewodztwo;

        $typPodmiotu = TypPodmiotu::query()->find($request->IdTypPodmiotu);
        if ($typPodmiotu == null) {
            return response("Nie ma typu podmiotu o id $request->IdTypPodmiotu.")
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $accidentStatistic["IdTypPodmiotu"] = $request->IdTypPodmiotu;

        if (RodzajWypadku::query()->find($request->IdRodzajWypadku) == null) {
            return response("Nie ma rodzaju wypadku o id $request->IdRodzajWypadku.")
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $accidentStatistic["IdRodzajWypadku"] = $request->IdRodzajWypadku;

        if (PrzyczynaWypadku::query()->find($request->IdPrzyczynaWypadku) == null) {
            return response("Nie ma przyczyny wypadku o id $request->IdPrzyczynaWypadku.")
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $accidentStatistic["IdPrzyczynaWypadku"] = $request->IdPrzyczynaWypadku;

        if (PrzyczynaWypadku::query()->find($request->IdMiejsceWypadku) == null) {
            return response("Nie ma miejsca wypadku o id $request->IdMiejsceWypadku.")
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $accidentStatistic["IdMiejsceWypadku"] = $request->IdMiejsceWypadku;

        if (PrzyczynaWypadku::query()->find($request->IdRodzajZajec) == null) {
            return response("Nie ma rodzaju zajęć o id $request->IdRodzajZajec.")
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $accidentStatistic["IdRodzajZajec"] = $request->IdRodzajZajec;

        if (!ctype_digit($request->LiczbaWypadkow ) || $request->LiczbaWypadkow <= 0) {
            return response("Musisz podać liczbę całkowitą dodatnią liczby wypadków.")
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $accidentStatistic["LiczbaWypadkow"] = $request->LiczbaWypadkow;

        $accidentStatistic->save();
        return "Utworzono nową statystykę: \n$accidentStatistic";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AccidentStatistic  $accidentStatistic
     * @return \Illuminate\Http\Response
     */
    public function show(AccidentStatistic $accidentStatistic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AccidentStatistic  $accidentStatistic
     * @return \Illuminate\Http\Response
     */
    public function edit(AccidentStatistic $accidentStatistic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AccidentStatistic  $accidentStatistic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AccidentStatistic $accidentStatistic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AccidentStatistic  $accidentStatistic
     * @return \Illuminate\Http\Response
     */
    public function destroy(AccidentStatistic $accidentStatistic)
    {
        //
    }
}

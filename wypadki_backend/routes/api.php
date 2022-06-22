<?php

use App\Http\Controllers\AccidentStatisticController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\MiejsceWypadkuController;
use App\Http\Controllers\PrzyczynaWypadkuController;
use App\Http\Controllers\RodzajWypadkuController;
use App\Http\Controllers\RodzajZajecController;
use App\Http\Controllers\TypPodmiotuController;
use App\Http\Controllers\WojewodztwoController;
use App\Models\AccidentStatistic;
use App\Models\PrzyczynaWypadku;
use App\Models\RodzajZajec;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
});

Route::get('/AccidentStatistics/find', [AccidentStatisticController::class, 'find']);
Route::resource('AccidentStatistics', AccidentStatisticController::class);
Route::resource('MiejsceWypadku', MiejsceWypadkuController::class);
Route::resource('PrzyczynaWypadku', PrzyczynaWypadkuController::class);
Route::resource('RodzajWypadku', RodzajWypadkuController::class);
Route::resource('RodzajZajec', RodzajZajecController::class);
Route::resource('TypPodmiotu', TypPodmiotuController::class);
Route::resource('Wojewodztwo', WojewodztwoController::class);
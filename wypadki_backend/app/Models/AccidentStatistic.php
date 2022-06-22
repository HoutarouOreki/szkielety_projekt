<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccidentStatistic extends Model
{
    use HasFactory;

    // niech Eloquent nie tworzy automatycznie timestamps w kolumnach
    public $timestamps = false;

    protected $table = "AccidentStatistics";

    protected $primaryKey = "IdStatystyki";

    public $IdStatystyki;
    public $IdTerytWojewodztwo;
    public $IdTypPodmiotu;
    public $IdRodzajWypadku;
    public $IdPrzyczynaWypadku;
    public $IdMiejsceWypadku;
    public $IdRodzajZajec;
    public $LiczbaWypadkow;
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Computer extends Model
{
    protected $table = 'computers';
    use HasFactory;

    protected $fillable = [
        'name',
        'serial_number',
        'manufacturer',
        'model',
        'ram',
        'storage',
        'operating_system',
        'purchase_date',
        'cost',
        'notes',
        'user_id',
    ];

    protected $casts = [
        'purchase_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

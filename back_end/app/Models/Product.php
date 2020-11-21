<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model 
{
    use HasFactory ;

    protected $table='product';

    protected $fillable = [
        'productId',
        'display',
        'url_key',
        'description',
        'priceIn',
        'imageUrl',
        'instock',
        'priceOut',
        'specifications',
        'provider'
        
    ];
}

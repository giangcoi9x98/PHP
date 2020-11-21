<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    function index ($keyword){
    return Product::where(function ($query) use($keyword) {
        $query->where('display', 'like', '%' . $keyword . '%')
           ->orWhere('url_key', 'like', '%' . $keyword . '%');
      })
        ->paginate(10);
    }
}

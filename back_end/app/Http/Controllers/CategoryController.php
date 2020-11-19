<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    function getAll(){
        return Category::all();
    }
    function getById($id){
        return Category::where('categoryId',$id)->first();
    }
    function update(Request $request,Category $category){

    }
    function delete(Category $category){
        $category->delete();
        return response()->json('Category deleted seccessfully !',200);
    }
}

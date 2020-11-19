<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/todolists','App\Http\Controllers\TodoListApiController@list')->name('todolists.api.list');
Route::get('/todolists/{id}','App\Http\Controllers\TodoListApiController@show')->name('todolists.api.show');
Route::post('/todolists','App\Http\Controllers\TodoListApiController@create')->name('todolists.api.create');



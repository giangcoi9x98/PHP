<?php
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoListController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/cats', 'App\Http\Controllers\CategoryController@list');
Route::get('/todolists', 'App\Http\Controllers\TodoListController@list')->name('todolists.list');
Route::get('/todolists/create', 'App\Http\Controllers\TodoListController@create')->name('todolists.create');
Route::get('/todolists/{id}/edit','App\Http\Controllers\TodoListController@edit')->name('todolists.edit');
Route::post('/todolists/createSubmit', 'App\Http\Controllers\TodoListController@createSubmit')->name('todolists.createSubmit');
Route::patch('/todolists/{id}/update','App\Http\Controllers\TodoListController@update')->name('todolists.update');




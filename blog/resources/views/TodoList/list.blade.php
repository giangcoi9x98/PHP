@extends('layouts.app')
@section ('title','Todo List ')
@section ('content')
@push('styles')
<link href="{{asset('css/app.css')}}" rel ="stylesheet" >
@endpush

<div class="links">
        @foreach($todolists as $todolists)
            <a href="todolists/{{$todolists->title}}/edit">{{$todolists->title}}</a>
            <h2>{{$todolists->description}}</h2>
            <hr/>
            @endforeach
        </div>
@endsection
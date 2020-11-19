<html>
<head>
    <title>App Name -@yield('title')</title>
    <link rel ="stylesheet"type ="text/css"href="{{asset('resources/css/app.css')}}">
    @stack('styles')
    @stack('scripts')
</head>
<body>
    <div class="header">
    Header
    </div>
    
    <div class="container">
        @section('content')
            This is the main content
        @show    
    </div>
</body>
</html>
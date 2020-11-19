<body>

    <div>
    @foreach($categories as $category)
    <h2>{{$category->title}}</h2>
        <p>{{$category->description}}</p>
        </hr>

    @endforeach    
    </div>
</body>
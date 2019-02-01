$(function(){
    $('button').click(function(){
        var areaId = '';
        var centerLat = '';
        var centerLng = '';
        var zoom = '';
        var markerData = '';
        var myMap = '';
        var marker = '';

        areaId = $(this).attr('id');
        console.log(this);
        console.log(areaId);

        // Ajax
        $.ajax({
            type: 'POST',
            url: 'mapchange',
            dataType: 'json',
            data: {
                // エリアidを送る
                'areaId': areaId
            },
        }).done(function(data) {
            // 表示マップデータの取得
            // var addData = {"addkey": "addValue"};
            // data.push(addData);
            console.log(data.center_lat);
            centerLat = data.center_lat;
            centerLng = data['center_lng'];
            zoom = data['zoom'];
            markerData = data['data'];

            // マップ生成
            myMap = createMap(centerLat, centerLng, zoom);
            marker = createMarker(myMap, markerData);
            markerClickEvent(myMap, marker, markerData);
        }).fail(() => {
            alert('Mapの作成に失敗しました');
        });
    });

    function createMap(centerLat, centerLng, zoom){
        var map = '';
        var centerPosition;
        var mapOptions = '';

        console.log('createMap');
        map = document.getElementById('map');
        centerPosition = new google.maps.LatLng(centerLat, centerLng);
        mapOptions = {
            zoom: zoom,
            center: centerPosition,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        return new google.maps.Map(map, mapOptions);
    }

    function createMarker(myMap, markerData){
        var marker = {};
        var markerPosition = '';
        var markerOptions = '';

        if(markerData instanceof Array){
            $.each(markerData, (name, val) => {
                console.log('createMarker');
                console.log(val.lat, val.lng);
                markerPosition = new google.maps.LatLng(val.lat, val.lng);
                markerOptions = {
                    position: markerPosition,
                    map: myMap
                };
                console.log(`name: ${name}`);
                marker[name] = new google.maps.Marker(markerOptions);
            });
        }else{
            console.log('createMarker');
            console.log(markerData.lat, markerData.lng);
            markerPosition = new google.maps.LatLng(markerData.lat, markerData.lng);
            markerOptions = {
                position: markerPosition,
                map: myMap
            };
            marker = new google.maps.Marker(markerOptions);
        }
        return marker;
    }

    function markerClickEvent(myMap, marker, markerData){
        var markerPosition = '';
        var window_options = '';
        var infowindow = '';

        console.log('markerClickEvent');
        if(markerData instanceof Array){
            $.each(marker, (name, val) => {
                google.maps.event.addListener(val, 'click', (event) => {
                    console.log(markerData[name]['lat'], markerData[name]['lng']);
                    markerPosition = new google.maps.LatLng(markerData[name]['lat'], markerData[name]['lng']);
                    window_options = {
                        content: markerData[name]['content'],
                    }
                    infowindow = new google.maps.InfoWindow(window_options);
                    infowindow.open(myMap, val);
                    myMap.setZoom(18);
                    myMap.panTo(markerPosition);
                });
            });
        }else{
            google.maps.event.addListener(marker, 'click', (event) => {
                console.log(markerData['lat'], markerData['lng']);
                markerPosition = new google.maps.LatLng(markerData['lat'], markerData['lng']);
                window_options = {
                    content: markerData['content'],
                }
                infowindow = new google.maps.InfoWindow(window_options);
                infowindow.open(myMap, marker);
                myMap.setZoom(18);
                myMap.panTo(markerPosition);
            });
        }
    }
});
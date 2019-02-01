google.maps.event.addDomListener(window, 'load', () => {
    var map = document.getElementById("map");
    var centerPosition = new google.maps.LatLng(40.822331, 140.747438);
    var options = {
        zoom: 16,
        center: centerPosition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Mapの出力
    var myMap = new google.maps.Map(map, options);

    // マーカーの設定
    var marker_options = {
        position: centerPosition,
        map: myMap,
    };
    // マーカーの出力
    var myMarker = new google.maps.Marker(marker_options);

    // マーカークリック処理
    google.maps.event.addListener(myMarker, 'click', (event) => {
        var window_options = {
            content:'こんばんは、いきなりアサイーボウルです',
        }
        var infowindow = new google.maps.InfoWindow(window_options);
        // infowindowの表示
        infowindow.open(myMap, myMarker);

        // zoom設定
        myMap.setZoom(18);

        // 中心に移動
        myMap.panTo(centerPosition);
    });
});
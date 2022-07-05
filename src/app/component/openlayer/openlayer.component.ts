import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import {View} from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from "ol/interaction/Draw";
import { transform, useGeographic } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import fill from 'ol/style/Fill';
import icon from 'ol/style/Icon';
import style from 'ol/style/Style';
import stroke from 'ol/style/Stroke';
import text from 'ol/style/Text';
import Polyline from 'ol/format/Polyline';

import line from 'ol/geom/LineString';
// import { style } from '@angular/animations';

useGeographic();

@Component({
  selector: 'app-openlayer',
  templateUrl: './openlayer.component.html',
  styleUrls: ['./openlayer.component.scss']
})

export class OpenlayerComponent implements OnInit {
  // map: Map | any;
  // draw: any;

  // lineType: string = 'LineString';
  // raster = new TileLayer({
  //   source: new OSM(),
  // });

  // source = new VectorSource({ wrapX: false });

  // vector = new VectorLayer({
  //   source: this.source,
  // });

  // centroid = [78.9629, 20.5937];

  constructor() { }

  ngOnInit(): void {
    const place = [78.9629, 20.5937];

    // const point = new Point(place);

    // const map = new Map({
    //   target:   'map',
    //   view: new View({
    //     center: place,
    //     zoom: 6,
    //   }),
    //   layers: [
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //     new VectorLayer({
    //       source: new VectorSource({
    //         features: [new Feature(Point)],
    //       }),
    //     })
    //   ],
    // });

    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: place,
        zoom: 6
      })
    });
    var points = [[79.9629, 23.5937], [78.9629, 20.5937],[80.9629, 18.5937],[76.9629, 18.5937],[75.9629, 15.5937]];

   

    const routeFeature = new Feature({
      type: 'route',
      geometry: new line(points),
    });

    for (var i = 0; i < points.length; i++) {
      points[i] = transform(points[i], 'EPSG:4326', 'EPSG:4326');
    }

    var featureLine = new Feature({
      geometry: new line(points)
    });

    var vectorLine = new VectorSource({});
    vectorLine.addFeature(featureLine);
  
    var vectorLineLayer = new VectorLayer({
      source: vectorLine,
    style: new style({
        fill: new fill({ color: 'red' }),
        stroke: new stroke({ color: 'black', width: 4 })
    })
    });
    map.addLayer(vectorLineLayer);
// ------------------------------------------------------------
      var markerGeometry = new Point(transform([78.9629, 23.5937], 'EPSG:4326','EPSG:4326'));
      var markerFeature = new Feature({
          geometry: markerGeometry
      });

      var markerStyle = new icon(({
          src: '../../../assets/pin.png',
          scale: 0.1,

      }));

      markerFeature.setStyle(new style({
        image: markerStyle,
    }));
      var vectorSource = new VectorSource({
          features: [markerFeature]
      });

      var markerLayer = new VectorLayer({
          // title: "RoutePoint",
          visible: true,
         source: vectorSource
      });

      map.addLayer(markerLayer);
  }


}

/* global L */

import Ember from 'ember';
import mapBboxController from 'mobility-playground/mixins/map-bbox-controller';
import setTextboxClosed from 'mobility-playground/mixins/set-textbox-closed';
import sharedActions from 'mobility-playground/mixins/shared-actions';
import xml2js from 'npm:xml2js';
import polylineEncoded from 'npm:polyline-encoded';


export default Ember.Controller.extend(mapBboxController, setTextboxClosed, sharedActions, {
  queryParams: ['bbox','pin','trace'],
  center: Ember.computed('trace', function(){
    return this.model.gpxTrace ? this.model.gpxTrace.center : this.get('mapCenter');
  }),
  zoom: 14,
  trace: null,
  showMapMatch: false,
  gpxPlaceholder: Ember.computed('trace', function(){
    if (this.get('trace')){
      return this.get('trace');
    } else {
      return "Select a sample GPX trace...";
    }
  }),

  actions: {
    updatebbox(e) {
      var newbox = e.target.getBounds();
      this.set('bbox', newbox.toBBoxString());
    },

    setTrace(trace){
      console.log(trace);
      this.set('trace', trace);
    },
    
    setShowMapMatch(){
      if (this.get('showMapMatch')){
        this.set('showMapMatch', false);
      } else {
        this.set('showMapMatch', true);
      }
    }
  }
});
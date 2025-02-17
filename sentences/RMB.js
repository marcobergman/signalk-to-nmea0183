/*
Heading and distance to waypoint:
$IIRMB,A,x.x,a,,,IIII.II,a,yyyyy.yy,a,x.x,x.x,x.x,A,a*hh
 I I I I I I I I I_Speed to WP in knots
 I I I I I I I I_True heading to destination in degrees
 I I I I I I I_Distance to destination in miles
 I I I I I_ ___ I_Longitude of the WP to destination, E/W
 I I I__ I_Latidude of the WP to destination, N/S
 I I_Direction of cross-track error, L/R
 I_Distance of cross-track error in miles
*/
// to verify
const nmea = require('../nmea.js')
module.exports = function (app) {
  return {
    sentence: 'RMB',
    title: 'RMB - Heading and distance to waypoint',
    keys: [
	  'navigation.courseRhumbline.bearingTrue',
      'navigation.courseRhumbline.crossTrackError',
      'resources.waypoints.next.position.latitude',
      'resources.waypoints.next.position.longitude',
      'navigation.courseRhumbline.nextPoint',
      'navigation.courseRhumbline.nextPoint.bearingTrue',
      'navigation.courseRhumbline.nextPoint.distance',
      'navigation.courseRhumbline.nextPoint.latitude',
      'navigation.courseRhumbline.nextPoint.longitude',
      'navigation.courseRhumbline.nextPoint.velocityMadeGood'
    ],
    f: function (
      crossTrackError,
      wpLatitude,
      wpLongitude,
      wpDistance,
      bearingTrue
    ) {
      return nmea.toSentence([
        '$IIRMB',
        crossTrackError.toFixed(2),
        crossTrackError < 0 ? 'R' : 'L',
        nmea.toNmeaDegreesLatitude(wpLatitude),
        nmea.toNmeaDegreesLongitude(wpLongitude),
        wpDistance.toFixed(2),
        nmea.radsToDeg(bearingTrue).toFixed(2),
        'V', // dont set the arrival flag as it will set of alarms.
        ''
      ])
    }
  }
}

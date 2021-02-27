export default class sort_ccw {
    static sort(points) {


        points.sort((a, b) => a.y - b.y);

        const cy = (points[0].y + points[points.length - 1].y) / 2;

        points.sort((a, b) => b.x - a.x);

        // Get center x
        const cx = (points[0].x + points[points.length - 1].x) / 2;

        // Center point
        var center = {
            x: cx,
            y: cy
        };

        var startAng;
        points.forEach(point => {
            var ang = Math.atan2(point.y - center.y, point.x - center.x);
            if (!startAng) {
                startAng = ang
            } else {
                if (ang < startAng) { // ensure that all points are clockwise of the start point
                    ang += Math.PI * 2;
                }
            }
            point.angle = ang; // add the angle to the point
        });

        // first sort clockwise
        points.sort((a, b) => a.angle - b.angle);

        // then reverse the order
        const ccwPoints = points.reverse();

        // move the last point back to the start
        ccwPoints.unshift(ccwPoints.pop());

        return ccwPoints;
    };
}

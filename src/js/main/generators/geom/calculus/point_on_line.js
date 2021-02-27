export var point_on_line = function ( point1, point2, pnt, lineThickness=2 ) {
    let L2 = (((point2.x - point1.x) * (point2.x - point1.x)) + ((point2.y - point1.y) * (point2.y - point1.y)));
    if (L2 == 0) return false;
    let r = (((pnt.x - point1.x) * (point2.x - point1.x)) + ((pnt.y - point1.y) * (point2.y - point1.y))) / L2;

    //Предположим, что толщина линии закругленная на краях и имеет радиус r
    if (r < 0) {
        //если контрольная точка за пределами окрестнойстей
        return (Math.sqrt(((point1.x - pnt.x) * (point1.x - pnt.x)) + ((point1.y - pnt.y) * (point1.y - pnt.y))) <= lineThickness);
    } else if ((0 <= r) && (r <= 1)) {
        //On the line segment
        let s = (((point1.y - pnt.y) * (point2.x - point1.x)) - ((point1.x - pnt.x) * (point2.y - point1.y))) / L2;
        return (Math.abs(s) * Math.sqrt(L2) <= lineThickness);
    } else {
        //Outside point2
        return (Math.sqrt(((point2.x - pnt.x) * (point2.x - pnt.x)) + ((point2.y - pnt.y) * (point2.y - pnt.y))) <= lineThickness);
    }
};
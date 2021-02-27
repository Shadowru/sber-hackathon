export default class Geometry {

  static simplify(V, tol) {

    var diff = function (u, v) {
      return [u[0] - v[0], u[1] - v[1]];
    }
    var dot = function (u, v) {
      return u[0] * v[0] + u[1] * v[1];
    }
    var norm2 = function (v) {
      return v[0] * v[0] + v[1] * v[1];
    }
    var d2 = function (u, v) {
      return norm2(diff(u, v));
    }


    var simplifyDP = function (tol, v, j, k, mk) {

      if (k <= j + 1) {
        return;
      }

      var maxi = j;
      var maxd2 = 0;
      var tol2 = tol * tol;
      let S = [v[j], v[k]];
      let u = diff(S[1], S[0]);
      var cu = norm2(u, u);
      var w;
      var Pb;
      var b, cw, dv2;
      for (var i = j + 1; i < k; i++) {

        w = diff(v[i], S[0]);
        cw = dot(w, u);
        if (cw <= 0) {
          dv2 = d2(v[i], S[0]);
        } else if (cu <= cw) {
          dv2 = d2(v[i], S[1]);
        } else {
          b = cw / cu;
          Pb = [S[0][0] + b * u[0], S[0][1] + b * u[1]];
          dv2 = d2(v[i], Pb);
        }

        if (dv2 <= maxd2) {
          continue;
        }

        maxi = i;
        maxd2 = dv2;
      }
      if (maxd2 > tol2) {

        mk[maxi] = 1;

        simplifyDP(tol, v, j, maxi, mk);
        simplifyDP(tol, v, maxi, k, mk);
      }

      return;
    };

    var n = V.length;
    var sV = [];
    var i, k, m, pv;
    var tol2 = tol * tol;
    let vt = [];
    let mk = [];


    vt[0] = V[0];
    for (i = k = 1, pv = 0; i < n; i++) {
      if (d2(V[i], V[pv]) < tol2) {
        continue;
      }
      vt[k++] = V[i];
      pv = i;
    }
    if (pv < n - 1) {
      vt[k++] = V[n - 1];
    }

    mk[0] = mk[k - 1] = 1;
    simplifyDP(tol, vt, 0, k - 1, mk);


    for (i = m = 0; i < k; i++) {
      if (mk[i]) {
        sV[m++] = vt[i];
      }
    }
    return sV;
  };

  static polygon_centr(pts) {

    var first = pts[0], last = pts[pts.length - 1];
    if (first.x != last.x || first.y != last.y) pts.push(first);
    var twicearea = 0,
      x = 0, y = 0,
      nPts = pts.length,
      p1, p2, f;
    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
      p1 = pts[i];
      p2 = pts[j];
      f = p1.x * p2.y - p2.x * p1.y;
      twicearea += f;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
    }
    f = twicearea * 3;
    return {x: x / f, y: y / f};
  };

  static middle_point(s, e) {
    return {
      x: ((s.x + e.x) / 2),
      y: ((s.y + e.y) / 2)
    };
  };

  static point_on_line(point1, point2, pnt, lineThickness = 2) {
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


}

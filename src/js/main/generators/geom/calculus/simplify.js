export var simplify = function(V, tol) {

    var diff = function(u,v) {return [u[0]-v[0], u[1]-v[1]];}
    var dot = function(u,v) {return u[0]*v[0] + u[1]*v[1];}
    var norm2 = function(v) {return v[0]*v[0] + v[1]*v[1];}
    var d2 = function(u,v) {return norm2(diff(u,v));}


    var simplifyDP = function( tol, v, j, k, mk ) {

        if (k <= j+1) {
            return;
        }

        var maxi = j;
        var maxd2 = 0;
        var tol2 = tol * tol;
        let S = [v[j], v[k]];
        let u = diff(S[1], S[0]);
        var cu = norm2(u,u);
        var  w;
        var Pb;
        var b, cw, dv2;
        for (var i=j+1; i<k; i++) {

            w = diff(v[i], S[0]);
            cw = dot(w,u);
            if ( cw <= 0 ) {
                dv2 = d2(v[i], S[0]);
            } else if ( cu <= cw ) {
                dv2 = d2(v[i], S[1]);
            } else {
                b = cw / cu;
                Pb = [S[0][0]+b*u[0], S[0][1]+b*u[1]];
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

            simplifyDP( tol, v, j, maxi, mk );
            simplifyDP( tol, v, maxi, k, mk );
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
    for (i=k=1, pv=0; i<n; i++) {
        if (d2(V[i], V[pv]) < tol2) {
            continue;
        }
        vt[k++] = V[i];
        pv = i;
    }
    if (pv < n-1) {
        vt[k++] = V[n-1];
    }

    mk[0] = mk[k-1] = 1;
    simplifyDP( tol, vt, 0, k-1, mk );


    for (i=m=0; i<k; i++) {
        if (mk[i]) {
            sV[m++] = vt[i];
        }
    }
    return sV;
};
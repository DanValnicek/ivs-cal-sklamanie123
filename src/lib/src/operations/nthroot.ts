export function nThRoot(n: number, x: number): number | undefined {
    /*
     y = n root x
     y^n = x
     y^n = 0
     Newton-Rhapson approximation method
        a_n+1 = a_0 - (f(a_n)/f'(a_n)
     */
    // return Math.pow(x,1/n)
    const tolerance = 1e-9;
    //initial guess 1+(x−1)÷n
    let a, a_1 = 1 + (x - 1) / n;
    // let a, a_1 = x;
    do {
        a = a_1;
        a_1 = a - (a ** n - x) / (n * a ** (n - 1));
    } while (Math.abs(a - a_1) > tolerance);
    if(isNaN(a_1))return  undefined;
    a_1 = Math.round(a_1 * 1e9) / 1e9
    return a_1;
}

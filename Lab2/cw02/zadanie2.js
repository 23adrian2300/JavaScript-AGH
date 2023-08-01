"use strict";
var expect = chai.expect;
let totalSum = 0;

function sum(x, y) {
    return x + y;
}

//liczenie cyfr
function cyfry(napis) {
    let res = [0, 0];
    var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (const digit of napis) {
        if (parseInt(digit) in digits) {
            let num = parseInt(digit);
            if (parseInt(num) % 2 == 0) {
                res[1] += num;
            }
            else {
                res[0] += num;
            };
        };
    };
    return res;
}


function litery(napis) {
    let res = [0, 0];
    for (let i = 0; i < napis.length; i++) {
        let c = napis[i];
        if (!isNaN(parseInt(c))) continue;
        if (c === c.toLowerCase()) res[0] += 1;
        else if (c === c.toUpperCase()) res[1] += 1;
    }

    return res;
}

function suma(str) {
    const n = parseInt(str);
    if (!isNaN(n)) totalSum += n;

    return totalSum;
}

function getData() {
    var res = window.prompt("Wczytaj napis");
    var prev = 0;
    while (res != null) {
        console.log(res);
        console.log("\t" + typeof res);
        let r1 = cyfry(res);
        let r2 = litery(res);
        let r3 = prev + suma(res);
        prev = r3;
        console.log("\t" + r1 + "\t" + r2 + "\t" + r3);
        res = window.prompt("Wczytaj napis");
    }
}

describe('Test dla cyfry(napis)', function () {
    it('Returns [8, 12] for "3458"', function () {
        expect(cyfry('3458')).to.eql([8, 12]);
    });
    it('Returns [16, 28] for "a485bksdjka281565"', function () {
        expect(cyfry('a485bksdjka281565')).to.eql([16, 28]);
    });
    it('Returns [0, 0] for "aBc"', function () {
        expect(cyfry('aBc')).to.eql([0, 0]);
    });
    it('Returns [10, 10] for "aBc4565a"', function () {
        expect(cyfry('aBc4565a')).to.eql([10, 10]);
    });
    it('Returns [12, 18] for "58647aBc"', function () {
        expect(cyfry('58647aBc')).to.eql([12, 18]);
    });
    it('Returns [0, 0] for ""', function () {
        expect(cyfry('')).to.eql([0, 0]);
    });
});

describe('Test dla litery(napis)', function () {
    it('Returns [0, 0] for "3458"', function () {
        expect(litery('3458')).to.eql([0, 0]);
    });
    it('Returns [8, 0] for "a485bksdjka281565"', function () {
        expect(litery('a485bksdjka281565')).to.eql([8, 0]);
    });
    it('Returns [2, 1] for "aBc"', function () {
        expect(litery('aBc')).to.eql([2, 1]);
    });
    it('Returns [3, 1] for "aBc4565a"', function () {
        expect(litery('aBc4565a')).to.eql([3, 1]);
    });
    it('Returns [2, 1] for "58647aBc"', function () {
        expect(litery('58647aBc')).to.eql([2, 1]);
    });
    it('Returns [0, 0] for ""', function () {
        expect(litery('')).to.eql([0, 0]);
    });
});

describe('Test dla suma(napis)', function () {
    totalSum = 0;
    it('Returns 3458 for "3458"', function () {
        expect(suma('3458')).to.eql(3458);
    });
    it('Returns 3458 for "a485bksdjka281565"', function () {
        expect(suma('a485bksdjka281565')).to.eql(3458);
    });
    it('Returns (3458 for "aBc"', function () {
        expect(suma('aBc')).to.eql(3458);
    });
    it('Returns 3458 for "aBc4565a"', function () {
        expect(suma('aBc4565a')).to.eql(3458);
    });
    it('Returns 62105 for "58647aBc"', function () {
        expect(suma('58647aBc')).to.eql(62105);
    });
    it('Returns 62105 for ""', function () {
        expect(suma('')).to.eql(62105);
    });
});

describe('The sum() function', function () {
    it('Returns 4 for 2+2', function () {
        expect(sum(2, 2)).to.equal(4);
    });
    it('Returns 0 for -2+2', function () {
        expect(sum(-2, 2)).to.equal(0);
    });
});

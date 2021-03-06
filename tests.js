/**
 *  @fileoverview MiniMat (Matrix algebra library) library tests.
 *  @author birm@rbirm.us (Ryan Birmingham)
 *  @license Copyright 2017 Ryan Birmingham.
 *  Licensed under GPL-3.
 */

var test = require('tape');
var MiniMat = require("./MiniMat");

test( 'initialization tests', function(t) {
    t.plan(5);

    t.doesNotThrow( function() {
        onetwothreefour = new MiniMat([1,2,3,4], 2, 2);
    }, '*', "new MiniMat() construction");

    // make an identity of size 3
    t.doesNotThrow( function() {
        eye3 = MiniMat.Eye(3);
    }, '*', "Eye construction");

    // Make a 4x4 matrix of all 4.18 values
    t.doesNotThrow( function() {
        constmat = MiniMat.FilledMat(4, 4, 4.18);
    }, '*', "FilledMat construction");

    // make a 5x5 zerores matrix
    t.doesNotThrow( function() {
        zeromat = MiniMat.Zeroes(5,5);
    }, '*', "Zeroes construction");

    // make a 6x7 of all ones
    t.doesNotThrow( function() {
        onesmat = MiniMat.Ones(6,7);
    }, '*', "Ones construction");
});

test( 'representation tests', function(t) {
    t.plan(6);

    // take a ones mat and try getting a row
    t.equal( MiniMat.Ones(3,4).row(0).toString(true), new MiniMat([1,1,1,1],1,4).toString(true), "Get a row of four ones");

    // while we're at it, test the human representation equality too.
    t.equal( MiniMat.Ones(3,4).row(0).toString(), new MiniMat([1,1,1,1],1,4).toString(), "Get a row of four ones");

    // take a filled mat and try getting two rows
    t.equal( MiniMat.FilledMat(3, 2, 4).row(0,1).toString(true), new MiniMat([4,4,4,4],2,2).toString(true), "Get two rows of two fours");

    // take a ones mat and try getting a column
    t.equal( MiniMat.Ones(3,4).col(0).toString(true), new MiniMat([1,1,1],3,1).toString(true), "Get a col of three ones");

    // take a filled mat and try getting two rows
    t.equal( MiniMat.FilledMat(3, 2, 4).col(0,1).toString(true), new MiniMat([4,4,4,4,4,4],3,2).toString(true), "Get two rows of two fours");

    // an object sould json and from json to the same thing
    t.equal(MiniMat.FilledMat(3, 2, 4).toString(true), MiniMat.FromJson(MiniMat.FilledMat(3, 2, 4).json()).toString(true));
});

test( 'mathematical operation tests', function(t) {
    t.plan(9);

    // test in place schur
    t.equal( MiniMat.FilledMat(3, 2, 4).schur(MiniMat.FilledMat(3, 2, 4)).toString(true), MiniMat.FilledMat(3, 2, 16).toString(true), "Test matrix schur product");

    // test apply via inverse
    t.equal( MiniMat.FilledMat(2, 2, 4).elem_inv().toString(true), MiniMat.FilledMat(2, 2, 0.25).toString(true), "Test apply and inverse");

    // test product
    t.equal( MiniMat.FilledMat(3, 2, 4).product(MiniMat.FilledMat(2, 3, 4)).toString(true), MiniMat.FilledMat(2, 2, 32).toString(true), "Test matrix schur product");

    // test norms
    // l-2 norm
    t.equal(MiniMat.FilledMat(2, 2, 4).norm() , 8, "Test l-2 norm");
    // fro norm
    t.equal(MiniMat.FilledMat(2, 2, 4).norm("fro") , 8, "Test fro norm");
    // inf norm
    t.equal(MiniMat.FilledMat(2, 2, 4).norm(1./0) , 4, "Test inf norm");

    // test diag
    t.equal(MiniMat.Eye(4).diag().toString(true) , MiniMat.Ones(1,4).toString(true), "Test diag");

    // test trace
    t.equal(MiniMat.Eye(4).trace() , 4, "Test trace");

    // test norms
    t.equal(MiniMat.FilledMat(2, 2, 4).normalize(false).toString(true), new MiniMat([0.5,0.5,1/9, 8/9],2,2).toString(true), "Test normalization");
});

//need to add some expected failures

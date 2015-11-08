'use strict';
const prepareAllTests = require( './lib/preparation' ).prepareAllTests;
const runOneTest = require( './lib/preparation' ).runOneTest;

const runTests = function (definition, server, lab){

    prepareAllTests(definition, (tests) => {

        tests.forEach((test) => {

            lab.test(test.test.title, (done) => {

                runOneTest(definition, server, test, done);
            });
        });
    });
};


module.exports = {
    Lcrud: require( './lib/Lcrud' ),
    runTests: runTests
};



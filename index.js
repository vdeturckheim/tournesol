'use strict';
const runOneTest = require( './lib/preparation' ).runOneTest;
const prepareOneTest = require( './lib/preparation' ).prepareOneTest;

const runTests = function (definition, server, lab){

    definition.paramSets.forEach( (paramSet) => {

        const preparedTest = prepareOneTest(definition.title, paramSet, definition.pre);
        lab.test(preparedTest.title, (done) => {

            runOneTest(definition, server, preparedTest, done);
        });
    } );
};

module.exports = {
    Lcrud: require( './lib/Lcrud' ),
    runTests: runTests
};



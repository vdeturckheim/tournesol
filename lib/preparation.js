'use strict';
const Hoek = require( 'hoek' );

const runPres = function ( pres, output, errList, callback ) {

    if ( pres.length === 0 ) {
        return callback( errList, output );
    }
    const currentPre = pres.pop();
    return currentPre.method( ( err, result ) => {

        if ( err ) {
            errList.push( err );
        }
        if ( result ) {
            output[currentPre.assign] = result;
        }
        runPres( pres, output, errList, callback );
    } );
};

const prepareOneTest = function ( title, input, pres, callback ) {

    pres = pres || [];
    title = title || '';
    input = input || {};

    const test = {
        title: title
    };

    pres.forEach( ( currentPre ) => {

        test.title = test.title.replace( '{pre.' + currentPre.assign + '}', currentPre.name );
    } );
    const inputKeys = Object.keys( input );
    inputKeys.forEach( ( key ) => {

        test.title = test.title.replace( '{input.' + key + '}', input[key] );
    } );

    test.input = input;
    if ( input.titleComplement ) {
        test.title = test.title + ' | ' + input.titleComplement;
    }

    let currentPres = [];
    if ( pres.length >= 1 ) {
        currentPres = Hoek.clone( pres );
    }

    runPres( currentPres, {}, [], ( errList, preResults ) => {

        test.pre = preResults;
        return callback( errList, test );
    } );
};

module.exports.prepareOneTest = prepareOneTest;

const readParamSets = function ( def, paramSets, testsDef, callback ) {

    if ( paramSets.length === 0 ) {
        return callback( testsDef );
    }

    const currentSet = paramSets.pop();
    prepareOneTest( definition.title, currentSet.input, def.pre, ( errList, test ) => {

        testsDef.push( {
            test: test,
            errList: errList,
            output: currentSet.output
        } );
        return readParamSets( def, paramSets, testsDef, callback );
    } );
};

const prepareAllTests = function ( definition, callback ) {

    const paramSets = Hoek.clone( definition.paramSets );
    readParamSets( definition, paramSets, [], callback );
};

module.exports.prepareAllTests = prepareAllTests;

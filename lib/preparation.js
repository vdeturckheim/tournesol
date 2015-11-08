'use strict';
const Hoek = require( 'hoek' );
const Code = require( 'code' );

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

const prepareOneTest = function ( title, paramSet, pres ) {

    pres = pres || [];

    const test = {
        title: title
    };

    pres.forEach( ( currentPre ) => {

        test.title = test.title.replace( '{pre.' + currentPre.assign + '}', currentPre.name );
    } );
    const inputKeys = Object.keys( paramSet.input );
    inputKeys.forEach( ( key ) => {

        test.title = test.title.replace( '{input.' + key + '}', paramSet.input[key] );
    } );

    test.input = paramSet.input;
    if ( paramSet.titleComplement ) {
        test.title = test.title + ' | ' + paramSet.titleComplement;
    }

    test.output = paramSet.output;

    return test;

};

module.exports.prepareOneTest = prepareOneTest;

const runOneTest = function ( definition, server, preparedTest, done ) {

    // Run the pre-tests
    let currentPres = [];
    if ( definition.pre.length >= 1 ) {
        currentPres = Hoek.clone( definition.pre );
    }
    runPres( currentPres, {}, [], ( errList, preResults ) => {

        if ( errList.length > 0 ) {
            let errStr = '';
            errList.forEach( ( err ) => {

                errStr = errStr + err + '; ';
            } );
            return done( new Error( errStr ) );
        }

        server.inject( definition.inject( preResults, preparedTest.input ), ( response ) => {

            Code.expect( response.statusCode ).to.equal( preparedTest.output.statusCode );
            if ( preparedTest.output.payload ) {
                const payload = JSON.parse( response.payload );
                preparedTest.output.payload( Code, payload );
            }
            done();
        } );
    } );
};

module.exports.runOneTest = runOneTest;
